import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/userSlice";
// import { fetchFriends, selectFriends } from "../features/followingSlice";
import { fetchFollowing } from "../features/followingSlice";
import "./Dashboard.css";

// import { VictoryBar, VictoryChart } from "victory";

const data = [
  {
    Name: "Nick Remijn",
    TL_ID: 27026,
    Grade: 5000,
    ProfilePictureURL:
      "https://lh3.googleusercontent.com/a/AATXAJzvXVrgZMmzRwLWiMzMXk4mbqb2Xp1FRWdPM25N=s50-mo",
  },
  {
    Name: "Willem Kluskens",
    TL_ID: 14345,
    Grade: 3000,
    ProfilePictureURL:
      "https://upload.toplogger.nu/avatars/744008245460804119811370344438458001.png",
  },
  {
    Name: "Stijn van Lierop",
    TL_ID: 130188,
    Grade: 1200,
    ProfilePictureURL:
      "https://lh3.googleusercontent.com/a-/AOh14GgGmqMlVYVbW6iACP4sxWJbVKN30ln21kJI2aHx=s50",
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  // const friends = useSelector(selectFriends);

  const handleLogout = e => {
    e.preventDefault();
    dispatch(logout(e));
  };

  useEffect(() => {
    dispatch(fetchFollowing());
  }, [dispatch, user.token, user.name, user.TL_Grade]);
  return (
    <div className="logout">
      {/* <div className="chart">
        <VictoryChart>
          <VictoryBar data={data} x="quarter" y="earnings" />
        </VictoryChart>
      </div> */}
      <h1 className="welcome_user">
        Welcome <span className="user__name">{user.name}</span>
      </h1>

      <div>
        <h2 className="title">Leaderboard</h2>
        <table className="leaderboard">
          <tr>
            <th>Picture</th>
            <th>name</th>
            <th>grade</th>
          </tr>
          <tbody>
            {data.map((i, idx) => (
              <tr>
                <td>
                  <img
                    className="profilepicture_lb"
                    src={i.ProfilePictureURL}
                    alt={i.Name}
                  ></img>
                </td>
                <td>
                  <a href={URL + "/user?TL_ID=" + i.TL_ID} className="name">
                    {i.Name}{" "}
                  </a>
                </td>
                <td>
                  <span className="grade">{i.Grade} </span>
                </td>
                <br />
                <br />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="logout__btn" onClick={e => handleLogout(e)}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
