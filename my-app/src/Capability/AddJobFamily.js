import { useState, useEffect } from 'react';
import { Form, Button } from "react-bootstrap";
import './Capability.css';
import axios from 'axios';

const AddJobFamily = () => {

  const [capabilities, setCapabilites] = useState();
  const [capabilityItems, setCapabilityItems] = useState();
  const [selectedCapabilityID, setSelectedCapabilityID] = useState("");
  const [jobFamilyName, setJobFamilyName] = useState("");

  const [jobFamilyValidationMessage, setJobFamilyValidationMessage] = useState("");
  const [capabilityValidationMessage, setCapabilityValidationMessage] = useState("");

  const [validated, setValidated] = useState("false");

  useEffect(() => {
      if (!capabilities) {
          async function fetchResults() {
              setCapabilites((await axios.get(`https://my.api:50001/getCapabilities`)).data);
          }
          fetchResults();
      } else {
          let tempItems = capabilities.map((capability) => {
              const { CapabilityName, CapabilityID } = capability;
              return (
                  <option key={CapabilityID} value={CapabilityID}>{CapabilityName}</option>
              );
          });
          setCapabilityItems(tempItems);
      }
  }, [capabilities, validated, selectedCapabilityID]);

  const handleSubmit = (e) => {

      jobFamilyName === "" ? setJobFamilyValidationMessage("You must enter a name!") : setJobFamilyValidationMessage("");
      selectedCapabilityID === "" ? setCapabilityValidationMessage("You must select a capability!") : setCapabilityValidationMessage("");

      if (jobFamilyName === "" || selectedCapabilityID === "") {
          e.preventDefault();
          e.stopPropagation();
      } else {
      setValidated("true");

      axios.post('https://my.api:50001/addNewJobFamily', {
          JobFamilyName: jobFamilyName,
          CapabilityID: selectedCapabilityID
        })
        .then(function (response) {
          console.log(response);
          window.location.href = '/Capability/CapabilityPerJobFamily'
        })
        .catch(function (error) {
          console.log(error);
        });
        e.preventDefault();
      }
  }

  return (
      <div className="addJobFamilyContainer">
          <h1>Add a Job Family</h1>
          <br />
          <Form onSubmit={handleSubmit} validiated={validated}>
              <Form.Group controlId="formAddRole">
                  <Form.Label>Job Family Name</Form.Label>
                  <Form.Control isInvalid={jobFamilyValidationMessage !== ""} type="jobFamilyName" placeholder="Enter Job Family Name" value={jobFamilyName} onChange={(e) => setJobFamilyName(e.target.value)} />
                  <Form.Control.Feedback type="invalid">{jobFamilyValidationMessage}</Form.Control.Feedback>
              </Form.Group>


              <Form.Group>
                  <Form.Label>
                      Capability
                  </Form.Label>
                  <Form.Control
                      as="select"
                      type="select"
                      name="capability"
                      isInvalid={capabilityValidationMessage !== ""}
                      onChange={e => {
                          setSelectedCapabilityID(e.target.value);
                      }}
                  >
                      <option value="" >Select a capability</option>
                      {capabilityItems}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                      {capabilityValidationMessage}
                  </Form.Control.Feedback>
              </Form.Group>

              <br />
              <Button variant="primary" type="submit">
                  Submit
              </Button>
          </Form>
      </div>
  )
}

export default AddJobFamily;
