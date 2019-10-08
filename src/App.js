import React, { Component } from 'react'
import { Button, Container, Divider, Grid, Input, List, Message } from 'semantic-ui-react'

import { get } from './Get'
import { TEST, UI } from './Enums'

class App extends Component {
  state = {
    loading: false,
    response: false,
    url: `${process.env.REACT_APP_LDS}${UI.AGENT_SCHEMA}`
  }

  handleChange = (event, data) => {
    this.setState({
      [data.name]: data.value,
      response: false
    })
  }

  testEndpoint = () => {
    const { url } = this.state

    this.setState({
        loading: true,
        response: false
      }, () => get(url).then(() =>
        this.setState({
          loading: false,
          response: true
        })
      )
    )
  }

  render () {
    const { loading, response, url } = this.state

    return (
      <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
        <div style={{ flex: 1 }}>
          <Grid textAlign='center'>
            <Grid.Column mobile={16} tablet={8} computer={4}>
              <>
                <Divider hidden />
                <Input
                  data-testid='input'
                  fluid
                  loading={loading}
                  name='url'
                  onChange={this.handleChange}
                  placeholder={UI.PLACEHOLDER}
                  size='large'
                  value={url}
                />
                {response && <Message content={UI.MESSAGE} info />}
                <Divider hidden />
                <Button
                  content={UI.BUTTON}
                  color='teal'
                  data-testid={TEST.BUTTON_TEST_ID}
                  disabled={url === '' || loading}
                  onClick={this.testEndpoint}
                  size='massive'
                />
              </>
            </Grid.Column>
          </Grid>
        </div>
        <Container fluid textAlign='center'>
          <Divider section />
          <List horizontal divided link size='small'>
            <List.Item as='a' href={`${process.env.REACT_APP_SOURCE_URL}`} icon={{ fitted: true, name: 'github' }} />
            <List.Item content={`${UI.VERSION}: ${process.env.REACT_APP_VERSION}`} />
          </List>
          <Divider hidden />
        </Container>
      </div>

    )
  }
}

export default App
