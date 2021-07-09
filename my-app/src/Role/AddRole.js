import { useState, useEffect } from 'react';
import { Form, Button } from "react-bootstrap";
import './Role.css';
import axios from 'axios';

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
    const [selectedJobFamilyID, setSelectedJobFamilyID] = useState("");
    const [bandID, setBandID] = useState("");

    const [validated, setValidated] = useState("false");

    const [roleNameValidationMessage, setRoleNameValidationMessage] = useState("");
    const [roleSpecLinkValidationMessage, setRoleSpecLinkValidationMessage] = useState("");
    const [jobFamilyValidationMessage, setJobFamilyValidationMessage] = useState("");
    const [bandLevelValidationMessage, setBandLevelValidationMessage] = useState("");

    useEffect(() => {
        if (!bands) {
            async function fetchResults() {
                setCapabilites((await axios.get(`http://localhost:5000/getCapabilities`)).data);
                setJobFamilies((await axios.get(`http://localhost:5000/getJobFamilies`)).data);
                setBands((await axios.get(`http://localhost:5000/getBands`)).data)
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
        selectedJobFamilyID === "" ? setJobFamilyValidationMessage("You must select a job family!") : setJobFamilyValidationMessage("");
        bandID === "" ? setBandLevelValidationMessage("You must enter a valid number as the band level!") : setBandLevelValidationMessage("");

        if (roleName === "" || roleSpecLink === "" || selectedJobFamilyID === "" || bandID === "") {
            e.preventDefault();
            e.stopPropagation();
        } else {
        setValidated("true");

        axios.post('http://localhost:5000/addRole', {
            RoleName: roleName,
            RoleSpec: roleSpecLink,
            JobFamilyID: selectedJobFamilyID,
            BandID: bandID
          })
          .then(function (response) {
            console.log(response);
            window.location.href = '/role/GetJobRoles'
          })
          .catch(function (error) {
            console.log(error);
          });
          e.preventDefault();
        }
    }

    return (
        <div className="AddRoleContainer">
            <h1>Add a role</h1>
            <br />
            <Form onSubmit={handleSubmit} validiated={validated}>
                <Form.Group controlId="formAddRole">
                    <Form.Label>Role Name</Form.Label>
                    <Form.Control isInvalid={roleNameValidationMessage !== ""} type="roleName" placeholder="Enter role name" value={roleName} onChange={(e) => setRoleName(e.target.value)} />
                    <Form.Control.Feedback type="invalid">{roleNameValidationMessage}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formRoleSpecLink">
                    <Form.Label>Role Specification Link</Form.Label>
                    <Form.Control isInvalid={roleSpecLinkValidationMessage !== ""} type="roleSpecLink" placeholder="Enter the specification link for the role" value={roleSpecLink} onChange={(e) => setRoleSpecLink(e.target.value)} />
                    <Form.Control.Feedback type="invalid">{roleSpecLinkValidationMessage}</Form.Control.Feedback>
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
    )



}

export default AddRole;