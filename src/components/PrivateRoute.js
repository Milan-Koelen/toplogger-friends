import React from "react";

import { Route, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

export default function PrivateRoute({ children, path, exact }) {
  const user = useSelector(selectUser);
  const history = useHistory();

  if (!user || !user.token) {
    history.push("/landing");
    return <></>;
  }

  return (
    <Route path={path} exact={exact}>
      {children}
    </Route>
  );
}
