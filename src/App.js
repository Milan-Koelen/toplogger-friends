import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
// import { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
// import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Signup from "./pages/Signup";
import UserPage from "./pages/UserPage";
// import { getUser } from "./features/userSlice";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#8d3099",
    },
    // background: {
    //   default: "#cccccc",
    //   paper: "#e3e3e3",
    // },
  },
});

function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log("PAGELOAD");
  //   dispatch(getUser());
  // }, [dispatch]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <Layout>
            <Switch>
              <Route path="/landing">
                <Landing />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Signup />
              </Route>
              <PrivateRoute path="/" exact>
                <Dashboard />
              </PrivateRoute>
              <PrivateRoute path="/search">
                <Search />
              </PrivateRoute>
              <PrivateRoute path="/leaderboard">
                <Leaderboard />
              </PrivateRoute>
              <PrivateRoute path="/user/:TL_ID">
                <UserPage />
              </PrivateRoute>
              <PrivateRoute path="/profile">
                <Profile />
              </PrivateRoute>
            </Switch>
          </Layout>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
