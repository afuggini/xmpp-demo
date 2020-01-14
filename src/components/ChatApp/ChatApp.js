import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { CookiesProvider, withCookies } from 'react-cookie'
import MainScreen from '../MainScreen'
import Login from '../Login'
import ChatClient from '../../ChatClient'

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
    this.initialState = {
      section: 'history',
      username: '',
      password: '',
      receiver: '',
      loggedIn: false,
      loggingIn: false,
      messages: {},
      loginError: '',
      connecting: true
    }
    this.state = { ...this.initialState }
    this.chatClient = new ChatClient({
      onAuthFailed: this.onAuthFailed.bind(this),
      onAuthSuccess: this.onAuthSuccess.bind(this),
      onMessage: this.onMessage.bind(this)
    })
    this.wrapper = React.createRef()
  }

  componentDidMount () {
    const { cookies } = this.props
    const loginCookie = cookies.get('credentials')
    if (loginCookie) {
      this.onLogin(loginCookie)
      const messages = localStorage.getItem('messages')
      this.setState({
        loggedIn: true,
        loggingIn: false,
        connecting: true,
        messages: messages ? JSON.parse(messages) : {}
      })
    }
  }

  onSendMessage (body) {
    const { messages, receiver } = this.state
    const updatedMessages = { ...messages }
    updatedMessages[receiver] = messages[receiver] || []
    updatedMessages[receiver].push({ from: 'Me', to: receiver, body })
    this.chatClient.send({ to: receiver, body })
    this.setState({ messages: updatedMessages }, this.scrollChat.bind(this))
    localStorage.setItem('messages', JSON.stringify(updatedMessages))
  }

  onMessage (message) {
    if (message.body) {
      const { messages } = this.state
      const receiver = message.from.split('/')[0]
      const updatedMessages = { ...messages }
      updatedMessages[receiver] = messages[receiver] || []
      updatedMessages[receiver].push({ from: receiver, body: message.body })
      this.setState({ messages: updatedMessages }, this.scrollChat.bind(this))
      localStorage.setItem('messages', JSON.stringify(updatedMessages))
    }
  }

  onAuthFailed (event) {
    this.setState({
      loggingIn: false,
      username: '',
      loginError: 'Wrong username or password'
    })
  }

  onAuthSuccess () {
    const { cookies } = this.props
    const { username, password } = this.state
    const expires = new Date()
    expires.setDate(expires.getDate() + 1)
    // @XXX WARNING: THIS IS INSECURE BY DESIGN AS PASSWORD IS NOT ENCRYPTED
    // AND IS DONE FOR DEMO PURPOSES ONLY - NOT SUITABLE FOR PRODUCTION ENVIRONMENTS
    cookies.set('credentials', JSON.stringify({
      username,
      password
    }), {
      expires,
      path: '/'
    })
    this.setState({
      loggingIn: false,
      loggedIn: true,
      connecting: false
    })
  }

  onLogin (credentials) {
    if (!credentials.username || !credentials.password) return
    this.setState({
      loggingIn: true,
      username: credentials.username,
      password: credentials.password,
      loginError: ''
    })
    this.chatClient.create(credentials)
    this.chatClient.connect()
  }

  onLogout () {
    this.setState(this.initialState)
    this.chatClient.disconnect()
    this.props.cookies.remove('credentials')
    localStorage.removeItem('messages')
  }

  onNewChat (receiver) {
    if (receiver.indexOf('@conversejs.org') < 0) {
      receiver += '@conversejs.org'
    }
    this.setState({ receiver, section: 'chat' })
  }

  scrollChat () {
    const { current } = this.wrapper
    current && current.scrollBy(0, current.offsetTop + current.offsetHeight)
  }

  onBack () {
    if (this.state.section === 'chat') {
      this.setState({ section: 'history' })
    }
  }

  render () {
    const { connecting, section, receiver, loginError, loggedIn, loggingIn, messages } = this.state

    return (
      <CookiesProvider>
        <ThemeProvider theme={theme}>
          <div className="ChatApp">
            {!loggedIn
            ? <Login
                errorMessage={loginError}
                loggingIn={loggingIn}
                onLogin={this.onLogin.bind(this)}
              />
            : <MainScreen
                hasBackButton={section === 'chat'}
                onBack={this.onBack.bind(this)}
                receiver={receiver}
                section={section}
                onNewChat={this.onNewChat.bind(this)}
                connecting={connecting}
                messages={messages}
                onLogout={this.onLogout.bind(this)}
                onSendMessage={this.onSendMessage.bind(this)}
                messageWrapper={this.wrapper}
              />
            }
          </div>
        </ThemeProvider>
      </CookiesProvider>
    )
  }
}

export default withCookies(ChatApp)
