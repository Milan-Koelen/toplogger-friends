import {
  Avatar,
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableCell,
  TableContainer,
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
  const sortableData = data.map(x => x);

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
    table: {
      width: "100%",
      // display: "flex,",
      // flexDirection: "column",
      // flexGrow: 1,
      marginLeft: "1vw",
      marginRight: "auto",
    },
    paper: {
      marginTop: "10vh",
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      width: "85vw",
      marginLeft: "6vw",
      marginRight: "5vw",
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
    // this.forceUpdate();
    // console.log(requestOptions);
    fetch(URL + "/unfollow", requestOptions)
      .then(response => response.json())
      .then(console.log("user deleted"));
  };

  const classes = useStyles();
  return (
    // <div className={classes.root}>
    <Paper className={classes.paper}>
      <Typography variant="h5" className={classes.title}>
        Leaderboard
      </Typography>
      <Table className={classes.table}>
        <TableContainer>
          {sortableData
            .sort((a, b) => (a.Grade > b.Grade ? -1 : 1))
            .map((i, idx) => (
              <TableRow>
                <TableCell key={i.idx}>{Number.parseInt(idx) + 1}</TableCell>
                <TableCell key={i.ProfilePictureURL}>
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
              </TableRow>
            ))}
        </TableContainer>
      </Table>
    </Paper>
    // {/* </div> */}
  );
};
export default Leaderboard;
