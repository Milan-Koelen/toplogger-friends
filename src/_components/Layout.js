import React from "react";
import { HOME_URL } from "../config";
import "./Layout.css";
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div>
      <div className="header">
        <a href={HOME_URL}>
          <h3> TopLogger Friends</h3>
          <Link to="/search"> Search</Link>
        </a>
      </div>
      {children}
    </div>
  );
}
