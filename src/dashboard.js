import React from "react";

function Dashboard(props) {
  // handle click event of logout button
  const handleLogout = () => {
    props.history.push("/login");
  };

  return (
    <div>
      Welcome User here we will display your dashboard!
      <br />
      <br />
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  );
}

export default Dashboard;
