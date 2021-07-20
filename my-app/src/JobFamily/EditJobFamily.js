import { useState, useEffect } from 'react';
import { Form, Button } from "react-bootstrap";
import './JobFamily.css';
import axios from 'axios';
import { useParams } from "react-router-dom";

const EditJobFamily = () => {
    let { id } = useParams();
    const [capabilities, setCapabilities] = useState();

    const [previousData, setPreviousData] = useState();
    const [loadedPreviousData, setLoadedPreviousData] = useState(false);

    const [capabilitiesItems, setCapabilitiesItems] = useState();

    const [selectedCapabilityID, setSelectedCapabilityID] = useState("");

    const [jobFamilyName, setJobFamilyName] = useState("");

    const [validated, setValidated] = useState("false");

    const [jobFamilyNameValidationMessage, setJobFamilyNameValidationMessage] = useState("");
    const [capabilityValidationMessage, setCapabilityValidationMessage] = useState("");

    useEffect(() => {
        if (!(capabilities && previousData)) {
            async function fetchResults() {
                setCapabilities((await axios.get(`https://my.api:50001/getCapabilities`)).data);
                setPreviousData((await axios.get('https://my.api:50001/getJobFamilyByID/' + id)).data[0]);
            }
            fetchResults();
        } else if (capabilities && previousData) {
            if (!loadedPreviousData) {
                const { JobFamilyID, JobFamilyName, CapabilityID } = previousData;
                setJobFamilyName(JobFamilyName);
                setSelectedCapabilityID(CapabilityID);
            }

            let tempItems = capabilities.map((capability) => {
                const { CapabilityName, CapabilityID } = capability;
                return (
                    <option key={CapabilityID} value={CapabilityID}>{CapabilityName}</option>
                );
            });
            setCapabilitiesItems(tempItems);
        }

    }, [capabilities, previousData, selectedCapabilityID]);

    const handleSubmit = (e) => {

        jobFamilyName === "" ? setJobFamilyNameValidationMessage("You must enter a name!") : setJobFamilyNameValidationMessage("");
        selectedCapabilityID === "" ? setCapabilityValidationMessage("You must select a capability!") : setCapabilityValidationMessage("");

        if (jobFamilyName === "" || selectedCapabilityID === "") {
            e.preventDefault();
            e.stopPropagation();
        }else {
            axios.put('https://my.api:50001/editJobFamily/' + id, {
                JobFamilyName: jobFamilyName,
            CapabilityID: selectedCapabilityID
            })
                .then(function (response) {
                    console.log(response);
                    window.location.href = '/JobFamily/AdminJobFamilyView'
                })
                .catch(function (error) {
                    console.log(error);
                });
            e.preventDefault();
        }
        setValidated("true");
    }

    return (
        <div className="EditJobFamilyContainer">
            <h1>Edit Job Family</h1>
            <br />
            <Form onSubmit={handleSubmit} validiated={validated}>
                <Form.Group controlId="formAddJobFamily">
                    <Form.Label>Job Family Name</Form.Label>
                    <Form.Control isInvalid={jobFamilyNameValidationMessage !== ""} type="jobFamilyName" placeholder="Enter job family name" value={jobFamilyName} onChange={(e) => setJobFamilyName(e.target.value)} />
                    <Form.Control.Feedback type="invalid">{jobFamilyNameValidationMessage}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label>
                        Capability
                    </Form.Label>
                    <Form.Control
                        as="select"
                        type="select"
                        value={selectedCapabilityID}
                        isInvalid={capabilityValidationMessage !== ""}
                        name="capabilities"
                        onChange={e => {
                            setSelectedCapabilityID(e.target.value);
                        }}
                    >
                        <option value="" >Select capability</option>
                        {capabilitiesItems}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">{capabilityValidationMessage}</Form.Control.Feedback>
                </Form.Group>

                <br />
                <Button variant="primary" type="submit">
                    Update
                </Button>
            </Form>
        </div>
    )



}

export default EditJobFamily;
