import { Form, Button, FormLabel } from "react-bootstrap"
import { useState, useEffect } from "react"
import axios from "axios";
import './Capability.css'
import { Link } from "react-router-dom";
import ErrorPage from "../shared/ErrorPage";
import { Table } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import jwt_decode from "jwt-decode";

const GetCapability = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState();
    const [list, setList] = useState();
    const { getAccessTokenSilently} = useAuth0();
    const [error, setError] = useState();


    useEffect(() => {
        if (!results) {
            async function fetchResults() {
                const options = {
                    audience: 'http://my.api:50001',
                    scope: 'read:secured'
                }
                const token = await getAccessTokenSilently(options);
                console.log(token)
                const decodedToken = jwt_decode(token)
                const checkToken = (decodedToken) => {
                    if(decodedToken.permissions.length < 2) {
                        setError(403)
                        return <ErrorPage error={error} />
                    }
                }
                checkToken(decodedToken)
                try {
                    const options = {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                    const res = await axios.get(`https://my.api:50001/getCapabilities`, options);
                    setResults(res.data);
                } catch (error) {
                    if (error.response.status === 403 || error.response.status === 401 || error.response.status === 500) {
                        setError(error.response.status);
                    }

                }
            }
            fetchResults();
        } else {

            let tempList = results.filter((r) => {
                const { CapabilityName, CapabilityLeadName } = r

                return (CapabilityName.includes(searchTerm) || CapabilityLeadName.includes(searchTerm) || searchTerm === "");
            }).map((r) => {

                const { CapabilityID, CapabilityName, CapabilityLeadName } = r
                return (
                    <tr >
                        <td>{CapabilityName}</td>
                        <td>{CapabilityLeadName}</td>
                        <td><AdminButtons CapabilityID={CapabilityID}/></td>
                    </tr>
                )

            })
            setList(tempList);
        }
    }, [results, searchTerm]);

    const AdminButtons = (props) => {
        return (
            <div>
            <Button variant="warning" className="mr-3"><Link className="linkButton" to={"/Capability/editCapability/"+props.CapabilityID}>Edit</Link></Button>
            <Button variant="danger" onClick={() => handleDeleteCapability(props.CapabilityID)}>Delete</Button>
            </div>
        );
    }

    const handleDeleteCapability = async (id) => {

        let confirmed = window.confirm("Are you sure you want to delete this Capability?");
        if (confirmed) {
            console.log("Deleting Capability with id: " + id);
            const options = {
                audience: 'http://my.api:50001',
                scope: 'read:secured write:secured'
            }
            const token = await getAccessTokenSilently(options);
            console.log(token)

            try {
                const options = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
                axios.post('https://my.api:50001/deleteCapability',{
                    CapabilityID: id
                }, options)
                    .then(function (response) {
                        if (response.data !== "success") {
                            alert("Unable to delete this Capability. Ensure all job families under this capability have been deleted first.")
                        } else {
                            window.location.reload()
                        }
                    })
                    .catch(function (error) {
                        alert("You dont have access")

                    });
            } catch (error) {
                if (error.response.status === 403 || error.response.status === 401 || error.response.status === 500) {
                    setError(error.response.status);
                }

            }
        }
    }

    if (error) {
        return <ErrorPage error={error} />
    } else if (results) {
        return (
            <div>
                <FormLabel
                    label="Search Term"
                    className="searchBar"
                >
                    <Form.Control type="search" placeholder="Search for a capability or capability lead" onChange={(e) => setSearchTerm(e.target.value)} />
                </FormLabel>
                <div className="emp-table">
                    <Table >
                        <thead>
                            <tr>
                                <th>Capability Name</th>
                                <th>Capability Lead</th>
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
        return <div></div>
    }
}

export default GetCapability;