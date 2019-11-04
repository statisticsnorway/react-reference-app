import React, { useState } from 'react'
import useAxios from 'axios-hooks'
import { Button, Divider, Grid, Input } from 'semantic-ui-react'

import { TEST, UI } from './enums'
import { Error, Footer } from './components/'

function App () {
  const [url, setUrl] = useState(`${process.env.REACT_APP_LDS}${UI.AGENT_SCHEMA}`)
  const [{ data, loading, error }, refetch] = useAxios(url, { manual: true })

  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <div style={{ flex: 1 }}>
        <Grid textAlign='center'>
          <Grid.Column mobile={16} tablet={8} computer={6}>
            <>
              <Divider hidden />
              <Input
                data-testid={TEST.INPUT_TEST_ID}
                fluid
                loading={loading}
                onChange={(event) => setUrl(event.target.value)}
                placeholder={UI.PLACEHOLDER}
                size='large'
                value={url}
              />
              <Divider hidden />
              <Button
                content={UI.BUTTON}
                color='teal'
                data-testid={TEST.BUTTON_TEST_ID}
                disabled={url === '' || loading}
                onClick={refetch}
                size='massive'
              />
              <Divider hidden />
              {data && !loading && !error &&
              <pre style={{ whiteSpace: 'normal' }}>{JSON.stringify(data, null, 2)}</pre>
              }
              {error && <Error error={error} />}
            </>
          </Grid.Column>
        </Grid>
      </div>
      <Footer />
    </div>
  )
}

export default App
