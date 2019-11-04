import React from 'react'
import { cleanup, render } from '@testing-library/react'

import { ErrorMessage } from '../components'

afterEach(() => {
  cleanup()
})

const setup = (error) => {
  const { queryAllByText } = render(<ErrorMessage error={error} />)

  return { queryAllByText }
}

test('Error shows just error when recieving a string', () => {
  const { queryAllByText } = setup('Error')

  expect(queryAllByText('Error')).toHaveLength(1)
})

test('Error shows response error when recieveing an object', () => {
  const { queryAllByText } = setup({ response: { data: 'Error' } })

  expect(queryAllByText('Error')).toHaveLength(1)
})
