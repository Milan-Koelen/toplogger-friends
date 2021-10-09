import { makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL } from "../config";
import convertGrade from "../features/gradeConversion";
import Boulders from "./Boulders";

export default function UserPage() {
  const [data, setData] = useState({});
  const params = useParams();
  const TL_ID = params.TL_ID;

  useEffect(() => {
    const FetchUser = async () => {
      const response = await fetch(URL + `/user/${TL_ID}`);
      const jsonData = await response.json();
      setData(jsonData);
      console.log(TL_ID);
      // const totalAccends = await Array.from(data.Accends).length;
      console.log(jsonData.Asccends);
    };

    FetchUser();
  }, [TL_ID]);
  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: "750px",
      margin: "auto",
    },
    name: { color: "purple" },
    title: { textAlign: "center", margin: theme.spacing(4) },
    paperList: {
      marginTop: theme.spacing(4),
      display: "flex",
      opacity: "85%",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",

      "&>div": {
        width: "90%",
        marginBottom: theme.spacing(4),
      },
    },
    profilePicture: {
      borderRadius: "50%",
      alignSelf: "center",
      marginLeft: "auto",
      marginRight: "auto",
      display: "block",

      marginTop: "75px",
      marginBottom: "25px",
      width: "45%",
      maxWidth: "30vh",
    },
  }));
  const classes = useStyles();

  const dataRecentBoulders = [
    { Name: "Giantito", grade: 5.3324 },
    { Name: "Palidans", grade: 7.42243 },
  ];
  // const dataRecentBoulders = user.Accends;
  const dataTopBoulders = [
    { Name: "BigBoy", grade: 3.22452 },
    { Name: "Goway", grade: 8.34444 },
  ];

  return (
    <div>
      {/* <Avatar
        className={classes.profilePicture}
        src={data.ProfilePictureURL}
        alt={"no_img"}
      /> */}
      <img
        className={classes.profilePicture}
        src={data.ProfilePictureURL}
        alt=""
      ></img>
      <Typography className={classes.title} variant="h3" component="h3">
        <span className={classes.name}>{data.Name}</span>
      </Typography>
      <Typography className={classes.title} variant="h5" component="h5">
        Grade: <strong>{convertGrade(data.Grade)}</strong>
      </Typography>
      {/* <Typography className={classes.title} variant="h5" component="h5">
        Boulders Logged: {data.TotalLogged}
      </Typography>
      <Typography className={classes.title} variant="h5" component="h5">
        Best Boulder:
      </Typography> */}
      {/* total accends not working on load */}
      <div className={classes.paperList}>
        <Boulders data={dataRecentBoulders} title="Recent Boulders" />
        <Boulders data={dataTopBoulders} title="Top Boulders" />
      </div>
    </div>
  );
}
