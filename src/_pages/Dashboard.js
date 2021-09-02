// import no_img from "../img/no_img.gif";
import { makeStyles } from "@material-ui/core";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import RestoreIcon from "@material-ui/icons/Restore";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { fetchFriends, selectFriends } from "../features/followingSlice";
import {
  fetchFollowing,
  // followingSlice,
  selectFollowing,
} from "../features/followingSlice";
import { selectUser } from "../features/userSlice";
import "./Dashboard.css";
import Leaderboard from "./Leaderboard";
import RecentBoulders from "./RecentBoulders";
import TopBoulders from "./TopBoulders";
// import Leaderboard from "./Leaderboard";
// import { VictoryBar, VictoryChart } from "victory";

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const data = useSelector(selectFollowing);

  console.log(data);
  console.log(user);

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

  const useStyles = makeStyles({
    root: {
      width: "100%",
      position: "fixed",
      bottom: 0,
    },
    name: {},
  });

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <div>
      {/* <div className="chart">
        <VictoryChart>
          <VictoryBar data={data} x="quarter" y="earnings" />
        </VictoryChart>
      </div> */}
      <h1 className="welcome_user">
        Welcome <span className="user__name">{user.name}</span>
      </h1>
      <div>
        <Leaderboard />
      </div>
      <div>
        <RecentBoulders />
      </div>
      <div>
        <TopBoulders />
      </div>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          label="Leaderboard"
          icon={<FavoriteIcon />}
          component={Link}
          to="/leaderboard"
        />
        <BottomNavigationAction label="Recent Tops" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Best Tops" icon={<LocationOnIcon />} />
      </BottomNavigation>
    </div>
  );
};

export default Dashboard;
