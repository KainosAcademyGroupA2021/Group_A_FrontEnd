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
  
  const Capability = () => {
    return (
      <Container>
        <Col style={{ marginTop: "10px" }}>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Button
                variant="outline-primary"
                size="lg"
                style={{ width: "15rem" }}>
                Capability
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Container>
    );
  };
  
  export default Capability;