import { Form, Button, FormLabel } from "react-bootstrap"
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from "react"
import axios from "axios";
import './Role.css'
import { Link } from "react-router-dom";
import ErrorPage from "../shared/ErrorPage";
import { Table } from "react-bootstrap";

const AdminRoleView = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState();
    const [list, setList] = useState();
    const { getAccessTokenSilently, user } = useAuth0();
    const [error, setError] = useState();

    const [token, setToken] = useState();

    useEffect(() => {
        if (!results) {
            const fetchResults = async () => {
                const options = {
                    audience: 'http://my.api:50001',
                    scope: 'read:secured write:secured'
                }
                const accessToken = await getAccessTokenSilently(options);
                setToken(accessToken);
                console.log(accessToken)

                try {
                    const options = {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        }
                    }
                    const res = await axios.get(`https://my.api:50001/getJobRolesAdmin`, options);
                    setResults(res.data);

                } catch (error) {
                    if (error.response.status === 403 || error.response.status === 401) {
                        setError(error.response.status);
                    }

                }
            }
            fetchResults();
        } else {
            let tempList = results.filter((r) => {
                const { RoleID, RoleName, CapabilityName, BandName } = r
                return (RoleName.toLowerCase().includes(searchTerm.toLowerCase()) || CapabilityName.toLowerCase().includes(searchTerm.toLowerCase()) || BandName.toLowerCase().includes(searchTerm.toLowerCase()) || RoleID == searchTerm || searchTerm === "");
            }).map((r) => {
                const { RoleID, RoleName, CapabilityName, BandName } = r
                return (
                    <tr >
                        <td>{RoleName}</td>
                        <td>{CapabilityName}</td>
                        <td>{BandName}</td>
                        <td><AdminButtons roleID={RoleID} token={token} setResults={setResults} setError={setError}/></td>
                    </tr>
                )

            })
            setList(tempList);
        }
    }, [results, searchTerm]);

    if (error) {
        return (<ErrorPage error={error} />)
    } else if (results) {
        return (
            <div>
                <FormLabel
                    label="Search Term"
                    className="searchBar"
                >
                    <Form.Control type="search" placeholder="Search for a role id or role name" onChange={(e) => setSearchTerm(e.target.value)} />
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
    } else {
        return (
            <div>Loading!</div>
        )
    }
}

const AdminButtons = (props) => {
    return (
        <div>
            <Button variant="warning" className="mr-3"><Link className="linkButton" to={"/role/editRole/" + props.roleID}>Edit</Link></Button>
            <Button variant="danger" onClick={() => handleDeleteRole(props.roleID, props.token, props.setResults, props.setError)}>Delete</Button>
        </div>
    );
}

const handleEditRole = (id) => {

}

const handleDeleteRole = (id, token, setResults, setError) => {
    const config = {
        headers: {
            'Authorization': `Bearer ` + token,
        }
    };
    let confirmed = window.confirm("Are you sure you want to delete this role?");
    if (confirmed) {
        console.log("Deleting role with id: " + id);
        axios.post('https://my.api:50001/deleteRole', {
            RoleID: id,
        }, config)
            .then(function (response) {
                async function updateRoles() {
                    try {
                        const options = {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            }
                        }
                        const res = await axios.get(`https://my.api:50001/getJobRolesAdmin`, options);
                        setResults(res.data);

                    } catch (error) {
                        if (error.response.status === 403 || error.response.status === 401) {
                            setError(error.response.status);
                        }

                    }
                }
                updateRoles();
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export default AdminRoleView;
