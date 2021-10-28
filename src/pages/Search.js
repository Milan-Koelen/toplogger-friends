import AddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
import {
  Avatar,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Background from "../components/Background";
import { URL } from "../config";
import { followUser } from "../features/followingSlice";
import convertGrade from "../features/gradeConversion";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "750px",
    height: "100%",
  },
  title: {
    margin: theme.spacing(4, "auto", 2),
  },
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    padding: theme.spacing(4),
    fill: "rgba(50,50,50,.5)",
  },
  searchBar: {
    flexGrow: 1,
    marginRight: theme.spacing(4),
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    backdropFilter: "blurr(8)",
    fill: "rgba(50,50,50,.5)",
    marginTop: theme.spacing(5),
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

  const handleFollow = id => {
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
            size="large"
          >
            <SearchIcon />
          </IconButton>
        </div>

        <List
          style={{
            flexGrow: 1,
            overflow: "auto",
            backdropFilter: "blur(8)",
            fill: "rgba(50,50,50,.5)",
          }}
        >
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
                  size="large"
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
