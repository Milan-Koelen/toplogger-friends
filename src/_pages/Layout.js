import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
// import Switch from "@material-ui/core/Switch";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/userSlice";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";

export default function MenuAppBar({ children }) {
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      width: "100%",
      position: "fixed",
      bottom: 0,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);

  const [anchorEl, setAnchorEl] = React.useState(null);
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
  const history = useHistory();

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

  // const useStyles = makeStyles({
  //   root: {
  //     width: "100%",
  //     position: "fixed",
  //     bottom: 0,
  //   },
  // });

  // const classes = useStyles();
  const [value, setValue] = React.useState(0);

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
      <AppBar position="fixed">
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
                <MenuItem onClick={routeChangeDashboard}>Dashboard</MenuItem>
                <MenuItem onClick={routeChangeSearch}>Search</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {children}
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction
          label="Leaderboard"
          icon={<FavoriteIcon />}
          component={Link}
          to="/leaderboard"
        />
        <BottomNavigationAction label="Recent Tops" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Best Tops" icon={<LocationOnIcon />} />
      </BottomNavigation>
    </div>
  );
}
