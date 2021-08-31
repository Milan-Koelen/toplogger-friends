import React, { useEffect, useState } from "react";
import { URL } from "../config";
import { useParams } from "react-router-dom";
import "./UserPage.css";

export default function UserPage() {
  // const [Loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { TL_ID } = useParams();

  const FetchUser = async () => {
    const response = await fetch(URL + `/user/${TL_ID}`);
    const jsonData = await response.json();
    setData(jsonData);
    console.log(TL_ID);
    console.log(jsonData);

    // await fetch(URL + `/user/${TL_ID}`).then(setData);
  };

  // const getGitHubUserWithFetch = async () => {
  //   const response = await fetch(gitHubUrl);
  //   const jsonData = await response.json();
  //   setUserData(jsonData);
  // };

  useEffect(() => {
    FetchUser();
  }, []);
  return (
    <div>
      <div>
        <img
          className="profilePicture"
          src={data.ProfilePictureURL}
          alt=""
        ></img>
        <h1 className="user__name">{data.Name}</h1>
        <p>{data.Grade}</p>
        <h2 className="title">All time best</h2>
        <table className="bestBoulders">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Gym</th>
              <th>grade</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
