import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Alert } from '@material-ui/lab'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
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
  wrapper: {
    display: 'inline-block',
    position: 'relative'
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  }
}))

const Login = ({ onLogin, loggingIn, errorMessage }) => {
  const classes = useStyles()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = event => {
    event.preventDefault()
    onLogin({ username, password })
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
        <div className={classes.wrapper}>
          <Button
            variant="contained"
            color="primary"
            disabled={loggingIn}
            type="submit"
          >
            Login
          </Button>
          {loggingIn && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
      </form>
    </Container>
  )
}

export default Login
