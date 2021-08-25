import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Search from "./Search";

const SearchUser = () => {
  // const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const dispatch = useDispatch();

  const handleSearch = e => {
    e.preventDefault();

    dispatch(
      Search({
        username: username,
      })
    );

    setUsername("");
  };

  return (
    <div className="search">
      <h1>Search</h1>
      <div className="search__form">
        <input
          type="username"
          placeholder="Toplogger Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        ></input>
        <button className="search__btn" onClick={handleSearch}>
          Register
        </button>
      </div>
    </div>
  );
};
export default SearchUser;
