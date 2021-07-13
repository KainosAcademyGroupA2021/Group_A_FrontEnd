import NavBar from "./NavBar";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import GetJobRoles from "./Role/GetJobRoles";
import GetBandResponsibilities from "./Band/GetBandResponsibilities";
import CapabilityPerJobFamily from "./Capability/CapabilityPerJobFamily";
import GetTrainingBand from "./Band/GetTrainingBand";
import Band from "./Band/GetBandCompetencies";
import AddRole from "./Role/AddRole";
//import GlobalStyle from "./GlobalStyles";
import Footer from "./Footer";
import AddJobFamily from "./Capability/AddJobFamily";
import AddCapability from "./Capability/AddCapability";
import AddBand from "./Band/AddBand";
import CapabilityLead from "./Capability/CapabilityLead";


const App = () => {
  return (
    <div className = "example">
      <Router>
        <Switch>

          <Route exact path="/">
            <NavBar />
          </Route>
          <Route exact path="/Capability/CapabilityPerJobFamily">
            <NavBar />
            <CapabilityPerJobFamily />
          </Route>
          <Route exact path="/Capability/AddCapability">
            <NavBar />
            <AddCapability />
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

          <Route exact path="/Band/GetBandResponsibilities">
          <NavBar />
            <GetBandResponsibilities/>
          </Route>

          <Route exact path="/Capability/AddJobFamily">
          <NavBar />
            <AddJobFamily/>
          </Route>

          <Route exact path="/Band/addBand">
          <NavBar />
            <AddBand/>
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
