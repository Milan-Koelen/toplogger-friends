import AppBar from "@material-ui/core/AppBar";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
// import Switch from "@material-ui/core/Switch";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Dashboard } from "@material-ui/icons";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LeaderboardIcon from "@material-ui/icons/Equalizer";
import MenuIcon from "@material-ui/icons/Menu";
import Search from "@material-ui/icons/Search";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { logout } from "../features/userSlice";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    // bottom: 1,
    // width: "100vw",
    height: "100vh",
    position: "fixed",
  },
  stickToBottom: {
    width: "100%",
    position: "fixed",
    flexGrow: 0,
    bottom: 0,
  },
  // menuButton: {
  //   marginRight: theme.spacing(2),
  // },
  title: {
    flexGrow: 1,
  },
  pageContainer: {
    overflowY: "auto",
    height: "100%",
    paddingTop: 75,
    paddingLeft: theme.spacing(1),
    paddingRight: 0,
    paddingBottom: 60,
    // width: "100vw",
  },
}));

export default function MenuAppBar({ children }) {
  const classes = useStyles();
  const [auth] = useState(true);
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // const handleChange = event => {
  //   setAuth(event.target.checked);
  // };

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

  const routeChangeDashboard = route => {
    let path = `/`;
    history.push(path);
    handleClose();
  };
  const routeChangeSearch = route => {
    let path = `/search`;
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
      {/* <FormGroup>
        <FormControlLabel
        // control={
        //   <Switch
        //     checked={auth}
        //     onChange={handleChange}
        //     aria-label="login switch"
        //   />
        // }
        // label={auth ? "Logout" : "Login"}
        />
      </FormGroup> */}
      <AppBar position="fixed" className={"asdf"}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            // onClick={handleNav}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" align="center" className={classes.title}>
            Toplogger Friends
          </Typography>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
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
                <MenuItem onClick={routeChangeDashboard}>Profile</MenuItem>
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
    </div>
  );
}
