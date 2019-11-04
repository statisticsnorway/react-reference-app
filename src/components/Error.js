import React from 'react'
import { Message } from 'semantic-ui-react'

const getNestedObject = (nestedObject, pathArray) => {
  return pathArray.reduce((object, key) =>
      (object && object[key] !== 'undefined') ? object[key] : undefined,
    nestedObject
  )
}

function Error ({ error }) {
  const resolveError = getNestedObject(error, ['response', 'data'])

  return (
    <Message error content={resolveError === undefined ? error.toString() : resolveError} />
  )
}

export default Error
