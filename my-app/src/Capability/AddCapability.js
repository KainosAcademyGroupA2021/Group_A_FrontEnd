import { useState, useEffect } from 'react';
import { Form, Button } from "react-bootstrap";
import './Capability.css';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useAuth0 } from '@auth0/auth0-react';
import ErrorPage from '../shared/ErrorPage';

const AddCapability = () => {
    const [capabilityLeads, setCapabilityLeads] = useState();
    const [capabilityLeadsItems, setCapabilityLeadsItems] = useState();
    const [selectedCapabilityLeadID, setSelectedCapabilityLeadID] = useState("");
    const [capabilityName, setCapabilityName] = useState("");
    const [validated, setValidated] = useState("false");
    const [capabilityNameValidationMessage, setCapabilityNameValidationMessage] = useState("");
    const [capabilityLeadValidationMessage, setCapabilityLeadValidationMessage] = useState("");
    const { getAccessTokenSilently } = useAuth0();
    const [error, setError] = useState();
    const [token, setToken] = useState();

    useEffect(() => {
        if (!capabilityLeads) {
            async function fetchData() {
                const options = {
                    audience: 'http://my.api:50001',
                    scope: 'read:secured write:secured'
                }
                const accessToken = await getAccessTokenSilently(options);
                setToken(accessToken);
                const decodedToken = jwt_decode(accessToken)
                const checkToken = (decodedToken) => {
                    if(decodedToken.permissions.length < 2) {
                        setError(403)
                        return
                    }
                }
                checkToken(decodedToken)
                try {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        }
                    }
                    setCapabilityLeads((await axios.get(`https://my.api:50001/getCapabilityLeads`, config)).data);
                } catch (e) {
                    console.log(e)
                    if (e.response) {
                        if (e.response.status === 403 || e.response.status === 401) {
                            setError(e.response.status);
                        }
                    }

                }
            }
            fetchData();
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

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }

        //console.log(capabilityName.length);
        capabilityName === "" ? setCapabilityNameValidationMessage("You must enter a name!") : setCapabilityNameValidationMessage("");
        capabilityName.length > 200 ? setCapabilityNameValidationMessage("Name exceeds limit!") : setCapabilityNameValidationMessage("");
        selectedCapabilityLeadID === "" ? setCapabilityLeadValidationMessage("You must select a capability lead!") : setCapabilityLeadValidationMessage("");


        if (capabilityName === "" || selectedCapabilityLeadID === "") {
            e.preventDefault();
            e.stopPropagation();
        } else {


            axios.post('https://my.api:50001/addCapability', {
                CapabilityName: capabilityName,
                CapabilityLeadID: selectedCapabilityLeadID
            }, config)
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

    if (error) {
        return (<ErrorPage error={error} />)
    } else if (setCapabilityLeads) {
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
    else {
        return (<div>Loading Data!</div>)
    }



}

export default AddCapability;