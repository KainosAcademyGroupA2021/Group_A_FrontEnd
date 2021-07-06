import { Form, Button, ListGroup } from "react-bootstrap"
import { useEffect, useState } from "react"
import axios from "axios";
import './RoleCapabilityView.css'

import { Table, FormLabel } from "react-bootstrap";

const RoleCapabilityView = () => {
    const [results, setResults] = useState();
    const [list, setList] = useState();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (!results) {
            async function fetchResults() {
                const res = await axios.get(`http://localhost:5000/rolesWithCapabilityNames`);
                setResults(res.data);
            }
            fetchResults();
        } else {
            let tempList = results.filter((r) => {
                const { RoleId, RoleName, CapabilityName } = r
                if (RoleName.includes(searchTerm) || RoleId == searchTerm || searchTerm === "") {
                    return true;
                } else {
                    return false;
                }
            }).map((r) => {
                const { RoleId, RoleName, CapabilityName } = r
                return (
                    <tr key={RoleId}>
                        <td>{RoleName}</td>
                        <td>{CapabilityName}</td>
                    </tr>
                )

            })
            setList(tempList);
        }
    }, [results, searchTerm]);

    if (results && list) {
        return (
            <div>
                <FormLabel
                    label="Search Term"
                    className="searchBar"
                >
                    <Form.Control type="search" placeholder="Search for a role id or role name" onChange={(e) => setSearchTerm(e.target.value)}/>
                </FormLabel>
                <div className="emp-table">
                    <Table>
                        <thead>
                            <tr>
                                <th>Job Role</th>
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
        return (
            <p>Loading Data!</p>
        )
    }
}

export default RoleCapabilityView;