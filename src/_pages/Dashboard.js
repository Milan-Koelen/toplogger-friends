// import no_img from "../img/no_img.gif";
import { makeStyles, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchFriends, selectFriends } from "../features/followingSlice";
import { fetchFollowing } from "../features/followingSlice";
import convertGrade from "../features/gradeConversion";
import { selectUser } from "../features/userSlice";
import "./Dashboard.css";
import Leaderboard from "./Leaderboard";
import RecentBoulders from "./RecentBoulders";
import TopBoulders from "./TopBoulders";

// import { VictoryBar, VictoryChart } from "victory";

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  // const data = useSelector(selectFollowing);

  // console.log(data);
  // console.log(user);

  useEffect(() => {
    dispatch(fetchFollowing());
  }, [
    dispatch,
    user.token,
    user.name,
    user.TL_Grade,
    user.following,
    user.TL_ID,
    user.TotalTops,
  ]);

  const useStyles = makeStyles(theme => ({
    name: {},
    title: { textAlign: "center", margin: theme.spacing(4) },
  }));

  const classes = useStyles();
  console.log(user.name);
  console.log(user);
  console.log("+++++=====+++++=====");

  return (
    <div className={classes.root}>
      {/* <div className="chart">
        <VictoryChart>
          <VictoryBar data={data} x="quarter" y="earnings" />
        </VictoryChart>
      </div> */}
      <Typography className={classes.title} variant="h3" component="h3">
        Welcome
      </Typography>
      <Typography className={classes.title} variant="h3" component="h3">
        <span className="user__name">{user.name}</span>
      </Typography>

      <Typography className={classes.title} variant="h5" component="h5">
        Grade: <strong>{convertGrade(user.TL_Grade)}</strong>
      </Typography>

      {/* <Typography className={classes.title} variant="h5" component="h5">
        Boulders Logged: {user.TotalTops}
      </Typography>
      <Typography className={classes.title} variant="h5" component="h5">
        Best Boulder:
      </Typography> */}
      <div>
        <Leaderboard />
      </div>
      <div>
        <RecentBoulders />
      </div>
      <div>
        <TopBoulders />
      </div>
    </div>
  );
};

export default Dashboard;
