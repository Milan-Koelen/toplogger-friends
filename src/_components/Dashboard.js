import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/userSlice";
// import { fetchFriends, selectFriends } from "../features/followingSlice";
import { fetchFollowing } from "../features/followingSlice";
import "./Dashboard.css";

import { VictoryBar, VictoryChart } from "victory";

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 },
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
      <div className="chart">
        <VictoryChart>
          <VictoryBar data={data} x="quarter" y="earnings" />
        </VictoryChart>
      </div>
      <h1>
        Welcome <span className="user__name">{user.name}</span>
      </h1>
      <button className="logout__btn" onClick={e => handleLogout(e)}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
