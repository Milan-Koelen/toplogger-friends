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
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { URL } from "../config";
import { followUser } from "../features/followingSlice";
import convertGrade from "../features/gradeConversion";
import Background from "../components/Background";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "750px",
    height: "100%",
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, "auto", 2),
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
  paper: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    backgroundColor: "rgba(255,255,255,.85)",
  },
}));

const SearchUser = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

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

  const handleFollow = (id) => {
    dispatch(followUser(id));

    // const requestOptions = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     authorization: user.token,
    //   },
    //   body: JSON.stringify({ follow: e.currentTarget.value }),
    // };
    // fetch(URL + "/follow", requestOptions)
    //   .then(response => response.json())
    //   .then(console.log);
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
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            onKeyPress={(ev) => {
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
                secondary={"Grade: " + convertGrade(i.Grade)[0]}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="follow"
                  onClick={() => handleFollow(i._id)}
                >
                  <AddIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
      <Background></Background>
    </Container>
  );
};
export default SearchUser;
