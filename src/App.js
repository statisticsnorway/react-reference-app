import React, { useState } from 'react'
import useAxios from 'axios-hooks'
import { Button, Divider, Grid, Input } from 'semantic-ui-react'
import { ErrorMessage } from '@statisticsnorway/dapla-js-utilities'
import DataView from './components/DataView';

import { UI } from './enums'
import { Footer } from './components/'

function App() {
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
              </>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={12} tablet={16} mobile={16}>
              <>
                {data && !loading && !error &&
                  <div style={{ textAlign: 'left' }}><DataView data={data} /></div>
                }
                {error && <ErrorMessage error={error} />}
              </>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      <Footer />
    </div>
  )
}

export default App
