import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
// import { fetchFriends, selectFriends } from "../features/followingSlice";
import {
  fetchFollowing,
  // followingSlice,
  selectFollowing,
} from "../features/followingSlice";
import "./Dashboard.css";
import { Link } from "react-router-dom";
// import no_img from "../img/no_img.gif";
import { Avatar } from "@material-ui/core";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { makeStyles } from "@material-ui/core";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
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

      <div className="logout">
        <h2 className="title">Leaderboard</h2>
        <table className="leaderboard">
          <thead>
            <tr>
              <th>Picture</th>
              <th>name</th>
              <th>grade</th>
            </tr>
          </thead>
          <tbody>
            {data.map((i, idx) => (
              <tr>
                <td>
                  <Avatar
                    className="profilepicture"
                    src={i.ProfilePictureURL}
                    onError={e => {
                      e.target.onerror = null;
                      e.target.src = "image_path_here";
                    }}
                    alt={""}
                  />
                </td>
                <td>
                  <Link to={"/user/" + i.TL_ID} className="name">
                    {i.Name}
                  </Link>
                </td>
                <td>
                  <span className="grade">{i.Grade} </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="logout">
        <h2 className="title">Recent Boulders</h2>
        <table className="leaderboard">
          <thead>
            <tr>
              <th>Picture</th>
              <th>name</th>
              <th>grade</th>
            </tr>
          </thead>
          <tbody>
            {data.map((i, idx) => (
              <tr>
                <td>
                  <Link to={"/user/" + i.TL_ID} className="name">
                    {i.Name}
                  </Link>
                </td>
                <td>
                  <span className="grade">{i.Grade} </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="logout">
        <h2 className="title">All time best Boulders</h2>
        <table className="leaderboard">
          <thead>
            <tr>
              <th>Picture</th>
              <th>name</th>
              <th>grade</th>
            </tr>
          </thead>
          <tbody>
            {data.map((i, idx) => (
              <tr>
                <td>
                  <Link to={"/user/" + i.TL_ID} className="name">
                    {i.Name}
                  </Link>
                </td>
                <td>
                  <span className="grade">{i.Grade} </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
