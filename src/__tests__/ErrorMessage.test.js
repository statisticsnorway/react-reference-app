import React from 'react'
import { render } from '@testing-library/react'

import { ErrorMessage } from '../components'

const errorHeader = 'Error header'
const errorString = 'A problem occured'
const errorObject = { response: { data: errorString } }
const errorStatus = { response: { statusText: errorString } }
const objectToString = '[object Object]'

const setup = (error, title) => {
  const { getByText } = render(<ErrorMessage error={error} title={title} />)

  return { getByText }
}

test('Renders string errors', () => {
  const { getByText } = setup(errorString)

  expect(getByText(errorString)).toBeInTheDocument()
})

test('Renders object errors when object traverse is possible', () => {
  const { getByText } = setup(errorObject)

  expect(getByText(errorString)).toBeInTheDocument()
})

test('Renders object errors when alternative object traverse is possible', () => {
  const { getByText } = setup(errorStatus)

  expect(getByText(errorString)).toBeInTheDocument()
})

test('Renders fallback error when object traverse is impossible', () => {
  const errorObject = { not: { correct: errorString } }
  const { getByText } = setup(errorObject)

  expect(getByText(objectToString)).toBeInTheDocument()
})

test('Renders header when it is provided', () => {
  const { getByText } = setup(errorString, errorHeader)

  expect(getByText(errorHeader)).toBeInTheDocument()
})
