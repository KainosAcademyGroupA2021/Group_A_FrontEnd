import { Form, Button, FormLabel } from "react-bootstrap"
import { useState, useEffect } from "react"
import axios from "axios";
import './Band.css'

import { Table } from "react-bootstrap";

const GetBandResponsibilities = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState();
    const [list, setList] = useState();


 useEffect(() => {
        if (!results) {
            async function fetchResults() {
                const res = await axios.get(`http://localhost:5000/getBandResponsibilities`);
                console.log(res);
                setResults(res.data);
            }
            fetchResults();
        } else {
            let tempList = results.filter((r) => {
                const { BandID} = r
                return ( BandID == searchTerm || searchTerm === "");
            }).map((r) => {
                const { BandID, BandName, BandLevel, Responsibilities} = r
            return (
                <tr >
                    <td>{BandID}</td>
                    <td>{BandName}</td>
                    <td>{BandLevel}</td>
                    <td>{Responsibilities}</td>
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
                    <Form.Control type="search" placeholder="Search for a band ID" onChange={(e) => setSearchTerm(e.target.value)}/>
                </FormLabel>
            <div className="emp-table">
                <Table >
                    <thead>
                        <tr>
                            <th>Band ID</th>
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
}

export default GetBandResponsibilities;