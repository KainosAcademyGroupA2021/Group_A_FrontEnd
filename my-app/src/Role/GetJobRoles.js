import { Form, Button, FormLabel } from "react-bootstrap"
import { useState, useEffect } from "react"
import axios from "axios";
import './Role.css'

import { Table } from "react-bootstrap";

const GetJobRoles = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState();
    const [list, setList] = useState();
    const [capabilityID, setCapabilityID] = useState([]);
    const [bandID, setBandID] = useState([]);


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
                const { RoleID, RoleName, RoleSpec, CapabilityName, BandName} = r
            return (
                <tr >
                    <td>{RoleID}</td>
                    <td>{RoleName}</td>
                    <td>{RoleSpec}</td>
                    <td>{CapabilityName}</td>
                    <td>{BandName}</td>
                </tr>
            )

            })
            setList(tempList);
        }
    }, [results, searchTerm]);


//     const list = roleName.map((r) => {
//             const { RoleID, RoleName, RoleSpec, CapabilityName, BandName} = r
//             return (
//                 <tr >
//                     <td>{RoleID}</td>
//                     <td>{RoleName}</td>
//                     <td>{RoleSpec}</td>
//                     <td>{CapabilityName}</td>
//                     <td>{BandName}</td>
//                 </tr>
//             )

//     })

//     const onSubmit = async (e) => {
//         const res = await axios.get(`http://localhost:5000/getJobRoles`)
//         setRoleName(res.data);
//   }
//   onSubmit();

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
                            <th>Role ID</th>
                            <th>Role Name</th>
                            <th>Role Spec</th>
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

export default GetJobRoles;
