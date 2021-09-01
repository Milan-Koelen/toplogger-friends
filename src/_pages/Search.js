import React, { useState } from "react";
import { URL } from "../config";
// import { useDispatch, useSelector } from "react-redux";
// import "./Search.css";
// import no_img from "../img/no_img.gif";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  makeStyles,
  alpha,
  ListItemSecondaryAction,
  Container,
  Paper,
  InputBase,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/PersonAdd";
import { SearchIcon } from "@material-ui/icons/Search";

const SearchUser = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  // const dispatch = useDispatch();

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      maxWidth: "100%",
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
    searchBar: {
      width: "75vw",
      paddingRight: "2vw",
      paddingLeft: "5vw",
      paddingBottom: "3vh",
      paddingTop: "2vh",
    },
    searchButton: {
      padding: "3%",
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

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
      <Grid item xs={12} md={6}>
        <Typography variant="h6" className={classes.title}>
          {" "}
          Search user
        </Typography>
        <Paper style={{ maxHeight: "73vh", overflow: "auto" }}>
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
                  <IconButton edge="end" aria-label="delete">
                    <AddIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
    </Container>
  );
};
export default SearchUser;
