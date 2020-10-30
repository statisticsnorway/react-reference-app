import { LANGUAGE } from '@statisticsnorway/dapla-js-utilities'

const errorString = 'A problem occured'

export const TEST_CONFIGURATIONS = {
  alternativeApi: 'http://localhost:9999',
  apiContext: fn => ({
    api: window._env.REACT_APP_API,
    setApi: fn
  }),
  errorObject: { response: { data: errorString } },
  errorString: errorString,
  language: LANGUAGE.LANGUAGES.NORWEGIAN.languageCode,
  otherLanguage: LANGUAGE.LANGUAGES.ENGLISH.languageCode
}
