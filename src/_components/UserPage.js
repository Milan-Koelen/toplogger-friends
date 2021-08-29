import React, { useEffect, useState } from "react";
import { URL } from "../config";
import { useParams } from "react-router-dom";

// const TL_ID = 14345;

export default function UserPage() {
  // const [Loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  // const [TL_ID, setTL_ID] = useState(14345);
  const { TL_ID } = useParams();
  console.log(TL_ID);
  // ID = 14345;

  const FetchUser = () => {
    console.log(TL_ID);
    fetch(URL + `/user/${TL_ID}`).then(setData);
  };

  // .then(response => {
  //   if (response.ok) {
  //     console.log(response);
  //     return response.json();
  //   }
  //   throw response;
  // })
  // .then(data => {
  //   setData(data);
  // })
  // .catch(error => {
  //   console.error("error fetching data: ", error);
  // })
  // .finally(() => {
  //   // setLoading(false);
  // });
  // };
  useEffect(() => {
    FetchUser();
  }, []);
  return (
    <div>
      <div>
        <h1>USER_ID: {data.TL_ID}</h1>
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
