import NavBar from "./shared/NavBar";
import { Switch, Route, Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import GetJobRoles from "./Role/GetJobRoles";
import GetBandResponsibilities from "./Band/GetBandResponsibilities";
import CapabilityPerJobFamily from "./Capability/CapabilityPerJobFamily";
import GetTrainingBand from "./Band/GetTrainingBand";
import Band from "./Band/GetBandCompetencies";
import AddRole from "./Role/AddRole";
import AddJobFamily from "./Capability/AddJobFamily";
import AddCapability from "./Capability/AddCapability";
import AddBand from "./Band/AddBand";
import AdminRoleView from "./Role/AdminRoleView";
import EditRole from "./Role/EditRole";
import EditCapability from "./Capability/EditCapability";
import GetCapability from "./Capability/GetCapability";
import CapabilityLead from "./Capability/CapabilityLead";
import { createBrowserHistory } from 'history';
import { useAuth0 } from '@auth0/auth0-react';
import ProtectedRoute from "./shared/ProtectedRoute";

const history = createBrowserHistory();

const App = () => {
  const { isLoading } = useAuth0();
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <Router history={history}>
      <NavBar />
        <Switch>
          <Route exact path="/">
          </Route>
          <Route exact path="/Capability/CapabilityPerJobFamily">
            <CapabilityPerJobFamily />
          </Route>
          <Route exact path="/Capability/AddCapability">
            <AddCapability />
          </Route>
          <Route exact path="/Capability/GetCapability" component={GetCapability}>
           
          </Route>
          <Route exact path="/Capability/EditCapability/:id">
      
            <EditCapability />
          </Route>

          <ProtectedRoute exact path="/role/GetJobRoles" component={GetJobRoles} >
          </ProtectedRoute>

          <ProtectedRoute exact path="/band/getTrainingBand" component={GetTrainingBand}>
          </ProtectedRoute>

          <Route exact path="/band/GetBandCompetencies" component={Band}>
      
          </Route>

          <Route exact path="/role/addRole">
          
            <AddRole />
          </Route>


          <Route exact path="/role/adminRoleView">
          
            <AdminRoleView />
          </Route>

          <Route path="/role/editRole/:id">
      
            <EditRole />
          </Route>

          <Route exact path="/Band/GetBandResponsibilities">
          
            <GetBandResponsibilities />
          </Route>

          <Route exact path="/Capability/AddJobFamily">
        
            <AddJobFamily />
          </Route>

          <Route exact path="/Band/addBand">
        
            <AddBand />
          </Route>

          <Route exact path="/Capability/CapabilityLead" component={CapabilityLead}>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
