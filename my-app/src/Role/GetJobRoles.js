import { Form, Button, FormLabel } from "react-bootstrap"
import { useState, useEffect } from "react"
import axios from "axios";
import './Role.css'

import { Table } from "react-bootstrap";

const GetJobRoles = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState();
    const [list, setList] = useState();


    useEffect(() => {
        if (!results) {
            async function fetchResults() {
                const res = await axios.get(`http://localhost:5000/getJobRoles`);
                setResults(res.data);
            }
            fetchResults();
        } else {
            let tempList = results.filter((r) => {
                const { RoleName, CapabilityName, BandName} = r
                return (RoleName.includes(searchTerm) || CapabilityName.includes(searchTerm) || BandName.includes(searchTerm) || searchTerm === "");
            }).map((r) => {
                const { RoleName, RoleSpec, RoleSpecSummary, CapabilityName, BandName, BandLevel} = r
            return (
                <tr >
                    <td>{RoleName}</td>
                    <td><a href ={RoleSpec}>Link to job spec</a></td>
                    <td>{RoleSpecSummary}</td>
                    <td>{CapabilityName}</td>
                    <td>{BandName}</td>
                    <td>{BandLevel}</td>
                </tr>
            )

            })
            setList(tempList);
        }
    }, [results, searchTerm]);

    return (
        <div>
            <FormLabel
                    label="Search Term"
                    className="searchBar"
                >
                    <Form.Control type="search" placeholder="Search for role, capability or band name" onChange={(e) => setSearchTerm(e.target.value)}/>
                </FormLabel>
            <div className="emp-table">
                <Table >
                    <thead>
                        <tr>
                            <th>Role Name</th>
                            <th>Role Spec</th>
                            <th>Role Spec Summary</th>
                            <th>Capability Name</th>
                            <th>Band Name</th>
                            <th>Band Level</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </Table>
            </div>
            </div>
    )
}

export default GetJobRoles;
