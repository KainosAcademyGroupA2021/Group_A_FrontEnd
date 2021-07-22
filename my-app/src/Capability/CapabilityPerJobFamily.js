import { useState, useEffect } from "react"
import axios from "axios";
import './Capability.css'
import { useAuth0 } from '@auth0/auth0-react';
import { Table, Form, FormLabel } from "react-bootstrap";
import ErrorPage from "../shared/ErrorPage";

const CapabilityPerJobFamily = () => {
    const [CapabilityName, setCapabilityName] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const { getAccessTokenSilently } = useAuth0();
    const [error, setError] = useState();
    const [results, setResults] = useState();

    useEffect(() => {
        const getCapabilityAndJobFamily = async (e) => {
            const options = {
                audience: 'http://my.api:50001',
                scope: 'read:secured'
            }
            const token = await getAccessTokenSilently(options);
            console.log(token)


            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
                const res = await axios.get(`https://my.api:50001/getCapabilityAndJobFamily`, config)
                setCapabilityName(res.data);
                setResults(res.data)
            } catch (error) {
                if (error.response.status === 403 || error.response.status === 401 || error.response.status === 500) {
                    setError(error.response.status);
                }

            }
        }
        getCapabilityAndJobFamily();
    }, [])

    const list = CapabilityName.filter((r) => {
        const {CapabilityName, JobFamilyName } = r
        return (CapabilityName.toLowerCase().includes(searchTerm.toLowerCase()) || JobFamilyName.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm == "")
    }).map((r) => {
        const { CapabilityID, CapabilityName, JobFamilyName } = r
        return (
            <tr key={CapabilityID}>
                <td>{JobFamilyName}</td>
                <td>{CapabilityName}</td>
            </tr>
        )

    })

    if (error) {
        return <ErrorPage error={error} />
    } else if (results) {
        return (
            <div>
                <FormLabel
                    label="Search Term"
                    className="searchBar"
                >
                    <Form.Control type="search" placeholder="Search for a capability or job family" onChange={(e) => setSearchTerm(e.target.value)} />
                </FormLabel>
                <div className="emp-table">
                    <Table >
                        <thead>
                            <tr>
                                <th>Job Family Name</th>
                                <th>Capability Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    } else {
        return <div></div>
    }
}

export default CapabilityPerJobFamily;
