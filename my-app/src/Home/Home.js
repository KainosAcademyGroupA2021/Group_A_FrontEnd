import {
  Form,
  Button,
  FormLabel,
  Card,
  Nav,
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  ListGroupItem
} from "react-bootstrap";
import "./Home.css";
import capabilityImg from "../Images/capability.png";
import bandImg from "../Images/band.png";
import roleImg from "../Images/role.png";
import jobImg from "../Images/job.png";

const Home = () => {
  return (
    
    <Container fluid style={{ width: "100%", justifyContent:"center", allignItems:"center", marginTop: "100px", display: "flex" }}>

      {/* <Container fluid style={{marginTop: "10px", marginLeft: "150px",width: "100%"}}> */}
        <Row>
          <Col style={{ maxWidth: "400px"}}>
            <Card style={{ width: "20rem"}}>
              <Card.Img as={Image} src={capabilityImg} fluid={true} alt="Card image" />
              <Card.Body>
              <Card.Title>Capability</Card.Title>
              <ListGroupItem><Button href="/Capability/CapabilityPerJobFamily" variant="outline-primary" size="lg" style={{width: "15rem"}}>Capability Relation with Job Family</Button></ListGroupItem>
              <ListGroupItem><Button href="/Capability/AddJobFamily" variant="outline-primary" size="lg" style={{width: "15rem"}}>View Capability Leads</Button></ListGroupItem>
              <ListGroupItem><Button href="/Capability/AddCapability" variant="outline-primary" size="lg" style={{width: "15rem"}}>Add Job Family</Button></ListGroupItem>
              <ListGroupItem><Button href="/Capability/GetCapability" variant="outline-primary" size="lg" style={{width: "15rem"}}>Add Capability</Button></ListGroupItem>
              <ListGroupItem><Button href="/Capability/CapabilityLead" variant="outline-primary" size="lg" style={{width: "15rem"}}>Edit Capability</Button></ListGroupItem>    
              </Card.Body>
            </Card>
          </Col>

          <Col style={{maxWidth: "400px"}}>
            <Card style={{ width: "20rem" }}>
            <Card.Img as={Image} src={bandImg} fluid={true} alt="Card image" />
              <Card.Body>   
              <Card.Title>Roles</Card.Title>
              <ListGroupItem><Button href="/role/GetJobRoles" variant="outline-primary" size="lg" style={{width: "15rem"}}>Job View Roles</Button></ListGroupItem>
              <ListGroupItem><Button href="/role/addRole" variant="outline-primary" size="lg" style={{width: "15rem"}}>Add a Role</Button></ListGroupItem>
              <ListGroupItem><Button href="/role/adminRoleView" variant="outline-primary" size="lg" style={{width: "15rem"}}>Admin Role View</Button></ListGroupItem>
              </Card.Body>
            </Card>
          </Col>

          <Col style={{maxWidth: "400px"}}>
            <Card style={{ width: "20rem" }}>
            <Card.Img as={Image} src={roleImg} fluid={true} alt="Card image" />
            <Card.Body>   
              <Card.Title>Band</Card.Title>
              <ListGroupItem><Button href="/Band/GetBandResponsibilities" variant="outline-primary" size="lg" style={{width: "15rem"}}>View Band Responsibilties</Button></ListGroupItem>
              <ListGroupItem><Button href="/band/getTrainingBand" variant="outline-primary" size="lg" style={{width: "15rem"}}>View training</Button></ListGroupItem>
              <ListGroupItem><Button href="/band/GetBandCompetencies" variant="outline-primary" size="lg" style={{width: "15rem"}}>Band Competencies</Button></ListGroupItem>
              <ListGroupItem><Button href="/band/addBand" variant="outline-primary" size="lg" style={{width: "15rem"}}>Add a Band</Button></ListGroupItem>
              <ListGroupItem><Button href="/band/adminBandView" variant="outline-primary" size="lg" style={{width: "15rem"}}>Admin Band View</Button></ListGroupItem>
              </Card.Body>
            </Card>
          </Col>


        </Row>

        {/* </Container> */}
    </Container>
    
    
  );
};

export default Home;
