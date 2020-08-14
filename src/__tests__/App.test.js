import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useAxios from 'axios-hooks'

import App from '../App'
import { UI } from '../enums'

const refetch = jest.fn()
const errorString = 'A problem occured'
const errorObject = { response: { data: errorString } }

const testDataString = 'Some data';
const testDataNestedObjectString = 'nested data';
const testDataArrayString1 = 'array data 1';
const testDataArrayString2 = 'array data 2';

const testDataObject = {
  data: testDataString
}
const testDataNestedObject = {
  data: testDataString,
  key: {
    test: testDataNestedObjectString
  }
};
const testDataArray = [
  testDataArrayString1,
  testDataArrayString2
];

const setup = () => {
  const { getByPlaceholderText, getByText, queryAllByRole, queryByRole } = render(<App />)

  return { getByPlaceholderText, getByText, queryAllByRole, queryByRole }
}

test('App renders correctly', () => {
  useAxios.mockReturnValue([{ data: undefined, loading: false, error: null }, refetch])
  const { getByPlaceholderText, getByText } = setup()

  expect(getByPlaceholderText(UI.PLACEHOLDER).value).toEqual(`${process.env.REACT_APP_API}${UI.SCHEMAS}`)
  expect(getByText(`${UI.VERSION}: ${process.env.REACT_APP_VERSION}`)).toBeInTheDocument()

})

test('App renders with flat response from backend', () => {
  useAxios.mockReturnValue([{ data: testDataString, loading: false, error: null }, refetch])
  const { getByPlaceholderText, getByText } = setup()

  userEvent.type(getByPlaceholderText(UI.PLACEHOLDER), '/')
  
  expect(getByText(testDataString)).toBeInTheDocument()
  expect(useAxios).toHaveBeenNthCalledWith(3, `${process.env.REACT_APP_API}${UI.SCHEMAS}/`, { 'manual': true })

})

test('App renders object with response from backend', () => {
  useAxios.mockReturnValue([{ data: testDataObject, loading: false, error: null }, refetch])
  const { getByText } = setup()
  
  expect(getByText(testDataString)).toBeInTheDocument()
  expect(useAxios).toHaveBeenNthCalledWith(3, `${process.env.REACT_APP_API}${UI.SCHEMAS}/`, { 'manual': true })

})

test('App renders nested object with response from backend', () => {
  useAxios.mockReturnValue([{ data: testDataNestedObject, loading: false, error: null }, refetch])
  const { getByText } = setup()

  expect(getByText(testDataNestedObjectString)).toBeInTheDocument()
  
})

test('App renders array with response from backend', () => {
  useAxios.mockReturnValue([{ data: testDataArray, loading: false, error: null }, refetch])
  const { getByText } = setup()
  
  expect(getByText(testDataArrayString1)).toBeInTheDocument()
  expect(getByText(testDataArrayString2)).toBeInTheDocument()

})

test('Renders error when backend call returns error', () => {
  useAxios.mockReturnValue([{ data: undefined, loading: false, error: errorObject }, refetch])
  const { getByText } = setup()
  
  expect(getByText(errorString)).toBeInTheDocument()

})
