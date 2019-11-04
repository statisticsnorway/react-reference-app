import React from 'react'
import { toBeDisabled, toBeEnabled } from '@testing-library/jest-dom'
import { cleanup, fireEvent, render } from '@testing-library/react'

import App from '../App'
import { TEST, UI } from '../enums'

expect.extend({ toBeDisabled, toBeEnabled })

afterEach(() => {
  cleanup()
})

const setup = () => {
  const { getByPlaceholderText, getByTestId, queryAllByText } = render(<App />)

  return { getByPlaceholderText, getByTestId, queryAllByText }
}

test('App renders correctly', () => {
  const { getByPlaceholderText, queryAllByText } = setup()

  expect(getByPlaceholderText(UI.PLACEHOLDER).value).toEqual(`${process.env.REACT_APP_LDS}${UI.AGENT_SCHEMA}`)
  expect(queryAllByText(`${UI.VERSION}: ${process.env.REACT_APP_VERSION}`)).toHaveLength(1)
})

test('Button is disabled with empty value', () => {
  const { getByPlaceholderText, getByTestId } = setup()

  expect(getByTestId(TEST.BUTTON_TEST_ID)).toBeEnabled()

  fireEvent.change(getByPlaceholderText(UI.PLACEHOLDER), { target: { value: '' } })

  expect(getByTestId(TEST.BUTTON_TEST_ID)).toBeDisabled()
})
