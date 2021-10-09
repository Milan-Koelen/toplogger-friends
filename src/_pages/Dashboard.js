// import no_img from "../img/no_img.gif";
import { makeStyles, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchFriends, selectFriends } from "../features/followingSlice";
import { fetchFollowing } from "../features/followingSlice";
import convertGrade from "../features/gradeConversion";
import { selectUser } from "../features/userSlice";
import Boulders from "./Boulders";
import Leaderboard from "./Leaderboard";

// import { VictoryBar, VictoryChart } from "victory";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "750px",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  userName: { color: "Purple", fontWeight: "400" },
  title: {
    textAlign: "center",
    margin: theme.spacing(2),
    marginTop: theme.spacing(10),
  },
  grade: {
    textAlign: "center",
    margin: theme.spacing(2),
    fontWeight: 500,
    fontSize: "3rem",
  },
  profilePicture: { borderRadius: "50%", margin: "auto" },
  paperList: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",

    "&>div": {
      width: "90%",
      marginBottom: theme.spacing(4),
    },
  },
  bar: {
    width: "90%",
    height: 40,
    backgroundColor: theme.palette.grey[10],
    border: "1px solid " + theme.palette.primary.main,
    borderRadius: 10,
    overflow: "hidden",
  },
  barElement: {
    // borderRadius: 10,
    height: "100%",
    backgroundColor: theme.palette.primary.main,
    borderRight: "2px solid " + theme.palette.primary.dark,
  },
  barScale: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    ...theme.typography.h5,
  },
  barLabelContainer: {
    width: "90%",
    height: 0,
    position: "relative",
  },
  barLabel: {
    position: "absolute",
    transform: "translate(-50%, -25px)",
  },
}));

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const dataRecentBoulders = [
    { Name: "Los Gigantos", grade: 4.85 },
    { Name: "Giantito", grade: 5.33 },
    { Name: "Palidans", grade: 7 },
  ];
  // const dataRecentBoulders = user.Accends;
  const dataTopBoulders = [
    { Name: "BigBoy", grade: 3.22452 },
    { Name: "Goway", grade: 8.34444 },
  ];

  // const data = useSelector(selectFollowing);

  // console.log(data);
  // console.log(user);

  useEffect(() => {
    dispatch(fetchFollowing());
  }, [dispatch]);

  const classes = useStyles();
  // console.log(user.name);
  // console.log(user);
  // console.log(user.TotalTops);
  // console.log("+++++=====+++++=====");

  const grade = convertGrade(user.TL_Grade);

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
        <span className={classes.userName}>{user.name}</span>
      </Typography>

      <Typography className={classes.grade} variant="h5" component="h5">
        {grade[0]}
      </Typography>

      <div className={classes.barScale}>
        <span>{grade[0]}</span>
        <span>{grade[2]}</span>
      </div>
      <div className={classes.barLabelContainer}>
        <div className={classes.barLabel} style={{ left: grade[1] + "%" }}>
          {grade[1] >= 10 && grade[1] <= 90 && grade[1]}%
        </div>
      </div>
      <div className={classes.bar}>
        <div
          className={classes.barElement}
          style={{
            width: grade[1] + "%",
          }}
        />
      </div>
      {/* 
      <Typography className={classes.title} variant="h5" component="h5">
        Boulders Logged: {user.TotalTops}
      </Typography> */}

      <div className={classes.paperList}>
        <Leaderboard />
        <Boulders data={dataRecentBoulders} title="Recent Boulders" />
        <Boulders data={dataTopBoulders} title="Top Boulders" />
      </div>
    </div>
  );
};

export default Dashboard;
