import NavBar from "./NavBar";
import Capability from "./Capability/Capability";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import GetJobRoles from "./Role/GetJobRoles";
import GetTrainingBand from "./Band/GetTrainingBand";
import Band from "./Band/GetBandCompetencies";
import AddRole from "./Role/AddRole";


const App = () => {
  return (
    <div>
      <Router>
        <Switch>

          <Route exact path="/">
            <NavBar />
          </Route>

          <Route exact path="/capability">
            <NavBar />
            <Capability />
          </Route>

          <Route exact path="/role/GetJobRoles">
            <NavBar />
            <GetJobRoles />
          </Route>

          <Route exact path="/band/getTrainingBand">
            <NavBar />
            <GetTrainingBand />
          </Route>

          <Route exact path="/band/GetBandCompetencies">
            <NavBar />
            <Band />
          </Route>

          <Route exact path="/role/addRole">
            <NavBar />
            <AddRole />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
