import React from 'react'
import { render } from '@testing-library/react'
import useAxios from 'axios-hooks'

import App from '../App'
import { UI } from '../enums'
import userEvent from '@testing-library/user-event'

const refetch = jest.fn()
const errorString = 'A problem occured'
const errorObject = { response: { data: errorString } }
const testDataObject = { data: 'Some data' }
const testDataString = '{ \"data\": \"Some data\" }'

const setup = () => {
  const { getByPlaceholderText, getByText } = render(<App />)

  return { getByPlaceholderText, getByText }
}

test('App renders correctly', () => {
  useAxios.mockReturnValue([{ data: undefined, loading: false, error: null }, refetch])
  const { getByPlaceholderText, getByText } = setup()

  expect(getByPlaceholderText(UI.PLACEHOLDER).value).toEqual(`${process.env.REACT_APP_LDS}${UI.AGENT_SCHEMA}`)
  expect(getByText(`${UI.VERSION}: ${process.env.REACT_APP_VERSION}`)).toBeInTheDocument()
})

test('App renders with response from backend', () => {
  useAxios.mockReturnValue([{ data: testDataObject, loading: false, error: null }, refetch])
  const { getByPlaceholderText, getByText } = setup()

  userEvent.type(getByPlaceholderText(UI.PLACEHOLDER), '/')

  expect(getByText(testDataString)).toBeInTheDocument()
  expect(useAxios).toHaveBeenNthCalledWith(3, 'http://localhost:9090/ns/Agent?schema/', { 'manual': true })
})

test('Renders error when backend call returns error', () => {
  useAxios.mockReturnValue([{ data: undefined, loading: false, error: errorObject }, refetch])
  const { getByText } = setup()

  expect(getByText(UI.ERROR_HEADER))
  expect(getByText(errorString)).toBeInTheDocument()
})
