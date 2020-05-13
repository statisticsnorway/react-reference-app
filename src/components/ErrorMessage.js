import React from 'react'
import { Message } from 'semantic-ui-react'

import { UI } from '../enums'

const getNestedObject = (nestedObject, pathArray) => pathArray.reduce((object, key) =>
  (object && object[key] !== 'undefined') ? object[key] : undefined, nestedObject
)

function ErrorMessage ({ error, title }) {
  const resolveError = getNestedObject(error, ['response', 'data'])
  const alternateResolveError = getNestedObject(error, ['response', 'statusText'])

  return <Message
    error
    header={title ? title : UI.ERROR_HEADER}
    content={resolveError === undefined ? alternateResolveError === undefined ?
      error.toString() : alternateResolveError : resolveError
    }
  />
}

export default ErrorMessage
