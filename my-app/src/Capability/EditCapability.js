import { useState, useEffect } from 'react';
import { Form, Button } from "react-bootstrap";
import './Capability.css';
import axios from 'axios';
import { useParams } from "react-router-dom";

const EditCapability = () => {
    let { id } = useParams();
    const [capabilityLeads, setCapabilityLeads] = useState();

    const [previousData, setPreviousData] = useState();
    const [loadedPreviousData, setLoadedPreviousData] = useState(false);

    const [capabilityLeadsItems, setCapabilityLeadsItems] = useState();

    const [selectedCapabilityLeadID, setSelectedCapabilityLeadID] = useState("");

    const [capabilityName, setCapabilityName] = useState("");

    const [validated, setValidated] = useState("false");

    const [capabilityNameValidationMessage, setCapabilityNameValidationMessage] = useState("");
    const [capabilityLeadValidationMessage, setCapabilityLeadValidationMessage] = useState("");

    useEffect(() => {
        if (!(capabilityLeads && previousData)) {
            async function fetchResults() {
                setCapabilityLeads((await axios.get(`http://localhost:5000/getCapabilityLeads`)).data);
                setPreviousData((await axios.get('http://localhost:5000/getCapabilityByID/' + id)).data[0]);
            }
            fetchResults();
        } else if (capabilityLeads && previousData) {
            if (!loadedPreviousData) {
                const { CapabilityID, CapabilityName, CapabilityLeadID } = previousData;
                setCapabilityName(CapabilityName);
                setSelectedCapabilityLeadID(CapabilityLeadID);
            }

            let tempItems = capabilityLeads.map((capabilityLead) => {
                const { CapabilityLeadName, CapabilityLeadID } = capabilityLead;
                return (
                    <option key={CapabilityLeadID} value={CapabilityLeadID}>{CapabilityLeadName}</option>
                );
            });
            setCapabilityLeadsItems(tempItems);
        }

    }, [capabilityLeads, previousData, selectedCapabilityLeadID]);

    const handleSubmit = (e) => {

        capabilityName === "" ? setCapabilityNameValidationMessage("You must enter a name!") : setCapabilityNameValidationMessage("");
        selectedCapabilityLeadID === "" ? setCapabilityLeadValidationMessage("You must select a capability lead!") : setCapabilityLeadValidationMessage("");

        if (capabilityName === "" || selectedCapabilityLeadID === "") {
            e.preventDefault();
            e.stopPropagation();
        }else {
            axios.put('http://localhost:5000/editCapability/' + id, {
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
        <div className="EditCapabilityContainer">
            <h1>Edit Capability</h1>
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
                        value={selectedCapabilityLeadID}
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
                    Update
                </Button>
            </Form>
        </div>
    )



}

export default EditCapability;
