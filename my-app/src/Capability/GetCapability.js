import { Form, Button, FormLabel } from "react-bootstrap"
import { useState, useEffect } from "react"
import axios from "axios";
import './Capability.css'
import { Link } from "react-router-dom";

import { Table } from "react-bootstrap";
import EditCapability from "./EditCapability";

const GetCapability = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState();
    const [list, setList] = useState();


    useEffect(() => {
        if (!results) {
            async function fetchResults() {
                const res = await axios.get(`https://my.api:50001/getCapabilities`);
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
                    <td><Button variant="primary"><Link className="linkButton" to={"/Capability/EditCapability/"+CapabilityID}>Edit</Link></Button></td>
                </tr>
            )

            })
            setList(tempList);
        }
    }, [results, searchTerm]);

   
    

    function editCapability() {
        //var id = this.CapabilityID;
        //window.location.href = "/Capability/EditCapability";
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