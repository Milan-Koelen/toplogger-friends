import React from "react";
import "./Layout.css";
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div>
      <div className="header">
        <Link to="/">
          <h3> TopLogger Friends</h3>
        </Link>

        <Link to="/search"> Search</Link>
      </div>
      {children}
    </div>
  );
}
