import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import HistoryList from './HistoryList'

const useStyles = makeStyles(theme => ({
  newChat: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 3, 4),
  },
  textField: {
    marginBottom: theme.spacing(2)
  },
  noChats: {
    padding: theme.spacing(1, 3)
  },
  addIcon: {
    marginBottom: '-4px'
  }
}))

const ChatHistory = ({ messages, onNewChat }) => {
  const classes = useStyles()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [username, setUsername] = useState('')

  const onSubmit = event => {
    event.preventDefault()
    onNewChat(username)
    setModalIsOpen(false)
  }

  return (
    <div className="ChatHistory">
      {Object.keys(messages).length
        ? <HistoryList messages={messages} onNewChat={onNewChat} />
        : <p className={classes.noChats}>No chats yet. Start a new chat by clicking the <AddIcon className={classes.addIcon} /> button.</p>}
      <Fab
        color="primary"
        aria-label="add"
        className={classes.newChat}
        onClick={() => setModalIsOpen(true)}
      >
        <AddIcon />
      </Fab>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modalIsOpen}
        disableAutoFocus
        disableEnforceFocus
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
        onBackdropClick={() => setModalIsOpen(false)}
      >
        <Fade in={modalIsOpen}>
          <div className={classes.paper}>
            <h3>New chat</h3>
            <form onSubmit={onSubmit}>
              <TextField
                className={classes.textField}
                fullWidth
                variant="outlined"
                id="username"
                label="Username"
                placeholder="user@conversejs.org"
                onChange={e => setUsername(e.target.value)}
                value={username}
              />
              <Button
                color="primary"
                type="submit"
                variant="contained"
              >
                Start Chat
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default ChatHistory
