import Dashboard from "@mui/icons-material/Dashboard";
import LeaderboardIcon from "@mui/icons-material/Equalizer";
import Search from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { logout, selectUser } from "../features/userSlice";
import Background from "./Background";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    bottom: 0,
    width: "100vw",
    height: "100vh",
    position: "fixed",
  },
  stickToBottom: {
    width: "100%",
    position: "fixed",
    flexGrow: 0,
    bottom: 0,
  },
  title: {
    flexGrow: 1,
  },
  pageContainer: {
    overflowY: "auto",
    overflowX: "hidden",
    height: "100%",
    paddingTop: 75,
    paddingRight: 0,
    paddingBottom: 60,
    maxWidth: "100%",
  },
  profileSection: {
    position: "absolute",
    right: 0,
    display: "flex",
    alignItems: "center",
  },
  userName: {
    textTransform: "capitalize",
    fontSize: "1.1rem",
    marginLeft: "1rem",
    marginRight: "1rem",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));

export default function MenuAppBar({ children }) {
  const classes = useStyles();
  const history = useHistory();
  const user = useSelector(selectUser);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  // const user = useSelector(selectUser);

  const handleLogout = e => {
    e.preventDefault();
    dispatch(logout(e));
    handleClose();
  };

  const routChangeProfile = route => {
    let path = `/profile`;
    history.push(path);
    handleClose();
  };

  const location = useLocation();

  const tabRoutes = ["/", "/leaderboard", "/search"];

  let tabValue = 0;

  tabRoutes.forEach((route, idx) => {
    if (location.pathname.includes(route)) {
      tabValue = idx;
    }
  });

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={"asdf"}>
        <Toolbar>
          <Typography variant="h6" align="center" className={classes.title}>
            Toplogger Friends
          </Typography>
          {user.token && (
            <div className={classes.profileSection}>
              <Button
                data-cy="profileMenu"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar src={user.profilePicture}></Avatar>
                <span className={classes.userName}>{user.name}</span>
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={routChangeProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogout} data-cy="logoutButton">
                  Logout
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>

      <div className={classes.pageContainer}>{children}</div>

      {user.token && (
        <BottomNavigation
          value={tabValue}
          onChange={(_e, tabIdx) => {
            history.push(tabRoutes[tabIdx]);
          }}
          showLabels
          className={classes.stickToBottom}
        >
          <BottomNavigationAction label="Dashboard" icon={<Dashboard />} />
          <BottomNavigationAction
            label="Leaderboard"
            icon={<LeaderboardIcon />}
          />
          <BottomNavigationAction label="Search" icon={<Search />} />
        </BottomNavigation>
      )}
      <Background></Background>
    </div>
  );
}
