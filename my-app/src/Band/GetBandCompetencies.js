import { Form, Button, FormLabel } from "react-bootstrap"
import { useState, useEffect } from "react"
import axios from "axios";
import './Band.css'

import { Table } from "react-bootstrap";

const GetBandCompetencies = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState();
    const [list, setList] = useState();


    useEffect(() => {
        if (!results) {
            async function fetchResults() {
                const res = await axios.get(`https://my.api:50001/getBandCompetencies`);
                setResults(res.data);
            }
            fetchResults();
        } else {
            
            let tempList = results.filter((r) => {
                const { BandName, BandLevel, CompetenciesName} = r
                
                return (BandName.includes(searchTerm) || CompetenciesName.includes(searchTerm) || searchTerm === "");
            }).map((r) => {
                
                const { BandName, BandLevel, CompetenciesName} = r
                //let CompetenciesSplit = CompetenciesName.replace(',', '\n');
            return (
                <tr >
                    <td>{BandName}</td>
                    <td>{BandLevel}</td>
                    <td>{CompetenciesName}</td>
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
                    <Form.Control type="search" placeholder="Search for a band name or competency" onChange={(e) => setSearchTerm(e.target.value)}/>
                </FormLabel>
            <div className="emp-table">
                <Table >
                    <thead>
                        <tr>
                            <th>Band Name</th>
                            <th>Band Level</th>
                            <th>Competencies</th>
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

export default GetBandCompetencies;