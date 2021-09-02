import {
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFollowing, selectFollowing } from "../features/followingSlice";
import convertGrade from "../features/gradeConversion";
import { selectUser } from "../features/userSlice";

const TopBoulders = () => {
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
      width: "100%",
      position: "fixed",
      bottom: 0,
    },
    list: {
      width: "80vw",
      flexDirection: "column",
      display: "flex",
      flexGrow: 1,
      marginLeft: "15vw",
    },
    paper: {
      marginTop: "20vh",
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

  const classes = useStyles();
  return (
    <div>
      <Paper className={classes.paper}>
        <Typography variant="h5" className={classes.title}>
          All Time Best Boulders
        </Typography>

        <List
          className={classes.list}
          style={{ flexGrow: 1, overflow: "auto" }}
        >
          {data.map((i, idx) => (
            <ListItem to={"/user/" + i.TL_ID}>
              <ListItemText
                primary={i.Name}
                secondary={"Grade: " + convertGrade(i.Grade)}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
};
export default TopBoulders;