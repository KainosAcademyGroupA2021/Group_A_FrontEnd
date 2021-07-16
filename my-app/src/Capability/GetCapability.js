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
                    <td><Button variant="primary"><Link className="linkButton" to={"/Capability/EditCapability/"+CapabilityID}>Edit</Link></Button></td>
                    <td><Button variant="primary" onClick={() => handleDeleteCapability(CapabilityID)}>Delete</Button></td>
                </tr>
            )

            })
            setList(tempList);
        }
    }, [results, searchTerm]);

   
    const handleDeleteCapability = (id) => {
        console.log(id);
        let confirmed =  window.confirm("Are you sure you want to delete this Capability?");
        if (confirmed) {
            console.log("Deleting Capability with id: " + id);
            axios.post('http://localhost:5000/deleteCapability', {
                CapabilityID: id
              })
              .then(function (response) {
                  console.log(id);
                console.log(response);
                console.log(response.data);
                if (response.data !== "success") {
                    alert("Unable to delete this Capability. Ensure all job families under this capability have been deleted first.")
                } else {
                    window.location.reload()
                }
              })
              .catch(function (error) {
                console.log(error);
              });
        }
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