import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React, { useState } from "react";
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
}));

const Landing = () => {
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
      <Grid container justifyContent="center">
        <Paper className={classes.loginPaper}>
          <Container className={classes.loginContainer}>
            <Typography variant="h6">
              Hello and welcome to Toplogger Friends.
            </Typography>
            <Box className={classes.buttonBox}>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={() => history.push("/login")}
              >
                Log In
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={() => history.push("/register")}
              >
                I'm new
              </Button>
              <br></br>
            </Box>
          </Container>
        </Paper>
      </Grid>
    </div>
  );
};
export default Landing;
