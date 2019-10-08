import React from 'react'
import { toBeDisabled, toBeEnabled } from '@testing-library/jest-dom'
import { cleanup, fireEvent, render, waitForElement } from '@testing-library/react'

import App from '../App'
import { get } from '../Get'
import { TEST, UI } from '../Enums'

expect.extend({ toBeDisabled, toBeEnabled })
jest.mock('../Get', () => ({ get: jest.fn() }))

afterEach(() => {
  get.mockReset()
  cleanup()
})

const setup = () => {
  const { getByPlaceholderText, getByTestId, getByText, queryAllByPlaceholderText, queryAllByText } = render(<App />)

  return { getByPlaceholderText, getByTestId, getByText, queryAllByPlaceholderText, queryAllByText }
}

test('App renders correctly', () => {
  const { getByPlaceholderText, getByTestId, queryAllByPlaceholderText, queryAllByText } = setup()

  expect(queryAllByPlaceholderText(UI.PLACEHOLDER)).toHaveLength(1)
  expect(getByPlaceholderText(UI.PLACEHOLDER).value).toEqual(`${process.env.REACT_APP_LDS}${UI.AGENT_SCHEMA}`)
  expect(queryAllByText(UI.BUTTON)).toHaveLength(1)
  expect(getByTestId(TEST.BUTTON_TEST_ID)).toBeEnabled()
  expect(queryAllByText(`${UI.VERSION}: ${process.env.REACT_APP_VERSION}`)).toHaveLength(1)

  fireEvent.change(getByPlaceholderText(UI.PLACEHOLDER), { target: { value: '' } })

  expect(getByTestId(TEST.BUTTON_TEST_ID)).toBeDisabled()
})

test('App handles fetch correctly', async () => {
  get.mockImplementation(() => Promise.resolve())

  const { getByPlaceholderText, getByTestId, getByText, queryAllByText } = setup()

  fireEvent.change(getByPlaceholderText(UI.PLACEHOLDER), { target: { value: TEST.URL } })
  fireEvent.click(getByTestId(TEST.BUTTON_TEST_ID))

  await waitForElement(() => getByText(UI.MESSAGE))

  fireEvent.change(getByPlaceholderText(UI.PLACEHOLDER), { target: { value: '' } })

  expect(queryAllByText(UI.MESSAGE)).toHaveLength(0)

  expect(get).toHaveBeenCalledTimes(1)
  expect(get).toHaveBeenCalledWith(TEST.URL)
})
