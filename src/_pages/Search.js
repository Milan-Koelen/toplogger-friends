import React, { useState } from "react";
import { URL } from "../config";
<<<<<<< Updated upstream
// import { useDispatch, useSelector } from "react-redux";
import "./Search.css";
// import no_img from "../img/no_img.gif";
import { Link } from "react-router-dom";
import { Avatar, Button, TextField } from "@material-ui/core";
=======
// import useSelector from "react-redux";
import { selectUser } from "../features/userSlice";

import { useSelector } from "react-redux";

// import no_img from "../img/no_img.gif";
import { Link } from "react-router-dom";
import {
  Avatar,
  TextField,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  IconButton,
  makeStyles,
  ListItemSecondaryAction,
  Container,
  Paper,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/PersonAdd";
import { SearchIcon } from "@material-ui/icons/Search";
>>>>>>> Stashed changes

const SearchUser = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const user = useSelector(selectUser);

  const handleFollow = e =>
    (async () => {
      const rawResponse = await fetch(URL + "/follow", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: user.token, follow: e }),
      });
      console.log(rawResponse);
      const content = await rawResponse.json();

      console.log(content);
      History.pushState("/");
    })();

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

<<<<<<< Updated upstream
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
        <br></br>
        <TextField
          id="searchField"
          // label="Helper text"
          onChange={e => setSearch(e.target.value)}
          placeholder="Search"
        />
        <br></br>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleSearch()}
        >
          Search
        </Button>
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
=======
  // const handleKeypress = e => {
  //   //it triggers by pressing the enter key
  //   if (e.keyCode === 13) {
  //     handleSearch();
  //     console.log("enter pressed");
  //   }
  // };
  const classes = useStyles();
  return (
    <Container style={{ paddingTop: "50px" }}>
      <Grid item xs={12} md={6} lg={6}>
        <Typography variant="h6" className={classes.title}>
          {" "}
          Search user
        </Typography>
        <Paper
          style={{
            maxHeight: "78vh",
            overflow: "auto",
          }}
        >
          <TextField
            className={classes.searchBar}
            id="searchField"
            onChange={e => setSearch(e.target.value)}
            placeholder="Search"
          />
          <Button
            className={classes.searchButton}
            variant="contained"
            color="primary"
            onClick={() => handleSearch()}
          >
            Search
          </Button>

          <List>
            {data.map((i, idx) => (
              <ListItem component={Link} to={"/user/" + i.TL_ID}>
                <ListItemAvatar>
                  <Avatar
                    className="profilepicture"
                    src={i.ProfilePictureURL}
                    onError={e => {
                      e.target.onerror = null;
                      e.target.src = "image_path_here";
                    }}
                    alt={"no_img"}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={i.Name}
                  secondary={"Grade: " + i.Grade}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="follow"
                    value={i._id}
                    onClick={e => handleFollow(e.currentTarget.value)}
                  >
                    <AddIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
    </Container>
>>>>>>> Stashed changes
  );
};
export default SearchUser;
