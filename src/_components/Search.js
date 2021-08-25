import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import Search from "./Search";

const SearchUser = () => {
  const [username, setUsername] = useState("");

  // const dispatch = useDispatch();

  const handleSearch = e => {
    e.preventDefault();

    // search function to api

    const search = username => {
      return async dispatch => {
        try {
          const result = await fetch(URL + "/search", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: { username: username }, // body data type must match "Content-Type" header
          });

          if (result.status !== 200) {
            console.error(await result.text(), result.status);
            return;
          }

          const data = await result.json();
          console.log(data);
        } catch (e) {
          console.error(e);
        }
      };
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
          <button className="search__btn" onClick={handleSearch(username)}>
            Register
          </button>
        </div>
      </div>
    );
  };
};
export default SearchUser;
