import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL } from "../config";
import convertGrade from "../features/gradeConversion";
import "./UserPage.css";

export default function UserPage() {
  // const [Loading, setLoading] = useState(false);
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
  return (
    <div>
      <div>
        <img
          className="profilePicture"
          src={data.ProfilePictureURL}
          alt=""
        ></img>
        <h1 className="user__name">{data.Name}</h1>

        <p>{convertGrade(data.Grade)}</p>

        {/* total accends not working on load */}
        {/* <p>Total Accends: {Array.from(data.Accends).length}</p> */}
        <h2 className="title">All time best</h2>
        <table className="bestBoulders">
          <thead>
            <tr>
              <th>Name</th>
              <th>Gym</th>
              <th>grade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
