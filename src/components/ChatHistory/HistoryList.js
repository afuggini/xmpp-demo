import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import grey from '@material-ui/core/colors/grey'

const useStyles = makeStyles(theme => ({
  chatHistoryItem: {
    cursor: 'pointer',
    padding: theme.spacing(2),
    borderBottom: `1px solid ${grey[300]}`,
    '&:hover': {
      backgroundColor: grey[100]
    }
  },
  msgBody: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
}))

const HistoryList = ({ messages, onNewChat }) => {
  const classes = useStyles()

  return (
    <div className="HistoryList">
      <div className={classes.chatHistory}>
        {messages && Object.keys(messages).map(username => (
          <div className={classes.chatHistoryItem} onClick={() => onNewChat(username)} key={username}>
            <Typography variant="subtitle1">
              <strong>{username}</strong>
            </Typography>
            <Typography variant="body1" className={classes.msgBody}>
              {messages[username][messages[username].length - 1].body}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HistoryList
