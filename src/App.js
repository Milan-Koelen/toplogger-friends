import { createTheme, ThemeProvider } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./_pages/Dashboard";
import Layout from "./_pages/Layout";
import Leaderboard from "./_pages/Leaderboard";
import Login from "./_pages/Login";
import PrivateRoute from "./_pages/PrivateRoute";
import Profile from "./_pages/Profile";
import Search from "./_pages/Search";
import UserPage from "./_pages/UserPage";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2F184B",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
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
