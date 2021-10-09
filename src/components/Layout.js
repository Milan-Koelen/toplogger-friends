import { Avatar } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Dashboard } from "@material-ui/icons";
import LeaderboardIcon from "@material-ui/icons/Equalizer";
import Search from "@material-ui/icons/Search";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { logout, selectUser } from "../features/userSlice";
import Background from "./Background";

const useStyles = makeStyles((theme) => ({
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
    [theme.breakpoints.down("sm")]: {
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

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  // const user = useSelector(selectUser);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout(e));
    handleClose();
  };

  const routChangeProfile = (route) => {
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
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>

      <div className={classes.pageContainer}>{children}</div>

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
      <Background></Background>
    </div>
  );
}