import React from 'react'
import useAxios from 'axios-hooks'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'

import App from '../App'
import { UI } from '../enums'

jest.mock('../components/ResponseView', () => () => null)

const refetch = jest.fn()
const errorString = 'A problem occured'
const errorObject = { response: { data: errorString } }

const setup = () => {
  const { getByPlaceholderText, getByText } = render(<App />)

  return { getByPlaceholderText, getByText }
}

test('App renders correctly', () => {
  useAxios.mockReturnValue([{ data: undefined, loading: false, error: null }, refetch])
  const { getByPlaceholderText, getByText } = setup()

  expect(getByPlaceholderText(UI.PLACEHOLDER).value).toEqual(`${process.env.REACT_APP_API}${UI.SCHEMAS}`)
  expect(getByText(`${UI.VERSION}: ${process.env.REACT_APP_VERSION}`)).toBeInTheDocument()
})

test('App renders with response from backend', () => {
  useAxios.mockReturnValue([{ data: {}, loading: false, error: null }, refetch])
  const { getByPlaceholderText } = setup()

  userEvent.type(getByPlaceholderText(UI.PLACEHOLDER), '/')

  expect(useAxios).toHaveBeenNthCalledWith(3, `${process.env.REACT_APP_API}${UI.SCHEMAS}/`, { 'manual': true })
})

test('App renders error when backend call returns error', () => {
  useAxios.mockReturnValue([{ data: undefined, loading: false, error: errorObject }, refetch])
  const { getByText } = setup()

  expect(getByText(errorString)).toBeInTheDocument()
})
