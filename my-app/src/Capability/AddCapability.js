import { useState, useEffect } from 'react';
import { Form, Button } from "react-bootstrap";
import './Capability.css';
import axios from 'axios';

const AddCapability = () => {
    const [capabilityLeads, setCapabilityLeads] = useState();

    const [capabilityLeadsItems, setCapabilityLeadsItems] = useState();

    const [selectedCapabilityLeadID, setSelectedCapabilityLeadID] = useState();

    const [capabilityName, setCapabilityName] = useState("");
    //const [selectedCapabilityLeadID, setSelectedCapabilityLeadID] = useState("");
    const [validated, setValidated] = useState("false");

    const [capabilityNameValidationMessage, setCapabilityNameValidationMessage] = useState("");
    const [capabilityLeadValidationMessage, setCapabilityLeadValidationMessage] = useState("");

    useEffect(() => {
        if (!capabilityLeads) {
            async function fetchResults() {
                setCapabilityLeads((await axios.get(`http://localhost:5000/getCapabilityLeads`)).data);
            }
            fetchResults();
        } else {
            let tempItems = capabilityLeads.map((capabilityLeads) => {
                const { CapabilityLeadName, CapabilityLeadID } = capabilityLeads;
                return (
                    <option key={CapabilityLeadID} value={CapabilityLeadID}>{CapabilityLeadName}</option>
                );
            });
            setCapabilityLeadsItems(tempItems);

        }
    }, [capabilityLeads, selectedCapabilityLeadID, validated]);

    const handleSubmit = (e) => {

        capabilityName === "" ? setCapabilityNameValidationMessage("You must enter a name!") : setCapabilityNameValidationMessage("");
        selectedCapabilityLeadID === "" ? setCapabilityLeadValidationMessage("You must select a capability lead!") : setCapabilityLeadValidationMessage("");


        if (capabilityName === "" || selectedCapabilityLeadID === "") {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated("true");

        axios.post('http://localhost:5000/addCapability', {
            CapabilityName: capabilityName,
            CapabilityLeadID: selectedCapabilityLeadID
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return (
        <div className="AddCapabilityContainer">
            <h1>Add a capability</h1>
            <br />
            <Form onSubmit={handleSubmit} validiated={validated}>
                <Form.Group controlId="formAddCapability">
                    <Form.Label>Capability Name</Form.Label>
                    <Form.Control isInvalid={capabilityNameValidationMessage !== ""} type="capabilityName" placeholder="Enter capability name" value={capabilityName} onChange={(e) => setCapabilityName(e.target.value)} />
                    <Form.Control.Feedback type="invalid">{capabilityNameValidationMessage}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label>
                        Capability Lead
                    </Form.Label>
                    <Form.Control
                        as="select"
                        type="select"
                        name="capabilityLeads"
                        onChange={e => {
                            setSelectedCapabilityLeadID(e.target.value);
                        }}
                    >
                        <option value="" >Select capability lead</option>
                        {capabilityLeadsItems}
                    </Form.Control>
                </Form.Group>

                <br />
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )



}

export default AddCapability;