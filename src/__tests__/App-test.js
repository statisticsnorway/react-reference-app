import React from 'react'
import 'jest-dom/extend-expect'
import { cleanup, fireEvent, render, waitForElement } from 'react-testing-library'

import App from '../App'
import { get } from '../Get'

jest.mock('../Get', () => ({get: jest.fn()}))

afterEach(() => {
  get.mockReset()
  cleanup()
})

const setup = () => {
  const {getByPlaceholderText, getByTestId, getByText, queryAllByPlaceholderText, queryAllByText} = render(<App />)

  return {getByPlaceholderText, getByTestId, getByText, queryAllByPlaceholderText, queryAllByText}
}

test('App renders correctly', () => {
  const {getByTestId, queryAllByPlaceholderText, queryAllByText} = setup()

  expect(queryAllByPlaceholderText('Test endpoint...')).toHaveLength(1)
  expect(queryAllByText('Test')).toHaveLength(1)
  expect(getByTestId('button')).toBeDisabled()
})

test('App handles healthy fetch correctly', async () => {
  get.mockImplementation(() => Promise.resolve())

  const {getByPlaceholderText, getByTestId, getByText} = setup()

  fireEvent.change(getByPlaceholderText('Test endpoint...'), {target: {value: 'https://www.someurl.com'}})
  fireEvent.click(getByTestId('button'))

  await waitForElement(() => getByText('Check browser console for response'))

  expect(get).toHaveBeenCalledTimes(1)
  expect(get).toHaveBeenCalledWith(['https://www.someurl.com'])
})
