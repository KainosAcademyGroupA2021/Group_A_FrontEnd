import NavBar from "./NavBar";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import GetJobRoles from "./Role/GetJobRoles";
import GetBandResponsibilities from "./Band/GetBandResponsibilities";
import CapabilityPerJobFamily from "./Capability/CapabilityPerJobFamily";
import GetTrainingBand from "./Band/GetTrainingBand";
import Band from "./Band/GetBandCompetencies";
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


const App = () => {
  return (
    <div className = "example">
      <Router>
        <Switch>

          <Route exact path="/Home/Home">
            <NavBar />
            <Home />
          </Route>
          <Route exact path="/Capability/CapabilityPerJobFamily">
            <NavBar />
            <CapabilityPerJobFamily />
          </Route>
          <Route exact path="/Capability/AddCapability">
            <NavBar />
            <AddCapability />
          </Route>
          <Route exact path="/Capability/GetCapability">
            <NavBar />
            <GetCapability />
          </Route>
          <Route exact path="/Capability/EditCapability/:id">
            <NavBar />
            <EditCapability />
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


          <Route exact path="/role/adminRoleView">
            <NavBar />
            <AdminRoleView />
          </Route>

          <Route path="/role/editRole/:id">
            <NavBar />
            <EditRole />
          </Route>
    
          <Route exact path="/Band/GetBandResponsibilities">
            <NavBar />
            <GetBandResponsibilities />
          </Route>

          <Route exact path="/Capability/AddJobFamily">
          <NavBar />
            <AddJobFamily/>
          </Route>

          <Route exact path="/Band/addBand">
            <NavBar />
            <AddBand />
          </Route>

          <Route path="/band/editBand/:id">
            <NavBar />
            <EditBand />
          </Route>

          <Route exact path="/Band/adminBandView">
            <NavBar />
            <AdminBandView />
          </Route>

           <Route exact path="/Capability/CapabilityLead">
           <NavBar />
           <CapabilityLead />
           </Route>
        </Switch>
      </Router>

      <Footer />


      
 

    </div>

  



    
  );
}

export default App;
