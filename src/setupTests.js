import '@testing-library/jest-dom/extend-expect'

jest.mock('axios-hooks')

window._env = {
  REACT_APP_API: process.env.REACT_APP_API
}
