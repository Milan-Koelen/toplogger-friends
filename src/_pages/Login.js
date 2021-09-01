import React, { useState } from "react";
import "./Login.css";

import { Button } from "@material-ui/core";

import { login, signup } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { useHistory } from "react-router";
import { TextField } from "@material-ui/core";

const Login = () => {
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
      <h1>Login</h1>
      <br></br>
      <div className="login__form">
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

        <Button variant="contained" color="primary" onClick={handleSignin}>
          Login
        </Button>
        <br></br>
        <Button variant="contained" color="default" onClick={handleSignup}>
          Register
        </Button>
      </div>
    </div>
  );
};
export default Login;
