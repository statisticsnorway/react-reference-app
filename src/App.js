import React, { useState } from 'react'
import useAxios from 'axios-hooks'
import { Button, Divider, Grid, Input, Segment } from 'semantic-ui-react'
import { ErrorMessage, SimpleFooter } from '@statisticsnorway/dapla-js-utilities'

import ResponseView from './components/ResponseView'
import { UI } from './enums/UI'

function App () {
  const [url, setUrl] = useState(`${process.env.REACT_APP_API}${UI.SCHEMAS}`)

  const [{ data, loading, error }, refetch] = useAxios(url, { manual: true })

  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <div style={{ flex: 1 }}>
        <Grid textAlign='center'>
          <Grid.Row>
            <Grid.Column mobile={16} tablet={8} computer={6}>
              <>
                <Divider hidden />
                <Input
                  fluid
                  value={url}
                  size='large'
                  loading={loading}
                  disabled={loading}
                  placeholder={UI.PLACEHOLDER}
                  onKeyPress={({ key }) => key === 'Enter' && refetch()}
                  onChange={(event, { value }) => setUrl(value)}
                />
                <Divider hidden />
                <Button
                  color='teal'
                  size='massive'
                  onClick={refetch}
                  content={UI.BUTTON}
                  disabled={url === '' || loading}
                />
              </>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={12} tablet={16} mobile={16}>
              {data && !loading && !error && <ResponseView data={data} />}
              {error && <ErrorMessage error={error} />}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      <Segment basic>
        <SimpleFooter appVersion={process.env.REACT_APP_VERSION} sourceUrl={process.env.REACT_APP_SOURCE_URL} />
      </Segment>
    </div>
  )
}

export default App
