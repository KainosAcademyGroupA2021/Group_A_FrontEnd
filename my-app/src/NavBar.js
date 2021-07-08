import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const NavBar = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Kainos </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/capability">Capability</Nav.Link>
                    <NavDropdown title="Role" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/role/GetJobRoles">Job Views Roles</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Band" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/band/GetBandCompetencies">Band Competencies</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    )
}

export default NavBar;
