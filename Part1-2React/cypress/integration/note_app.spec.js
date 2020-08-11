describe('Note App', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'ROOT',
      username: 'root',
      password: 'testing'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Frontpage can be open', function() {
    cy.contains('Notes')
  })

  it('Login form can be opened', function () {
    cy.contains('login').click()
    cy.get('#username').type('testing')
    cy.get('#password').type('testing')
    cy.get('#login-button').click()

    cy.contains('testing Logged-In')
  })

  it.only('Login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('root')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'testing Logged-In')
  })

  describe('Logged In', function () {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'testing' })
    })

    it('A new note can be created', function () {
      cy.contains('New Note').click()
      cy.get('input').type('A new note created by cypress')
      cy.contain('Save').click()
      cy.contain('A new note created by cypress')
    })

    describe('and a Note exist', function() {
      beforeEach(function () {
        cy.createNote({
          content: 'another note cypress',
          important: false
        })
      })

      it('it can be made important', function () {
        cy.contains('another note cypress')
          .contains('make important')
          .click()

        cy.contains('another note cypress')
          .contains('make not important')
      })
    })

    describe('multiple Notes exist', function() {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      it('one of those can be made important', function () {
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'make not important')
      })
    })
  })
})