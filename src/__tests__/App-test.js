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
  const {getByPlaceholderText, getByTestId, queryAllByPlaceholderText, queryAllByText} = setup()

  expect(queryAllByPlaceholderText('Test endpoint...')).toHaveLength(1)
  expect(getByPlaceholderText('Test endpoint...').value).toEqual('https://lds.staging.ssbmod.net/ns/Agent?schema')
  expect(queryAllByText('Test')).toHaveLength(1)
  expect(getByTestId('button')).toBeEnabled()

  fireEvent.change(getByPlaceholderText('Test endpoint...'), {target: {value: ''}})

  expect(getByTestId('button')).toBeDisabled()
})

test('App handles fetch correctly', async () => {
  get.mockImplementation(() => Promise.resolve())

  const {getByPlaceholderText, getByTestId, getByText} = setup()

  fireEvent.change(getByPlaceholderText('Test endpoint...'), {target: {value: 'https://www.someurl.com'}})
  fireEvent.click(getByTestId('button'))

  await waitForElement(() => getByText('Check browser console for response'))

  expect(get).toHaveBeenCalledTimes(1)
  expect(get).toHaveBeenCalledWith('https://www.someurl.com')
})
