import { Form, Button } from "react-bootstrap"
import { useState } from "react"
import axios from "axios";
import './Role.css'

import { Table } from "react-bootstrap";

const GetJobRoles = () => {
    const [roleID, setRoleID] = useState();
    const [roleName, setRoleName] = useState([]);
    const [roleSpec, setRoleSpec] = useState([]);
    const [capabilityID, setCapabilityID] = useState([]);
    const [bandID, setBandID] = useState([]);


    const list = roleName.map((r) => {
            const { RoleID, RoleName, RoleSpec, CapabilityID, BandID} = r
            return (
                <tr >
                    <td>{RoleID}</td>
                    <td>{RoleName}</td>
                    <td>{RoleSpec}</td>
                    <td>{CapabilityID}</td>
                    <td>{BandID}</td>
                </tr>
            )

    })

    const onSubmit = async (e) => {
        const res = await axios.get(`http://localhost:5000/getJobRoles`)
        setRoleName(res.data);
  }
  onSubmit();

    return (
            <div className="emp-table">
                <Table >
                    <thead>
                        <tr>
                            <th>Role ID</th>
                            <th>Role Name</th>
                            <th>Role Spec</th>
                            <th>Capability ID</th>
                            <th>Band ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </Table>
            </div>
    )
}

export default GetJobRoles;
