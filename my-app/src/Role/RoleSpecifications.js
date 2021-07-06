import { Form, Button } from "react-bootstrap"
import { useState } from "react"
import axios from "axios";
import './Role.css'

import { Table } from "react-bootstrap";

const RoleSpecifications = () => {
    const [role, setRole] = useState();
    const [result, setResult] = useState([]);


    const list = result.map((r) => {
            const {id, name, link } = r
            return (
                <tr key={id}>
                    <td>{name}</td>
                    <td>{link}</td>
                </tr>
            )
        
    })

    const onSubmit = async (e) => {
        console.log('sumbmit from Role Specifications')
        e.preventDefault();
        const res = await axios.get(`http://localhost:5000/job-roles?name=${role}`)
        console.log(res)
        setResult(res.data);
    }

    return (
        <div className="insert-form">
            <Form onSubmit={onSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Job Role</Form.Label>
                    <Form.Control placeholder="Enter name" onChange={(e) => setRole(e.target.value)} />
                </Form.Group>
                <Button variant="secondary" size="lg" active type="submit">
                    Submit
                </Button>
            </Form>
            <div className="emp-table">
                <Table >
                    <thead>
                        <tr>
                            <th>Job Role</th>
                            <th>Specification</th>
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

export default RoleSpecifications;