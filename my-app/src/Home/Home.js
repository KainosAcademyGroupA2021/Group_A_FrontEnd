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
} from "react-bootstrap";
import "./Home.css";
import capabilityImg from "../Images/capability.png";
import bandImg from "../Images/band.png";
import roleImg from "../Images/role.png";
import jobImg from "../Images/job.png";

const Home = () => {
  return (
    <Container fluid style={{ width: "100%"}}>

      <Container fluid style={{marginTop: "10px", marginLeft: "150px",width: "100%"}}>
        <Row>
          <Col style={{marginTop: "10px"}}>
            <Card style={{ width: "18rem" }}>
              <Card.Img as={Image} src={capabilityImg} fluid={true} alt="Card image" />
              <Card.Body>              
                <Button href="/Capability/Capability" variant="outline-primary" size="lg" style={{width: "15rem"}}>Capability</Button>           
              </Card.Body>
            </Card>
          </Col>

          <Col style={{marginTop: "10px"}}>
            <Card style={{ width: "18rem" }}>
            <Card.Img as={Image} src={bandImg} fluid={true} alt="Card image" />
              <Card.Body>
                <Button href="/Band/Band" variant="outline-primary" size="lg" style={{width: "15rem"}}>Band</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col style={{marginTop: "10px"}}>
            <Card style={{ width: "18rem" }}>
            <Card.Img as={Image} src={roleImg} fluid={true} alt="Card image" />
              <Card.Body>
                <Button href="/Role/Role" variant="outline-primary" size="lg" style={{width: "15rem"}}>Role</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col style={{marginTop: "10px"}}>
            <Card style={{ width: "18rem" }}>
            <Card.Img as={Image} src={jobImg} fluid={true} alt="Card image" />
              <Card.Body>
                <Button variant="outline-primary" size="lg" style={{width: "15rem"}}>Job</Button>
              </Card.Body>
            </Card>
          </Col>

        </Row>

      </Container>
    </Container>

    
  );
};

export default Home;
