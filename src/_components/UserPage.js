import React, { useEffect, useState } from "react";
import { URL } from "../config";
import { useParams } from "react-router-dom";

// const TL_ID = 14345;

export default function UserPage() {
  // const [Loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  // const [TL_ID, setTL_ID] = useState(14345);
  const { TL_ID } = useParams();

  const FetchUser = () => {
    console.log(TL_ID);
    fetch(URL + `/user/${TL_ID}`).then(setData);
  };
  console.log(data.selectedUser);

  useEffect(() => {
    FetchUser();
  }, []);
  return (
    <div>
      <div>
        <h1>USER_ID: {data.Name}</h1>
        <p>DATA:</p>
        <h2 className="title">All time best</h2>
        {/* <table className="leaderboard">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Gym</th>
              <th>grade</th>
            </tr>
          </tbody>
        </table> */}
      </div>
    </div>
  );
}
