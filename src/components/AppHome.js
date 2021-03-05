import React, { useContext, useState } from 'react'
import useAxios from 'axios-hooks'
import { Button, Divider, Grid, Input } from 'semantic-ui-react'
import { ErrorMessage, SSB_COLORS } from '@statisticsnorway/dapla-js-utilities'

import ResponseView from './ResponseView'
import { LanguageContext } from '../context/AppContext'
import { API } from '../configurations'
import { UI } from '../enums'

function AppHome () {
  const { language } = useContext(LanguageContext)

  const [url, setUrl] = useState(`${window.__ENV.REACT_APP_API}${API.GET_SCHEMAS}`)

  const [{ data, loading, error }, refetch] = useAxios(url, { manual: true, useCache: false })

  return (
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
              placeholder={UI.PLACEHOLDER[language]}
              onKeyPress={({ key }) => key === 'Enter' && refetch()}
              onChange={(event, { value }) => setUrl(value)}
            />
            <Divider hidden />
            <Button
              size='massive'
              onClick={refetch}
              content={UI.BUTTON[language]}
              disabled={url === '' || loading}
              style={{ backgroundColor: SSB_COLORS.BLUE }}
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
  )
}

export default AppHome
