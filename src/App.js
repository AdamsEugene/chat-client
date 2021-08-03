import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import User from "./pages/user/User";
import Status from "./pages/status/Status";
import Settings from "./pages/settings/Settings";
import Group from "./pages/group/Group";

function App() {
  return (
    <Router className="App">
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <Home />
          <User />
          <Status />
          <Settings />
          <Group />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
