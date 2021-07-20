import NavBar from "./shared/NavBar";
import { Switch, Route, Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import GetJobRoles from "./Role/GetJobRoles";
import GetBandResponsibilities from "./Band/GetBandResponsibilities";
import CapabilityPerJobFamily from "./Capability/CapabilityPerJobFamily";
import GetTrainingBand from "./Band/GetTrainingBand";
import BandCompetencies from "./Band/GetBandCompetencies";
import AddRole from "./Role/AddRole";
import Home from "./Home/Home";
//import GlobalStyle from "./GlobalStyles";
import Footer from "./Footer";
import AddJobFamily from "./Capability/AddJobFamily";
import AddCapability from "./Capability/AddCapability";
import AddBand from "./Band/AddBand";
import AdminRoleView from "./Role/AdminRoleView";
import EditRole from "./Role/EditRole";
import AdminBandView from "./Band/AdminBandView";
import EditBand from "./Band/EditBand";
import { Nav, Navbar } from "react-bootstrap";
import EditCapability from "./Capability/EditCapability";
import GetCapability from "./Capability/GetCapability";
import CapabilityLead from "./Capability/CapabilityLead";
import { createBrowserHistory } from 'history';
import { useAuth0 } from '@auth0/auth0-react';
import ProtectedRoute from "./shared/ProtectedRoute";
import AdminJobFamilyView from "./JobFamily/AdminJobFamilyView";
import EditJobFamily from "./JobFamily/EditJobFamily";

const history = createBrowserHistory();

const App = () => {
  const { isLoading, user } = useAuth0();
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    
    <Router history={history}>
      <NavBar/>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <ProtectedRoute exact path="/Capability/AddCapability" component={AddCapability} />     
        <ProtectedRoute exact path="/Capability/EditCapability/:id" component={EditCapability}/>
        <ProtectedRoute exact path="/Capability/CapabilityPerJobFamily" component={CapabilityPerJobFamily}/>
        <ProtectedRoute exact path="/Capability/GetCapability" component={GetCapability}/>
        <ProtectedRoute exact path="/role/GetJobRoles" component={GetJobRoles} />
        <ProtectedRoute exact path="/band/getTrainingBand" component={GetTrainingBand} />
        <ProtectedRoute exact path="/band/GetBandCompetencies" component={BandCompetencies}/>
        <Route exact path="/role/addRole">
          <AddRole />
        </Route>
        <ProtectedRoute exact path="/role/adminRoleView" component={AdminRoleView} />
        <Route path="/role/editRole/:id">
          <EditRole />
        </Route>
        <ProtectedRoute exact path="/Band/GetBandResponsibilities" component={GetBandResponsibilities}/>
        <ProtectedRoute exact path="/Capability/AddJobFamily" component={AddJobFamily}/>
        <ProtectedRoute exact path="/JobFamily/AdminJobFamilyView" component={AdminJobFamilyView} />
        <Route path="/JobFamily/EditJobFamily/:id">
          <EditJobFamily />
        </Route>
        <Route exact path="/Band/addBand">
          <AddBand />
        </Route>
        <ProtectedRoute exact path="/Band/addBand" component={AddBand}/>
        <Route path="/band/editBand/:id">
          <EditBand />
        </Route>
        <ProtectedRoute exact path="/Band/adminBandView" component={AdminBandView}/>
        <ProtectedRoute exact path="/Capability/CapabilityLead" component={CapabilityLead}></ProtectedRoute>
      </Switch>
      <Footer />
    </Router>
  

  );
}

export default App;
