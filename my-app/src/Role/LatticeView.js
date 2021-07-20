import { Form, Button, FormLabel } from "react-bootstrap"
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from "react"
import axios from "axios";
import './Role.css'
import { Link } from "react-router-dom";
import ErrorPage from "../shared/ErrorPage";
import { Table } from "react-bootstrap";

const LatticeView = () => {

    const [bands, setBands] = useState();
    const [capabilityID, setCapabilityID] = useState();
    const [capabilities, setCapabilities] = useState();

    const [jobFamilies, setJobFamilies] = useState([]);

    const { getAccessTokenSilently, user } = useAuth0();
    const [error, setError] = useState();
    const [token, setToken] = useState();

    useEffect(() => {
        if (!bands) {
            async function fetchData() {
                const options = {
                    audience: 'http://my.api:50001',
                    scope: 'read:secured write:secured'
                }
                const accessToken = await getAccessTokenSilently(options);
                setToken(accessToken);

                try {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        }
                    }

                    setCapabilities((await axios.get(`https://my.api:50001/getCapabilities`, config)).data);
                    setBands((await axios.get(`https://my.api:50001/getBands`, config)).data)
                } catch (e) {
                    if (e.response) {
                        if (e.response.status === 403 || e.response.status === 401) {
                            setError(e.response.status);
                        }
                    }
                }
            }
            fetchData();
        }
    }, []);

    useEffect(() => {
        async function updateJobFamilies() {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
                console.log(jobFamilies)
                setJobFamilies((await axios.get(`https://my.api:50001/getJobFamilies`, config)).data);
            } catch (e) {
                if (e.response) {
                    if (e.response.status === 403 || e.response.status === 401) {
                        setError(e.response.status);
                    }
                }
            }
        }
        updateJobFamilies();
    }, [capabilityID])

    if (error) {
        return (<ErrorPage error={error} />)
    } else if (bands) {
        return (
            <div className="LatticeViewContainer">
                <Form.Group>
                    <Form.Label>
                        Capability
            </Form.Label>
                    <Form.Control
                        as="select"
                        type="select"
                        name="capability"
                        value={capabilityID}
                        onChange={e => {
                            setCapabilityID(e.target.value)
                        }}
                    >?.
                <option value="" >Select a capability</option>
                        {capabilities.map((item) => {
                            return (<option value={item.CapabilityID}>{item.CapabilityName}</option>)
                        })}
                    </Form.Control>
                </Form.Group>

                <br />

                { capabilityID &&
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Band Level</th>
                            {jobFamilies.length > 0 ? jobFamilies.filter((item) => { return (item.CapabilityID == capabilityID) }).map((item) => {
                                console.log(item)
                                return (<th key={item.JobFamilyID} lassName="columnName">{item.JobFamilyName}</th>)
                            }) : ""}
                        </tr>
                    </thead>
                    <tbody>
                        <td>t</td>
                        {jobFamilies.length > 0 ? jobFamilies.filter((item) => { return (item.CapabilityID == capabilityID) }).map((item) => {
                                console.log(item)
                                return (<td className="columnName">{item.JobFamilyName}</td>)
                            }) : ""}
                    </tbody>
                </Table>}
            </div>
        )
    } else {
        return (
            <div>Loading!</div>
        )
    }
}
export default LatticeView;
