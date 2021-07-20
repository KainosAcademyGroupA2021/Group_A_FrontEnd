import { Form, Button, FormLabel } from "react-bootstrap"
import { useState, useEffect } from "react"
import axios from "axios";
import './Band.css'
import { Link } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { Table } from "react-bootstrap";
import ErrorPage from "../shared/ErrorPage";

const AdminBandView = () => {
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
                    const res = await axios.get(`https://my.api:50001/getBandsAdmin`, options);
                    console.log(res.data);
                    setResults(res.data);

                } catch (error) {
                    if (error.response.status === 403 || error.response.status === 401) {
                        console.log(error)
                        setError(error.response.status);
                    }

                }
            }
            fetchResults();
        } else {
            let tempList = results.filter((r) => {
                const { BandName, BandLevel } = r
                return (BandName.toLowerCase().includes(searchTerm.toLowerCase()) || BandLevel === searchTerm || searchTerm === "");
            }).map((r) => {
                const { BandID, BandName, BandLevel } = r
                return (
                    <tr key={BandID}>
                        <td>{BandName}</td>
                        <td>{BandLevel}</td>
                        <td><AdminButtons bandID={BandID} token={token} setResults={setResults} setError={setError}/></td>
                    </tr>
                )

            })
            setList(tempList);
        }
    }, [results, searchTerm]);

    if (error) {
        return (<ErrorPage error={error}/>)
    } else if (results) {
    return (
        <div>
            <FormLabel
                label="Search Term"
                className="searchBar"
            >
                <Form.Control type="search" placeholder="Search for a band name or band level" onChange={(e) => setSearchTerm(e.target.value)} />
            </FormLabel>
            <div className="emp-table">
                <Table >
                    <thead>
                        <tr>
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
    ) } else {
        return (<div>Loading Data!</div>)
    }
}

const AdminButtons = (props) => {
    return (
        <div>
            <Button variant="warning" className="mr-3"><Link className="linkButton" to={"/band/editBand/" + props.bandID}>Edit</Link></Button>
            <Button variant="danger" onClick={() => handleDeleteBand(props.bandID, props.token, props.setResults, props.setError)}>Delete</Button>
        </div>
    );
}


const handleDeleteBand = (id, token, setResults, setError) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ` + token,
        }
    };

    let confirmed = window.confirm("Are you sure you want to delete this band?");
    if (confirmed) {
        console.log("Deleting band with id: " + id);
        axios.post('https://my.api:50001/deleteBand', {
            BandID: id
        }, config)
            .then(function (response) {
                console.log(response);
                if (response.data !== "success") {
                    alert("Unable to delete this band. Ensure all roles under this band have been deleted first.")
                } else {
                    async function refreshBands() {
                    try {
                        const options = {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            }
                        }
                        const res = await axios.get(`https://my.api:50001/getBandsAdmin`, options);
                        console.log(res.data);
                        setResults(res.data);
    
                    } catch (error) {
                        if (error.response.status === 403 || error.response.status === 401) {
                            console.log(error)
                            setError(error.response.status);
                        }
    
                    }
                }
                refreshBands();
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export default AdminBandView;
