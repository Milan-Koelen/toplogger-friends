import React, { useState } from "react";
import "./Login.css";

import { login } from "../features/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  // const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = e => {
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

  return (
    <div className="login">
      <form className="login__form" onSubmit={e => handleSubmit(e)}>
        <h1>Login</h1>
        {/* <input
          type="name"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        ></input> */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        ></input>
        <button className="submit__btn">Log In</button>
        <button className="register__btn"> Register </button>
      </form>
    </div>
  );
};
export default Login;
