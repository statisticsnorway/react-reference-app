import React, { Component } from 'react'
import { Button, Divider, Grid, Input, Message, Segment } from 'semantic-ui-react'

import { get } from './Get'

class App extends Component {
  state = {
    loading: false,
    response: false,
    url: 'https://reactapp.staging.ssbmod.net/be/lds/ns/Agent?schema'
  }

  componentDidMount () {
    process.env.NODE_ENV !== 'test' && console.log("Environment is: ", process.env)
  }

  handleChange = (event, data) => {
    this.setState({[data.name]: data.value})
  }

  testEndpoint = () => {
    const {url} = this.state

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
    const {loading, response, url} = this.state

    return (
      <div className='vertical-display'>
        <style>{`body > div,body > div > div, body > div > div > div.vertical-display {height: 100%;}`}</style>
        <Grid textAlign='center' style={{height: '100%'}} verticalAlign='middle'>
          <Grid.Column mobile={16} tablet={8} computer={4}>
            <Segment basic>
              <Input
                data-testid='input'
                fluid
                loading={loading}
                name='url'
                onChange={this.handleChange}
                placeholder='Test endpoint...'
                size='large'
                value={url}
              />
              {response && <Message content={`Check browser console for response`} info />}
              <Divider hidden />
              <Button
                content={`Test`}
                color='teal'
                data-testid='button'
                disabled={url === ''}
                icon='call'
                onClick={this.testEndpoint}
                size='massive'
              />
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default App
