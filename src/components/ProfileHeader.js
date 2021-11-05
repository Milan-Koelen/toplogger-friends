import { Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFollowing } from "../features/followingSlice";
import convertGrade from "../features/gradeConversion";
import { fetchUser, selectUser } from "../features/userSlice";
import GradeHeader from "./GradeHeader";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "750px",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // height: "500vh",
  },
  userName: { fontWeight: "400", color: theme.palette.primary.main },
  title: {
    textAlign: "center",
    margin: theme.spacing(2),
    marginTop: theme.spacing(10),
  },
  tops: {
    textAlign: "center",
    margin: theme.spacing(2),
    fontWeight: 500,
    fontSize: "1.7rem",
  },
  profilePicture: { borderRadius: "50%", margin: "auto" },
  gradeHeader: {
    backdropFilter: "blur(8px)",
  },
  bar: {
    width: "90%",
    height: 40,
    border: "1px solid " + theme.palette.primary.main,
    borderRadius: 10,
    overflow: "hidden",
  },
  barElement: {
    // borderRadius: 10,
    height: "100%",
    backgroundColor: theme.palette.primary.main,
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

  useEffect(() => {
    dispatch(fetchFollowing());
    dispatch(fetchUser());
  }, [dispatch]);

  const classes = useStyles();
  // console.log(user.name);
  // console.log(user);
  // console.log(user.TotalTops);
  // console.log("+++++=====+++++=====");

  const grade = convertGrade((user.Profile && user.Profile.Grade) || 0);
  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h3" component="h3">
        Welcome
      </Typography>
      <Typography className={classes.title} variant="h3" component="h3">
        <span className={classes.userName}>{user.name}</span>
      </Typography>
      <GradeHeader
        className={classes.gradeHeader}
        grade={grade[0]}
        percentage={grade[1]}
      />
      <Typography className={classes.tops} variant="h5" component="h5">
        {user.Profile && user.Profile.TotalTops} Accends
      </Typography>
      <Typography className={classes.tops} variant="h5" component="h5">
        {/* {allBoulders[0]?.date_logged} Last log */}
      </Typography>
    </div>
  );
};

export default Dashboard;
