import React from 'react'
import useAxios from 'axios-hooks'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'

import App from '../App'
import { UI } from '../enums/UI'

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
  const { getByPlaceholderText } = setup()

  expect(getByPlaceholderText(UI.PLACEHOLDER).value).toEqual(`${process.env.REACT_APP_API}${UI.SCHEMAS}`)
})

test('App renders with response from backend', () => {
  useAxios.mockReturnValue([{ data: {}, loading: false, error: null }, refetch])
  const { getByPlaceholderText, getByText } = setup()

  userEvent.type(getByPlaceholderText(UI.PLACEHOLDER), '/')
  userEvent.click(getByText(UI.BUTTON))

  expect(useAxios).toHaveBeenNthCalledWith(3, `${process.env.REACT_APP_API}${UI.SCHEMAS}/`, { 'manual': true })
})

test('Pressing "Enter" triggers backend call', () => {
  useAxios.mockReturnValue([{ data: {}, loading: false, error: null }, refetch])
  const { getByPlaceholderText } = setup()

  userEvent.type(getByPlaceholderText(UI.PLACEHOLDER), '{enter}')

  expect(useAxios).toHaveBeenNthCalledWith(4, `${process.env.REACT_APP_API}${UI.SCHEMAS}`, { 'manual': true })
})

test('App renders error when backend call returns error', () => {
  useAxios.mockReturnValue([{ data: undefined, loading: false, error: errorObject }, refetch])
  const { getByText } = setup()

  expect(getByText(errorString)).toBeInTheDocument()
})
