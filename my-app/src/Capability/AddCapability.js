import { useState, useEffect } from 'react';
import { Form, Button } from "react-bootstrap";
import './Capability.css';
import axios from 'axios';

const AddCapability = () => {
    const [capabilityLeads, setCapabilityLeads] = useState();

    const [capabilityLeadsItems, setCapabilityLeadsItems] = useState();

    const [selectedCapabilityLeadID, setSelectedCapabilityLeadID] = useState("");

    const [capabilityName, setCapabilityName] = useState("");
    //const [selectedCapabilityLeadID, setSelectedCapabilityLeadID] = useState("");
    const [validated, setValidated] = useState("false");

    const [capabilityNameValidationMessage, setCapabilityNameValidationMessage] = useState("");
    const [capabilityLeadValidationMessage, setCapabilityLeadValidationMessage] = useState("");

    useEffect(() => {
        if (!capabilityLeads) {
            async function fetchResults() {
                setCapabilityLeads((await axios.get(`http://localhost:50001/getCapabilityLeads`)).data);
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

        //console.log(capabilityName.length);
        capabilityName === "" ? setCapabilityNameValidationMessage("You must enter a name!") : setCapabilityNameValidationMessage("");
        capabilityName.length > 200 ? setCapabilityNameValidationMessage("Name exceeds limit!") : setCapabilityNameValidationMessage("");
        selectedCapabilityLeadID === "" ? setCapabilityLeadValidationMessage("You must select a capability lead!") : setCapabilityLeadValidationMessage("");


        if (capabilityName === "" || selectedCapabilityLeadID === "") {
            e.preventDefault();
            e.stopPropagation();
        }else{
        

        axios.post('http://localhost:50001/addCapability', {
            CapabilityName: capabilityName,
            CapabilityLeadID: selectedCapabilityLeadID
          })
          .then(function (response) {
            console.log(response);
            window.location.href = '/Capability/GetCapability'
          })
          .catch(function (error) {
            console.log(error);
          });
          e.preventDefault();
        }
        setValidated("true");
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
                        isInvalid={capabilityLeadValidationMessage !== ""}
                        name="capabilityLeads"
                        onChange={e => {
                            setSelectedCapabilityLeadID(e.target.value);
                        }}
                    >
                        <option value="" >Select capability lead</option>
                        {capabilityLeadsItems}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">{capabilityLeadValidationMessage}</Form.Control.Feedback>
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