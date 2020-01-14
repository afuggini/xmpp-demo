import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ChatBox from '../ChatBox'
import ChatHistory from '../ChatHistory'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  exitIcon: {
    marginLeft: theme.spacing(1),
  }
}))

const MainScreen = ({
  hasBackButton,
  onBack,
  onNewChat,
  section,
  receiver,
  messages,
  onLogout,
  onSendMessage,
  messageWrapper
}) => {
  const classes = useStyles()

  return (
    <div className="MainScreen">
      <AppBar position="static">
        <Toolbar>
          {hasBackButton && (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={onBack}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography variant="h6" className={classes.title}>
            {section === 'chat' ? receiver : `Chat App`}
          </Typography>
          <Button color="inherit" onClick={onLogout}>
            Logout
            <ExitToAppIcon className={classes.exitIcon} />
          </Button>
        </Toolbar>
      </AppBar>
      {section === 'history' &&
        <ChatHistory
          messages={messages}
          onNewChat={onNewChat}
        />
      }
      {section === 'chat' &&
        <ChatBox
          messages={messages ? messages[receiver] : []}
          messageWrapper={messageWrapper}
          onSendMessage={onSendMessage}
          receiver={receiver}
        />
      }
    </div>
  )
}

export default MainScreen
