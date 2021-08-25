import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/userSlice";
// import { fetchFriends, selectFriends } from "../features/followingSlice";
import { fetchFollowing } from "../features/followingSlice";
import "./Logout.css";

const Logout = () => {
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
      <h1>
        Welcome <span className="user__name">{user.name}</span>
      </h1>
      <button className="logout__btn" onClick={e => handleLogout(e)}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
