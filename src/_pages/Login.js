import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import Background from "../components/background.js";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { login, selectUser, signup } from "../features/userSlice";

const useStyles = makeStyles(theme => ({
  loginContainer: {
    flexGrow: 1,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    verticalAlign: "middle",
  },
  loginPaper: {
    maxWidth: "75vw",
  },
  button: {
    margin: theme.spacing(1),
    width: theme.spacing(12),
    justifyContent: "center",
  },
  buttonBox: {
    textAlign: "center",
    marginTop: theme.spacing(2),
    marginBottom: "O",
  },
}));

const Login = () => {
  const classes = useStyles();

  // const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const history = useHistory();

  if (user && user.token) {
    history.push("/");
    return <></>;
  }

  const handleSignin = e => {
    e.preventDefault();

    dispatch(
      login({
        // name: name,
        email: email,
        password: password,
        loggedIn: true,
      })
    );

    setEmail("");
    setPassword("");
  };

  const handleSignup = e => {
    e.preventDefault();

    dispatch(
      signup({
        // name: name,
        email: email,
        password: password,
        loggedIn: true,
      })
    );

    setEmail("");
    setPassword("");
  };

  return (
    <div className="login">
      <br></br>
      <Grid container justify="center">
        <Paper className={classes.loginPaper}>
          <Container className={classes.loginContainer}>
            <TextField
              id="-basic"
              // variant="outlined"
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <br></br>
            <TextField
              id="outlined-basic"
              // variant="outlined"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <br></br>
            <Box className={classes.buttonBox}>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={handleSignin}
              >
                Login
              </Button>
              <br></br>
              <Button
                className={classes.button}
                variant="contained"
                color="default"
                onClick={handleSignup}
              >
                Register
              </Button>
            </Box>
          </Container>
        </Paper>
      </Grid>
    </div>
<Background></Background>
  );
};
export default Login;
