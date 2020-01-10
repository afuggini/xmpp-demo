import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Alert } from '@material-ui/lab'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  container: {
    paddingBottom: theme.spacing(5),
    paddingTop: theme.spacing(5)
  },
  form: {
    marginTop: theme.spacing(5),
    '& > *': {
      marginBottom: theme.spacing(3)
    },
  },
}))

const Login = ({ onLogin, loggingIn, errorMessage }) => {
  const classes = useStyles()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [receiver, setReceiver] = useState('')

  const onSubmit = event => {
    event.preventDefault()
    onLogin({ username, password }, receiver)
  }

  return (
    <Container className={classes.container} maxWidth="sm">
      <Typography variant="h4" gutterBottom>Login</Typography>
      <form className={classes.form} noValidate autoComplete="off" onSubmit={onSubmit}>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <TextField
          fullWidth
          id="username"
          label="Username"
          variant="outlined"
          placeholder="user@conversejs.org"
          onChange={e => setUsername(e.target.value)}
          value={username}
        />
        <TextField
          fullWidth
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
        <TextField
          fullWidth
          id="receiver"
          label="Chat with"
          variant="outlined"
          placeholder="user@conversejs.org"
          onChange={e => setReceiver(e.target.value)}
          value={receiver}
        />
        <Button
          color="primary"
          disabled={loggingIn}
          type="submit"
          variant="contained"
        >
          Login
        </Button>
      </form>
    </Container>
  )
}

export default Login
