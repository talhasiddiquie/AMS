import MiniDrawer from "./Components/MiniDrawer";
import Login from "../src/Components/Login/Login";
import Checkin from "./Components/CheckIn/Checkin";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Employee from "./Components/Pages/Attendance";
import CssBaseline from "@material-ui/core/CssBaseline";
import Addssid from "./Components/Pages/Addssid";
import { SnackbarProvider } from "notistack";
import NoAuthorize from "./Components/NoAuthorize/NoAuthorize";
import PrivateRoute from "./routes/PrivateRoute";
function App() {
  return (
    <Router>
      <SnackbarProvider maxSnack={3}>
        <CssBaseline />
        <Switch>
          <Route exact path="/" component={Checkin} />
          <Route exact path="/adminlogin" component={Login} />

          <Route exact path="/noauthorize" component={NoAuthorize} />
          <Route
            exact
            path="/attendance"
            component={() => (
              <PrivateRoute>
                <MiniDrawer>
                  <Employee />
                </MiniDrawer>
              </PrivateRoute>
            )}
          />

          <Route
            exact
            path="/addssid"
            component={() => (
              <MiniDrawer>
                <Addssid />
              </MiniDrawer>
            )}
          />
        </Switch>
      </SnackbarProvider>
    </Router>
  );
}

export default App;
