import {
  Avatar,
  IconButton,
  makeStyles,
  Paper,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
// import { PersonRemoveIcon } from "@material-ui/icons/";
import BackspaceIcon from "@material-ui/icons/Backspace";
import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { URL } from "../config.js";
import { fetchFollowing, selectFollowing } from "../features/followingSlice";
import convertGrade from "../features/gradeConversion.js";
import { selectUser } from "../features/userSlice";
const Leaderboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const data = useSelector(selectFollowing);
  console.log(data);

  useEffect(() => {
    dispatch(fetchFollowing());
  }, [
    dispatch,
    user.token,
    user.name,
    user.TL_Grade,
    user.following,
    user.TL_ID,
  ]);

  const useStyles = makeStyles(theme => ({
    root: {
      position: "fixed",
      bottom: 0,
    },

    table: {
      Width: "100%",
      display: "flex,",
      flexDirection: "column",
      marginBottom: "5vh",
      flexGrow: 1,
      marginLeft: "15vw",
    },
    paper: {
      marginTop: "10vh",
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      width: "80vw",
      marginLeft: "10vw",
    },
    profilepicture: {
      marginRight: "5vw",
    },
    title: {
      display: "flex",
      margin: theme.spacing(4, "auto", 2),
    },
  }));

  const handleUnfollow = e => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: user.token,
      },
      body: JSON.stringify({ unfollow: e.currentTarget.value }),
    };
    console.log(requestOptions);
    fetch(URL + "/unfollow", requestOptions)
      .then(response => response.json())
      .then(console.log);
  };

  const classes = useStyles();
  return (
    <div>
      <Paper className={classes.paper}>
        <Typography variant="h5" className={classes.title}>
          Leaderboard
        </Typography>
        <TableHead className={classes.table}>
          {data.map((i, idx) => (
            <TableRow>
              <>
                <TableCell>
                  <Avatar src={i.ProfilePictureURL}></Avatar>
                </TableCell>
                <TableCell key={i.Name}>{i.Name}</TableCell>
                <TableCell key={i.Grade}>{convertGrade(i.Grade)}</TableCell>
                <TableCell key={i.TL_ID}>
                  <IconButton
                    edge="end"
                    aria-label="follow"
                    value={i._id}
                    onClick={handleUnfollow}
                  >
                    <BackspaceIcon />
                  </IconButton>
                </TableCell>
              </>
            </TableRow>
          ))}
        </TableHead>
        {/* <List
          className={classes.list}
          style={{ flexGrow: 1, overflow: "auto" }}
        >
          {data.map((i, idx) => (
            <ListItem component={Link} to={"/user/" + i.TL_ID}>
              <ListItemAvatar>
                <Avatar
                  src={i.ProfilePictureURL}
                  className={classes.profilepicture}
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
                  onClick={handleUnfollow}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List> */}
      </Paper>
    </div>
  );
};
export default Leaderboard;
