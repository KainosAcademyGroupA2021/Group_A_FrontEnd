import NavBar from "./NavBar";
import Capability from "./Capability/Capability";
import Role from "./Role/Role";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div>
      <Router>
        <Switch >
          <Route exact path="/">
            <NavBar />
          </Route>
          <Route exact path="/capability">
            <NavBar />
            <Capability />
          </Route>
          <Route exact path="/role">
            <NavBar />
            <Role/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;