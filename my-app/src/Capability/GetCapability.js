import { Form, Button, FormLabel } from "react-bootstrap"
import { useState, useEffect } from "react"
import axios from "axios";
import './Capability.css'

import { Table } from "react-bootstrap";
import EditCapability from "./EditCapability";

const GetCapability = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState();
    const [list, setList] = useState();


    useEffect(() => {
        if (!results) {
            async function fetchResults() {
                const res = await axios.get(`http://localhost:5000/getCapabilities`);
                setResults(res.data);
            }
            fetchResults();
        } else {
            
            let tempList = results.filter((r) => {
                const { CapabilityID, CapabilityName, CapabilityLeadID} = r
                
                return (CapabilityName.includes(searchTerm) || searchTerm === "");
            }).map((r) => {
                
                const { CapabilityID, CapabilityName, CapabilityLeadID} = r
            return (
                <tr >
                    <td>{CapabilityName}</td>
                    <td>{CapabilityLeadID}</td>
                    <td><a class="btn btn-info" onClick={editCapability(CapabilityID)} role="button">
                        Edit Capability</a></td>
                </tr>
            )

            })
            setList(tempList);
        }
    }, [results, searchTerm]);

   
    

    function editCapability(id) {
        //var id = this.CapabilityID;
        window.location.href = "/Capability/EditCapability" + id;
    }

    return (
        <div>
            <FormLabel
                    label="Search Term"
                    className="searchBar"
                >
                    <Form.Control type="search" placeholder="Search for a capability" onChange={(e) => setSearchTerm(e.target.value)}/>
                </FormLabel>
            <div className="emp-table">
                <Table >
                    <thead>
                        <tr>
                            <th>Capability Name</th>
                            <th>Capability Lead ID</th>
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

export default GetCapability;