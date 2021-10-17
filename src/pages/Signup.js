import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Paper,
  TextField,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectUser, signup } from "../features/userSlice";

const useStyles = makeStyles(theme => ({
  loginContainer: {
    flexGrow: 1,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    verticalAlign: "middle",
  },
  loginPaper: {
    maxWidth: "75vw",
    marginTop: "20vh",
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
  title: {
    textAlign: "center",
    margin: theme.spacing(1),
  },
  textField: {
    margin: theme.spacing(1),
  },
  passwordField: {
    margin: theme.spacing(1),
  },
  loginText: {
    fontSize: ".8em",
    color: "grey",
    textDecoration: "none",
    marginTop: theme.spacing(1),
    "$:hover": {
      cursor: "pointer",
    },
  },
}));

const Signup = () => {
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
      <Grid container justifyContent="center">
        <Paper className={classes.loginPaper}>
          <Container className={classes.loginContainer}>
            <TextField
              id="-basic"
              // variant="outlined"
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={classes.textField}
            />
            <br></br>
            <TextField
              id="outlined-basic"
              // variant="outlined"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={classes.passwordField}
            />
            <br></br>
            <Box className={classes.buttonBox}>
              <br></br>
              <Button
                className={classes.button}
                variant="contained"
                onClick={handleSignup}
              >
                Register
              </Button>
            </Box>
            <Link to="/login" className={classes.loginText}>
              I already have an account.
            </Link>
          </Container>
        </Paper>
      </Grid>
    </div>
  );
};
export default Signup;
