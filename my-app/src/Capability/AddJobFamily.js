import { useState, useEffect } from 'react';
import { Form, Button } from "react-bootstrap";
import './Capability.css';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import ErrorPage from '../shared/ErrorPage';
import jwt_decode from "jwt-decode";

const AddJobFamily = () => {
    const [capabilities, setCapabilites] = useState();
    const [capabilityItems, setCapabilityItems] = useState();
    const [selectedCapabilityID, setSelectedCapabilityID] = useState("");
    const [jobFamilyName, setJobFamilyName] = useState("");
    const [jobFamilyValidationMessage, setJobFamilyValidationMessage] = useState("");
    const [capabilityValidationMessage, setCapabilityValidationMessage] = useState("");
    const [validated, setValidated] = useState("false");
    const { getAccessTokenSilently } = useAuth0();
    const [error, setError] = useState();
    const [token, setToken] = useState();


    useEffect(() => {
        if (!capabilities) {
            async function fetchResults() {
                const options = {
                    audience: 'http://my.api:50001',
                    scope: 'read:secured'
                }
                const token = await getAccessTokenSilently(options);
                console.log(token)
                setToken(token)
                const decodedToken = jwt_decode(token)
                console.log(decodedToken.permissions)
                const checkToken = (decodedToken) => {
                    if (decodedToken.permissions.length < 2) {
                        setError(403)
                        return
                    }
                }
                checkToken(decodedToken)
                try {
                    const options = {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }

                    setCapabilites((await axios.get(`https://my.api:50001/getCapabilities`, options)).data);
                } catch (e) {
                    console.log(e)
                    if (e.response) {
                        if (e.response.status === 403 || e.response.status === 401) {
                            setError(e.response.status);
                        }
                    }
                }

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

    const handleSubmit = async (e) => {
        jobFamilyName === "" ? setJobFamilyValidationMessage("You must enter a name!") : setJobFamilyValidationMessage("");
        selectedCapabilityID === "" ? setCapabilityValidationMessage("You must select a capability!") : setCapabilityValidationMessage("");

        if (jobFamilyName === "" || selectedCapabilityID === "") {
            e.preventDefault();
            e.stopPropagation();
        } else {
            setValidated("true");
            try {
                const options = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }

                axios.post('https://my.api:50001/addNewJobFamily', {
                    JobFamilyName: jobFamilyName,
                    CapabilityID: selectedCapabilityID
                }, options)
                    .then(function (response) {
                        console.log(response);
                        window.location.href = '/Capability/CapabilityPerJobFamily'
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                e.preventDefault();
            } catch (err) {
                if (error.response.status === 403 || error.response.status === 401 || error.response.status === 500) {
                    setError(error.response.status);
                }
            }

        }
    }
    if (error) {
        return <ErrorPage error={error} />
    } else if (capabilityItems) {
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
    } else {
        return <div></div>
    }


}

export default AddJobFamily;
