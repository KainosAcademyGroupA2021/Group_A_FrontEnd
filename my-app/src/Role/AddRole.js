import { useState, useEffect } from 'react';
import { Form, Button } from "react-bootstrap";
import './Role.css';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import ErrorPage from '../shared/ErrorPage';
import jwt_decode from 'jwt-decode';
import { validate } from 'json-schema';

const AddRole = () => {
    const [capabilities, setCapabilites] = useState();
    const [jobFamilies, setJobFamilies] = useState();
    const [bands, setBands] = useState();
    const [capabilityItems, setCapabilityItems] = useState();
    const [jobFamilyItems, setJobFamilyItems] = useState();
    const [bandItems, setBandItems] = useState();
    const [selectedCapabilityID, setSelectedCapabilityID] = useState();
    const [roleName, setRoleName] = useState("");
    const [roleSpecLink, setRoleSpecLink] = useState("");
    const [roleSummary, setRoleSummary] = useState("");
    const [selectedJobFamilyID, setSelectedJobFamilyID] = useState("");
    const [bandID, setBandID] = useState("");
    const [validated, setValidated] = useState("false");
    const [roleNameValidationMessage, setRoleNameValidationMessage] = useState("");
    const [roleSpecLinkValidationMessage, setRoleSpecLinkValidationMessage] = useState("");
    const [roleSummaryValidationMessage, setRoleSummaryValidationMessage] = useState("");
    const [jobFamilyValidationMessage, setJobFamilyValidationMessage] = useState("");
    const [bandLevelValidationMessage, setBandLevelValidationMessage] = useState("");

    const { getAccessTokenSilently } = useAuth0();
    const [token, setToken] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        if (!bands || !capabilities || !jobFamilies) {
            async function fetchResults() {
                const options = {
                    audience: 'http://my.api:50001',
                    scope: 'read:secured write:secured'
                }
                const accessToken = await getAccessTokenSilently(options);
                setToken(accessToken);
                try {
                    const options = {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        }
                    }

                    const decodedToken = jwt_decode(accessToken)
                    const checkToken = (decodedToken) => {
                        if (decodedToken.permissions.length < 2) {
                            setError(403)
                            return <ErrorPage error={error} />
                        }
                    }
                    checkToken(decodedToken)
                    if (!error) {
                        setCapabilites((await axios.get(`https://my.api:50001/getCapabilities`, options)).data);
                        setJobFamilies((await axios.get(`https://my.api:50001/getJobFamilies`, options)).data);
                        setBands((await axios.get(`https://my.api:50001/getBands`, options)).data)
                    }

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

            if (selectedCapabilityID != "") {
                tempItems = jobFamilies.filter((jobFamily) => {
                    const { CapabilityID } = jobFamily;
                    return CapabilityID == selectedCapabilityID;
                })
                    .map((jobFamily) => {
                        const { JobFamilyName, JobFamilyID } = jobFamily;
                        return (
                            <option key={JobFamilyID} value={JobFamilyID}>{JobFamilyName}</option>
                        );
                    });
                setJobFamilyItems(tempItems);
            }

            tempItems = bands.map((band) => {
                const { BandID, BandName, BandLevel } = band;
                return (
                    <option key={BandID} value={BandID}>{BandLevel + " - " + BandName}</option>
                );
            });
            setBandItems(tempItems);
        }
    }, [jobFamilies, bands, capabilities, selectedCapabilityID, validated]);

    const handleSubmit = (e) => {

        roleName === "" ? setRoleNameValidationMessage("You must enter a name!") : setRoleNameValidationMessage("");
        roleSpecLink === "" ? setRoleSpecLinkValidationMessage("You must enter a link!") : setRoleSpecLinkValidationMessage("");
        roleSummary === "" ? setRoleSummaryValidationMessage("You must enter a role specification summary!") : setRoleSummaryValidationMessage("");
        selectedJobFamilyID === "" ? setJobFamilyValidationMessage("You must select a job family!") : setJobFamilyValidationMessage("");
        bandID === "" ? setBandLevelValidationMessage("You must enter a valid number as the band level!") : setBandLevelValidationMessage("");

        if (roleName === "" || roleSpecLink === "" || selectedJobFamilyID === "" || bandID === "" || roleSummary === "") {
            e.preventDefault();
            e.stopPropagation();
        } else {
            const options = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
            setValidated("true");
            try {
                axios.post('https://my.api:50001/addRole', {
                    RoleName: roleName,
                    RoleSpec: roleSpecLink,
                    RoleSpecSummary: roleSummary,
                    JobFamilyID: selectedJobFamilyID,
                    BandID: bandID
                }, options)
                    .then(function (response) {
                        console.log(response);
                        window.location.href = '/role/GetJobRoles'
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                e.preventDefault();
            } catch (error) {
                if (error.response.status === 403 || error.response.status === 401 || error.response.status === 500) {
                    setError(error.response.status);
                }
            }
        }

    }

    if (error) {
        return <ErrorPage error={error} />
    } else if (bands) {
        return <div className="AddRoleContainer">
            <h1>Add a role</h1>
            <br />
            <Form onSubmit={handleSubmit} validiated={validated}>
                <Form.Group controlId="formAddRole">
                    <Form.Label>Role Name</Form.Label>
                    <Form.Control isInvalid={roleNameValidationMessage !== ""} type="roleName" placeholder="Enter role name" value={roleName} onChange={(e) => { if (e.target.value.length < 128) setRoleName(e.target.value) }} />
                    <Form.Control.Feedback type="invalid">{roleNameValidationMessage}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formRoleSpecLink">
                    <Form.Label>Role Specification Link</Form.Label>
                    <Form.Control isInvalid={roleSpecLinkValidationMessage !== ""} type="roleSpecLink" placeholder="Enter the specification link for the role" value={roleSpecLink} onChange={(e) => setRoleSpecLink(e.target.value)} />
                    <Form.Control.Feedback type="invalid">{roleSpecLinkValidationMessage}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formRoleSpecLink">
                    <Form.Label>Role Specification Summary</Form.Label>
                    <Form.Control as="textarea" rows={2} isInvalid={roleSummaryValidationMessage !== ""} type="roleSpecSummary" placeholder="Enter the specification summary for the role" value={roleSummary} onChange={(e) => { if (e.target.value.length < 255) setRoleSummary(e.target.value) }} />
                    <Form.Control.Feedback type="invalid">{roleSummaryValidationMessage}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label>
                        Capability
                    </Form.Label>
                    <Form.Control
                        as="select"
                        type="select"
                        name="capability"
                        onChange={e => {
                            setSelectedCapabilityID(e.target.value);
                        }}
                    >
                        <option value="" >Select capability</option>
                        {capabilityItems}
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>
                        Job Family
                    </Form.Label>
                    <Form.Control
                        as="select"
                        type="select"
                        name="jobfamily"
                        isInvalid={jobFamilyValidationMessage !== ""}
                        onChange={e => {
                            setSelectedJobFamilyID(e.target.value);
                        }}
                    >
                        <option value="" >{selectedCapabilityID ? "Select job family" : "Select a capability first"}</option>
                        {jobFamilyItems}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        {jobFamilyValidationMessage}
                    </Form.Control.Feedback>
                </Form.Group>


                <Form.Group>
                    <Form.Label>
                        Band Level
                    </Form.Label>
                    <Form.Control
                        as="select"
                        type="select"
                        name="bandLevel"
                        isInvalid={bandLevelValidationMessage !== ""}
                        onChange={e => {
                            setBandID(e.target.value);
                        }}
                    >
                        <option value="" >Select a band level</option>
                        {bandItems}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        {bandLevelValidationMessage}
                    </Form.Control.Feedback>
                </Form.Group>

                <br />
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    } else {
        return <div></div>
    }




}

export default AddRole;
