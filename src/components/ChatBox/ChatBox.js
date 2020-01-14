import React, { useState, useEffect } from 'react'
import './ChatBox.css'

const ChatBox = ({ messages, onSendMessage, messageWrapper }) => {
  const [currentMessage, setCurrentMessage] = useState('')

  useEffect(() => {
    const { current } = messageWrapper
    current && current.scrollBy(0, current.offsetTop + current.offsetHeight)
  }, [messageWrapper])

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
      <div className="messages" ref={messageWrapper}>
        {messages && messages.map((message, index) => (
          <div key={`message-${index}`} className={message.from === 'Me' ? 'self' : ''}>
            <div className="bubble">{message.body}</div>
          </div>
        ))}
      </div>
      <div className="chat-box">
        <textarea
          rows={10}
          placeholder={'Enter text here...'}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          value={currentMessage}
        />
      </div>
    </div>
  )
}

export default ChatBox
