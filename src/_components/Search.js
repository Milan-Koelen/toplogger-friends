import React, { useState } from "react";
import { URL } from "../config";
// import { useDispatch, useSelector } from "react-redux";
import "./Search.css";

const SearchUser = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  // const dispatch = useDispatch();

  const handleSearch = async () => {
    // search function to api

    try {
      const result = await fetch(URL + "/search?name=" + search);

      if (result.status !== 200) {
        console.error(await result.text(), result.status);
        return;
      }

      const data = await result.json();
      setData(data);
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="search">
      <h1>Search</h1>
      <div className="search__form">
        <input
          placeholder="Search"
          value={search}
          onChange={e => setSearch(e.target.value)}
        ></input>
        <button className="search__btn" onClick={() => handleSearch()}>
          Search
        </button>
        <div className="search_results_container">
          {data.map((i, idx) => (
            <div className="search_result">
              <img
                className="profilepicture"
                source={i.ProfilePictureURL}
                alt={i.Name}
              ></img>
              <span className="name">{i.Name} </span>
              <br />
              <span className="grade">Grade: {i.Grade} </span>
              <br />
              <br />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SearchUser;
