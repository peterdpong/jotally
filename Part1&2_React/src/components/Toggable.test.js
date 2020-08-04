import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent, findAllByTestId} from '@testing-library/react'
import Toggable from './Toggable'

describe('<Toggable/>', () => {
  let component

  beforeEach(()=> {
    component = render(
      <Toggable buttonLabel="show...">
        <div className="testDiv"/>
      </Toggable>
    )
  })

  test('Renders its children', () => {
    expect(
      component.container.querySelector('.testDiv').toBeDefined()
    )
  })

  test('At start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
  })

  test('After clicking the button, children are displayed', () => {
    const button = component.getByText('show...')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('Toggled content can be closed', () => {
    const button = component.container.querySelector('button')
    fireEvent.click(button)

    const closeButton = component.getByText('cancel')
    fireEvent.click(closeButton)

    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })
})