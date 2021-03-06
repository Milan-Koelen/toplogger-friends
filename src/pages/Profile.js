import {
  Avatar,
  Button,
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
import makeStyles from '@mui/styles/makeStyles';
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { URL } from "../config";
import convertGrade from "../features/gradeConversion";
import { selectUser } from "../features/userSlice";
import Background from "../components/Background";

const SearchUser = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const user = useSelector(selectUser);

  const useStyles = makeStyles((theme) => ({
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
    searchButton: {},
    paper: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
    },
    info: {
      margin: theme.spacing(5),
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

  const handleClaim = (e) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: user.token,
      },
      body: JSON.stringify({ TL_ID: e.currentTarget.value }),
    };
    fetch(URL + "/claim", requestOptions)
      .then((response) => response.json())
      .then(console.log);
  };
  return (
    <Container className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        Connect to toplogger account
      </Typography>
      <Typography variant="p" className={classes.info}>
        Connect to your toplogger account by searching for your username. Once
        an account is connected you can always come back and connect another
        account. Only one account can be connected at the same time.
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
            size="large">
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
                <Button
                  variant="contained"
                  edge="end"
                  aria-label="follow"
                  value={i._id}
                  onClick={handleClaim}
                >
                  Connect
                </Button>
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
