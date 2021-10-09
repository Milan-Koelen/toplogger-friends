import { createTheme, ThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import UserPage from "./pages/UserPage";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2F184B",
    },
    background: {
      default: "#cccccc",
      paper: "#e3e3e3",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/login">
              <Login />
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
  );
}

export default App;
