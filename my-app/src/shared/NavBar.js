import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import LoginButton from "../Buttons/LoginButton";
import LogoutButton from "../Buttons/LogoutButton";
import Logo from '../Images/thumbnail.png'
import "./NavBar.css"
import noUser from "../Images/noUser.png"
import { useAuth0 } from '@auth0/auth0-react';

const NavBar = () => {
    const {user} = useAuth0()
    const profilePicture = (user) ? user.picture : noUser
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand>
                <img
                    src={Logo}
                    width="240"
                    height="70"
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="navbar">
                    <Nav.Link href="/">Home</Nav.Link>
                    <NavDropdown title="Capability" id="basic-nav-dropdown-capability">
                        <NavDropdown.Item href="/Capability/CapabilityPerJobFamily">Capability Relation With Job Family</NavDropdown.Item>
                        <NavDropdown.Item href="/Capability/AddJobFamily">Add Job Family</NavDropdown.Item>
                        <NavDropdown.Item href="/Capability/AddCapability">Add Capability</NavDropdown.Item>
                        <NavDropdown.Item href="/Capability/GetCapability">Edit Capability</NavDropdown.Item>
                        <NavDropdown.Item href="/Capability/CapabilityLead">View Capability Leads</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Role" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/role/GetJobRoles">Job Views Roles</NavDropdown.Item>
                        <NavDropdown.Item href="/role/addRole">Add a role</NavDropdown.Item>
                        <NavDropdown.Item href="/role/adminRoleView">Admin Role View</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Band" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/Band/GetBandResponsibilities">View Band Responsibilities</NavDropdown.Item>
                        <NavDropdown.Item href="/band/getTrainingBand">View Training</NavDropdown.Item>
                        <NavDropdown.Item href="/band/GetBandCompetencies">Band Competencies</NavDropdown.Item>
                        <NavDropdown.Item href="/band/addBand">Add a band</NavDropdown.Item>
                        <NavDropdown.Item href="/band/adminBandView">Admin Band View</NavDropdown.Item>
                    </NavDropdown>
                    <div className="auth-buttons">
                        <LoginButton />
                        <LogoutButton />
                    </div>
                </Nav>
                <Nav>
                    <img src={profilePicture} className="profile-picture" />
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    )
}

export default NavBar;
