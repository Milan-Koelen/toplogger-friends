import React from "react";
import { HOME_URL } from "../config";
import "./Layout.css";

export default function Layout({ children }) {
  return (
    <div>
      <div className="header">
        <a href={HOME_URL}>
          <h3> TopLogger Friends</h3>
        </a>
      </div>
      {children}
    </div>
  );
}
