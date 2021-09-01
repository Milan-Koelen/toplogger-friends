import {
  Avatar,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/PersonAdd";
import SearchIcon from "@material-ui/icons/Search";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { URL } from "../config";
import convertGrade from "../features/gradeConversion";
import { selectUser } from "../features/userSlice";

const SearchUser = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const user = useSelector(selectUser);

  const useStyles = makeStyles(theme => ({
    root: {
      display: "flex",
      flexDirection: "column",
      maxWidth: "500px",
      height: "100%",
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
    searchContainer: {
      display: "flex",
      flexDirection: "row",
      padding: theme.spacing(4),
    },
    searchBar: {
      flexGrow: 1,
      marginRight: theme.spacing(4),
    },
    searchButton: {},
    paper: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
    },
  }));
  const classes = useStyles();

  const handleSearch = async () => {
    // search function to api

    if (search.length < 2) return;

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

  const handleFollow = e => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: user.token,
      },
      body: JSON.stringify({ follow: e.currentTarget.value }),
    };
    fetch(URL + "/follow", requestOptions)
      .then(response => response.json())
      .then(console.log);
  };
  return (
    <Container className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        Search user
      </Typography>
      <Paper className={classes.paper}>
        <div className={classes.searchContainer}>
          <TextField
            className={classes.searchBar}
            id="searchField"
            onChange={e => setSearch(e.target.value)}
            placeholder="Search"
            onKeyPress={ev => {
              console.log(`Pressed keyCode ${ev.key}`);
              if (ev.key === "Enter") {
                ev.preventDefault();
                handleSearch();
              }
            }}
          />
          <IconButton
            className={classes.searchButton}
            edge="end"
            aria-label="follow"
            onClick={handleSearch}
          >
            <SearchIcon />
          </IconButton>
        </div>

        <List style={{ flexGrow: 1, overflow: "auto" }}>
          {data.map((i, idx) => (
            <ListItem component={Link} to={"/user/" + i.TL_ID}>
              <ListItemAvatar>
                <Avatar
                  className="profilepicture"
                  src={i.ProfilePictureURL}
                  alt={"no_img"}
                />
              </ListItemAvatar>
              <ListItemText
                primary={i.Name}
                secondary={"Grade: " + convertGrade(i.Grade)}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="follow"
                  value={i._id}
                  onClick={handleFollow}
                >
                  <AddIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};
export default SearchUser;
