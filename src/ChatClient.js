import * as XMPP from 'stanza'

export default class ChatClient {
  constructor ({ onAuthFailed, onAuthSuccess, onMessage, onStreamError }) {
    this.onAuthFailed = onAuthFailed
    this.onAuthSuccess = onAuthSuccess
    this.onMessage = onMessage
    this.onStreamError = onStreamError
  }

  create ({ username, password }) {
    const client = XMPP.createClient({
      jid: username,
      password,
      transports: {
        websocket: 'wss://conversejs.org/xmpp-websocket',
        bosh: 'https://conversejs.org/http-bind/'
      }
    })
    client.on('session:started', () => {
      client.getRoster()
      client.sendPresence()
    })
    client.on('auth:failed', this.onAuthFailed)
    client.on('auth:success', this.onAuthSuccess)
    client.on('stream:error', this.onStreamError)
    client.on('*', console.log)
    client.on('message', this.onMessage)
    // client.on('connected', onConnect)
    client.on('message', msg => console.log('Message: ' + JSON.stringify(msg)))
    this.client = client
    return client
  }

  connect () {
    this.client.connect()
  }

  disconnect () {
    this.client.disconnect()
  }

  send (message) {
    this.client.sendMessage(message)
  }
}
