import React from 'react'
import { Accordion, Container, List } from 'semantic-ui-react'

function ResponseView ({ data }) {
  const parseData = (dataToBeParsed, first, indexToBeParsed) => {
    const composite = Array.isArray(dataToBeParsed) ? {
        key: 'a',
        title: 'array',
        content: {
          content: (<List>{dataToBeParsed.map((datum, index) => parseData(datum, false, index))}</List>)
        }
      }
      : typeof dataToBeParsed === 'object' && dataToBeParsed !== null ? {
        key: 'o',
        title: 'object',
        content: {
          content: (
            <List>
              {Object.entries(dataToBeParsed).map((entry, index) =>
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
        : <div key={indexToBeParsed !== undefined ? indexToBeParsed : 1}>{dataToBeParsed}</div>
    )
  }

  return (
    <Container textAlign='left'>
      {parseData(data, true)}
    </Container>
  )
}

export default ResponseView
