import React from 'react'
import useAxios from 'axios-hooks'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'

import { AppHome } from '../components'
import { ApiContext, LanguageContext } from '../context/AppContext'
import { API, TEST_CONFIGURATIONS } from '../configurations'
import { UI } from '../enums'

jest.mock('../components/ResponseView', () => () => null)

const { errorObject, errorString, language } = TEST_CONFIGURATIONS
const apiContext = TEST_CONFIGURATIONS.apiContext(jest.fn())
const refetch = jest.fn()

const setup = () => {
  const { getByPlaceholderText, getByText } = render(
    <ApiContext.Provider value={apiContext}>
      <LanguageContext.Provider value={{ language: language }}>
        <AppHome />
      </LanguageContext.Provider>
    </ApiContext.Provider>
  )

  return { getByPlaceholderText, getByText }
}

describe('Common mock', () => {
  beforeEach(() => {
    useAxios.mockReturnValue([{ data: {}, loading: false, error: null }, refetch])
  })

  test('Renders with response from backend', () => {
    const { getByPlaceholderText, getByText } = setup()

    userEvent.type(getByPlaceholderText(UI.PLACEHOLDER[language]), '/')
    userEvent.click(getByText(UI.BUTTON[language]))

    expect(useAxios).toHaveBeenCalledWith(`${window.__ENV.REACT_APP_API}${API.GET_SCHEMAS}/`, {
      'manual': true,
      'useCache': false
    })
  })

  test('Pressing "Enter" triggers backend call', () => {
    const { getByPlaceholderText } = setup()

    userEvent.type(getByPlaceholderText(UI.PLACEHOLDER[language]), '{enter}')

    expect(useAxios).toHaveBeenCalledWith(`${window.__ENV.REACT_APP_API}${API.GET_SCHEMAS}`, {
      'manual': true,
      'useCache': false
    })
  })
})

test('Renders correctly', () => {
  useAxios.mockReturnValue([{ data: undefined, loading: false, error: null }, refetch])
  const { getByPlaceholderText } = setup()

  expect(getByPlaceholderText(UI.PLACEHOLDER[language]).value).toEqual(`${window.__ENV.REACT_APP_API}${API.GET_SCHEMAS}`)
})

test('Renders error when backend call returns error', () => {
  useAxios.mockReturnValue([{ data: undefined, loading: false, error: errorObject }, refetch])
  const { getByText } = setup()

  expect(getByText(errorString)).toBeInTheDocument()
})
