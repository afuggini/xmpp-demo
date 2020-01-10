import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import './ChatBox.css'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  avatar: {
    marginRight: theme.spacing(1)
  }
}))

const ChatBox = ({ messages, onSendMessage, onLogout, wrapperRef, receiver }) => {
  const classes = useStyles()
  const [currentMessage, setCurrentMessage] = useState('')

  const handleChange = event => {
    setCurrentMessage(event.target.value)
  }

  const handleKeyPress = event => {
    const { value } = event.target
    if (event.key === 'Enter') {
      event.preventDefault()
      if (value) {
        onSendMessage(event.target.value)
        setCurrentMessage('')
      }
    }
  }

  return (
    <div className="ChatBox">
      <AppBar position="static">
        <Toolbar>
          <Avatar className={classes.avatar} alt={receiver} src="https://api.adorable.io/avatars/120/abott@adorable.png" />
          <Typography variant="h6" className={classes.title}>
            {receiver}
          </Typography>
          <Button color="inherit" onClick={onLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Box>
        <div className="messages" ref={wrapperRef}>
          {messages
            ? messages.map((message, index) => (
              <div key={`message-${index}`} className={message.from === 'Me' ? 'self' : ''}>
                <div className="bubble">{message.body}</div>
              </div>
            ))
            : 'No messages here'}
        </div>
        <div className="chat-box">
          <textarea
            rows={10}
            placeholder="Enter text here..."
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            value={currentMessage}
          />
        </div>
      </Box>
    </div>
  )
}

export default ChatBox
