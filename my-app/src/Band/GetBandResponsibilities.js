import { Form, FormLabel } from "react-bootstrap"
import { useState, useEffect } from "react"
import axios from "axios";
import './Band.css'
import ErrorPage from "../shared/ErrorPage";
import { useAuth0 } from '@auth0/auth0-react';

import { Table } from "react-bootstrap";

const GetBandResponsibilities = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState();
    const [list, setList] = useState();
    const { getAccessTokenSilently} = useAuth0();
    const [error, setError] = useState();

    useEffect(() => {
        if (!results) {
            const fetchResults = async () => {
                let token;
                try {
                    const options = {
                        audience: 'http://my.api:50001',
                        scope: 'read:secured'
                    }
                    token = await getAccessTokenSilently(options);
                    console.log(token)
                } catch (e) {
                    console.log(e)
                }


                try {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                    const res = await axios.get(`https://my.api:50001/getBandResponsibilities`, config);
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
                const { BandName } = r
                return (BandName.includes(searchTerm) || searchTerm === "");
            }).map((r) => {
                const { BandName, BandLevel, Responsibilities } = r
                return (
                    <tr >
                        <td>{BandName}</td>
                        <td>{BandLevel}</td>
                        <td>{Responsibilities}</td>
                    </tr>
                )

            })
            setList(tempList);
        }
    }, [results, searchTerm]);

    if (error) {
        console.log(error)
        return (<ErrorPage error={error} />)
    } else if (results) {
        return (
            <div>
                <FormLabel
                    label="Search Term"
                    className="searchBar"
                >
                    <Form.Control type="search" placeholder="Search..." onChange={(e) => setSearchTerm(e.target.value)} />
                </FormLabel>
                <div className="emp-table">
                    <Table >
                        <thead>
                            <tr>
                                <th>Band Name</th>
                                <th>Band Level</th>
                                <th>Responsibilities</th>
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
        return <div> Loading data!</div>
    }
}

export default GetBandResponsibilities;
