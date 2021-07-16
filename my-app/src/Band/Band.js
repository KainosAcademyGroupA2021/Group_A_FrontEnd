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
import viewImage from "../Images/job.png";

const BandMain = () => {
  return (
    <Container fluid style={{ width: "100%"}}>

    <Container fluid style={{marginTop: "10px", marginLeft: "150px",width: "100%"}}>
      <Row>
        <Col style={{marginTop: "10px"}}>
          <Card style={{ width: "18rem" }}>
            <Card.Img as={Image} src={viewImage} fluid={true} alt="Card image" />
            <Card.Body>              
              <Button href="/Band/GetBandCompetencies" variant="outline-primary" size="lg" style={{width: "15rem"}}>Get Band Competencies</Button>           
            </Card.Body>
          </Card>
        </Col>

        <Col style={{marginTop: "10px"}}>
          <Card style={{ width: "18rem" }}>
          <Card.Img as={Image} src={viewImage} fluid={true} alt="Card image" />
            <Card.Body>
              <Button href="/Band/GetBandResponsibilities" variant="outline-primary" size="lg" style={{width: "15rem"}}>Get Band Responsibility</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col style={{marginTop: "10px"}}>
          <Card style={{ width: "18rem" }}>
          <Card.Img as={Image} src={viewImage} fluid={true} alt="Card image" />
            <Card.Body>
              <Button href="/Band/GetTrainingBand" variant="outline-primary" size="lg" style={{width: "15rem"}}>Get Band Training</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

    </Container>
  </Container>

  
  );
};

export default BandMain;
