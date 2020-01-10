import React from 'react'
import ChatBox from '../ChatBox'
import Login from '../Login'
import ChatClient from '../../ChatClient'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2196f3'
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      contrastText: '#ffcc00',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  }
})

class ChatApp extends React.Component {
  constructor () {
    super()
    this.state = {
      username: '',
      receiver: '',
      loggedIn: false,
      loggingIn: false,
      messages: [],
      loginError: ''
    }
    this.chatClient = new ChatClient({
      onAuthFailed: this.onAuthFailed.bind(this),
      onAuthSuccess: this.onAuthSuccess.bind(this),
      onMessage: this.onMessage.bind(this)
    })
    this.wrapper = React.createRef()
  }

  onSendMessage (body) {
    this.chatClient.send({ to: this.state.receiver, body })
    this.setState({
      messages: [ ...this.state.messages, { from: 'Me', body } ]
    }, () => {
      this.wrapper.current.scrollBy(0, 1000000)
    })
  }

  onAuthFailed (event) {
    this.setState({
      loggingIn: false,
      username: '',
      loginError: 'Wrong username or password'
    })
  }

  onAuthSuccess () {
    this.setState({ loggingIn: false, loggedIn: true })
  }

  onLogin (credentials, receiver) {
    this.setState({
      loggingIn: true,
      username: credentials.username,
      receiver
    })
    this.chatClient.create(credentials)
    this.chatClient.connect()
  }

  onLogout () {
    this.setState({
      loggedIn: false,
      username: '',
      receiver: '',
      messages: []
    })
    this.chatClient.disconnect()
  }

  onMessage (message) {
    message.body && this.setState({
      messages: [
        ...this.state.messages,
        { from: message.from, body: message.body }
      ]
    }, () => {
      this.wrapper.current.scrollBy(0, 1000000)
    })
  }

  render () {
    const { loginError, loggedIn, loggingIn, messages, receiver } = this.state
    return (
      <ThemeProvider theme={theme}>
        <div className="ChatApp">
          {!loggedIn
          ? <Login
              errorMessage={loginError}
              loggingIn={loggingIn}
              onLogin={this.onLogin.bind(this)}
            />
          : <ChatBox
              loggingIn={loggingIn}
              messages={messages}
              onLogout={this.onLogout.bind(this)}
              onSendMessage={this.onSendMessage.bind(this)}
              receiver={receiver}
              wrapperRef={this.wrapper}
            />
          }
        </div>
      </ThemeProvider>
    )
  }
}

export default ChatApp
