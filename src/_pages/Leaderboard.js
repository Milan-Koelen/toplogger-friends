import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Link } from "@material-ui/core";
import { selectFollowing, fetchFollowing } from "../features/followingSlice";
import { selectUser } from "../features/userSlice";

const Leaderboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const data = useSelector(selectFollowing);
  console.log(data);

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
  return (
    <div>
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
                  alt={"no_img"}
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
  );
};
export default Leaderboard;
