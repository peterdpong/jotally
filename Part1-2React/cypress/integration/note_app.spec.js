describe('Note App', function() {
  it('Frontpage can be open', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Notes')
  })
})