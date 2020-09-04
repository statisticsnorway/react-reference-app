import React from 'react'
import { render } from '@testing-library/react'

import ResponseView from '../components/ResponseView'

const testDataString = 'Some data'
const testDataArrayString1 = 'Array data 1'
const testDataArrayString2 = 'Array data 2'
const testDataNestedObjectString = 'Nested data'
const testDataObject = { data: testDataString }
const testDataArray = [testDataArrayString1, testDataArrayString2]
const testDataNestedObject = {
  data: testDataString,
  key: {
    test: testDataNestedObjectString
  }
}

const setup = (data) => {
  const { getByText } = render(<ResponseView data={data} />)

  return { getByText }
}

describe('DataView renders with data of type ', () => {
  test('flat', () => {
    const { getByText } = setup(testDataString)

    expect(getByText(testDataString)).toBeInTheDocument()
  })

  test('object', () => {
    const { getByText } = setup(testDataObject)

    expect(getByText(testDataString)).toBeInTheDocument()
  })

  test('nested object', () => {
    const { getByText } = setup(testDataNestedObject)

    expect(getByText(testDataNestedObjectString)).toBeInTheDocument()
  })

  test('array', () => {
    const { getByText } = setup(testDataArray)

    expect(getByText(testDataArrayString1)).toBeInTheDocument()
    expect(getByText(testDataArrayString2)).toBeInTheDocument()
  })
})
