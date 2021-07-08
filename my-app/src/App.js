import NavBar from "./NavBar";
import Capability from "./Capability/Capability";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import GetJobRoles from "./Role/GetJobRoles";
import CapabilityPerJobFamily from "./Capability/CapabilityPerJobFamily";

const App = () => {
  return (
    <div>
      <Router>
        <Switch >
          <Route exact path="/">
            <NavBar />
          </Route>
          <Route exact path="/Capability/CapabilityPerJobFamily">
            <NavBar />
            <CapabilityPerJobFamily />
          </Route>
          <Route exact path="/role/GetJobRoles">
          <NavBar />
            <GetJobRoles/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
