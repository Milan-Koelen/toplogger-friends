import "./App.css";
import Login from "./_pages/Login";
import Dashboard from "./_pages/Dashboard";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./_pages/PrivateRoute";
import Search from "./_pages/Search";
import Layout from "./_pages/Layout";
import UserPage from "./_pages/UserPage";
import Leaderboard from "./_pages/Leaderboard";

import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
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
          </Switch>
        </Layout>
      </div>
    </ThemeProvider>
  );
}

export default App;
