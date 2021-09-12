// import no_img from "../img/no_img.gif";
import { makeStyles, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchFriends, selectFriends } from "../features/followingSlice";
import { fetchFollowing } from "../features/followingSlice";
import convertGrade from "../features/gradeConversion";
import { selectUser } from "../features/userSlice";
import Boulders from "./Boulders";
import "./Dashboard.css";
import Leaderboard from "./Leaderboard";

// import { VictoryBar, VictoryChart } from "victory";

const useStyles = makeStyles(theme => ({
  name: {},
  title: { textAlign: "center", margin: theme.spacing(4) },
  profilePicture: { borderRadius: "50%", margin: "auto" },
  paperList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",

    "&>div": {
      width: "80%",
      marginBottom: theme.spacing(4),
    },
  },
}));

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const dataRecentBoulders = [
    { Name: "Los Gigantos", grade: 4.8524 },
    { Name: "Giantito", grade: 5.3324 },
    { Name: "Palidans", grade: 7.42243 },
  ];
  // const dataRecentBoulders = user.Accends;
  const dataTopBoulders = [
    { Name: "BigBoy", grade: 3.22452 },
    { Name: "Goway", grade: 8.34444 },
  ];
  // const dataTopBoulders = user.Accends;

  // const data = useSelector(selectFollowing);

  // console.log(data);
  // console.log(user);

  useEffect(() => {
    dispatch(fetchFollowing());
  }, [dispatch]);

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

      <Typography className={classes.title} variant="h5" component="h5">
        Boulders Logged: {user.TotalTops}
      </Typography>

      <div className={classes.paperList}>
        <Leaderboard />
        <Boulders data={dataRecentBoulders} title="Recent Boulders" />
        <Boulders data={dataTopBoulders} title="Top Boulders" />
      </div>
    </div>
  );
};

export default Dashboard;
