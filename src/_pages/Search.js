import React, { useState } from "react";
import { URL } from "../config";
// import { useDispatch, useSelector } from "react-redux";
import "./Search.css";
// import no_img from "../img/no_img.gif";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";

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

  const handleKeypress = e => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      handleSearch();
      console.log("enter pressed");
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
          onKeyPress={handleKeypress}
        ></input>
        <button className="search__btn" onClick={() => handleSearch()}>
          Search
        </button>
        <div className="search_results_container">
          {data.map((i, idx) => (
            <div className="search_result">
              <Avatar
                className="profilepicture"
                src={i.ProfilePictureURL}
                onError={e => {
                  e.target.onerror = null;
                  e.target.src = "image_path_here";
                }}
                alt={"no_img"}
              />
              <Link to={"/user/" + i.TL_ID} className="name">
                {i.Name}
              </Link>
              <span className="grade">Grade: {i.Grade} </span>
              <button className="follow_btn"> + </button>
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
