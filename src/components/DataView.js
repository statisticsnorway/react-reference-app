import React from 'react'
import { Accordion, Container, List } from 'semantic-ui-react'

function DataView ({ data }) {
  const parseData = (data, first, index) => {

    let composite = Array.isArray(data) ? {
        key: 'a',
        title: 'array',
        content: {
          content: (<List>{data.map((datum, index) => parseData(datum, false, index))}</List>)
        }
      }
      : typeof data === 'object' && data !== null && data !== undefined ? {
        key: 'o',
        title: 'object',
        content: {
          content: (
            <List>
              {Object.entries(data).map((entry, index) =>
                <List.Item key={index}>
                  <List.Header>{entry[0]}</List.Header>
                  {parseData(entry[1], false)}
                </List.Item>
              )}
            </List>
          )
        }
      } : null

    return (
      composite && first ? <Accordion fluid styled defaultActiveIndex={0} panels={[composite]} />
        : composite ? <Accordion.Accordion panels={[composite]} />
        : <div key={index !== undefined ? index : 1}>{data}</div>
    )
  }

  return (
    <Container textAlign='left'>
      {parseData(data, true)}
    </Container>
  )
}

export default DataView
