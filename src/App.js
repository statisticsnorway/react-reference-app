import React, { useState } from 'react'
import useAxios from 'axios-hooks'
import { Button, Divider, Grid, Input } from 'semantic-ui-react'

import { UI } from './enums'
import { ErrorMessage, Footer } from './components/'

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
                fluid
                value={url}
                size='large'
                loading={loading}
                placeholder={UI.PLACEHOLDER}
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
              <Divider hidden />
              {data && !loading && !error && <pre>{JSON.stringify(data, null, 2)}</pre>}
              {error && <ErrorMessage error={error} />}
            </>
          </Grid.Column>
        </Grid>
      </div>
      <Footer />
    </div>
  )
}

export default App
