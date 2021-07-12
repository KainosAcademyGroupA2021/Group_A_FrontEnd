import { Form, Button, FormLabel } from "react-bootstrap"
import { useState, useEffect } from "react"
import axios from "axios";
import './Role.css'

import { Table } from "react-bootstrap";

const AdminRoleView = () => {
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
                const { RoleID, RoleName, CapabilityName, BandName} = r
                return (RoleName.includes(searchTerm) || CapabilityName.includes(searchTerm) || BandName.includes(searchTerm) || RoleID == searchTerm || searchTerm === "");
            }).map((r) => {
                const { RoleID, RoleName, CapabilityName, BandName} = r
            return (
                <tr >
                    <td>{RoleName}</td>
                    <td>{CapabilityName}</td>
                    <td>{BandName}</td>
                    <td><AdminButtons roleID={RoleID}/></td>
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
                    <Form.Control type="search" placeholder="Search for a role id or role name" onChange={(e) => setSearchTerm(e.target.value)}/>
                </FormLabel>
            <div className="emp-table">
                <Table >
                    <thead>
                        <tr>
                            <th>Role Name</th>
                            <th>Capability Name</th>
                            <th>Band Name</th>
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

const AdminButtons = (props) => {
    return (
        <div>
        <Button variant="warning" className="mr-3">Edit</Button>
        <Button variant="danger" onClick={() => handleDeleteRole(props.roleID)}>Delete</Button>
        </div>
    );
}

const handleDeleteRole = (id) => {
    let confirmed =  window.confirm("Are you sure you want to delete this role?");
    if (confirmed) {
        console.log("Deleting role with id: " + id);
        axios.post('http://localhost:5000/deleteRole', {
            RoleID: id
          })
          .then(function (response) {
            console.log(response);
            window.location.reload()
          })
          .catch(function (error) {
            console.log(error);
          });
    }
}

export default AdminRoleView;
