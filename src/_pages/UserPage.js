import { makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL } from "../config";
import convertGrade from "../features/gradeConversion";
import RecentBoulders from "./RecentBoulders";
import TopBoulders from "./TopBoulders";
import "./UserPage.css";

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
      console.log(jsonData);
      // const totalAccends = await Array.from(data.Accends).length;
      console.log(jsonData.Asccends);
    };

    FetchUser();
  }, [TL_ID]);
  const useStyles = makeStyles(theme => ({
    // root: {
    //   width: "90vw",
    //   position: "middle",
    //   bottom: 0,
    // },
    name: {},
    title: { textAlign: "center", margin: theme.spacing(4) },
  }));
  const classes = useStyles();

  return (
    <div>
      <img className="profilePicture" src={data.ProfilePictureURL} alt=""></img>
      <Typography className={classes.title} variant="h3" component="h3">
        <span className="user__name">{data.Name}</span>
      </Typography>
      <Typography className={classes.title} variant="h5" component="h5">
        Grade: {convertGrade(data.Grade)}
      </Typography>
      <Typography className={classes.title} variant="h5" component="h5">
        Boulders Logged: {data.TotalLogged}
      </Typography>

      {/* total accends not working on load */}
      {/* <p>Total Accends: {Array.from(data.Accends).length}</p> */}
      <TopBoulders />
      <RecentBoulders />
    </div>
  );
}
