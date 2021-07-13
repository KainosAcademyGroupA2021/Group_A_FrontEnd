import { Form, Button, FormLabel } from "react-bootstrap"
import { useState, useEffect } from "react"
import axios from "axios";
import './Band.css'
import { Link } from "react-router-dom";

import { Table } from "react-bootstrap";

const AdminBandView = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState();
    const [list, setList] = useState();


    useEffect(() => {
        if (!results) {
            async function fetchResults() {
                const res = await axios.get(`http://localhost:5000/getBands`);
                setResults(res.data);
            }
            fetchResults();
        } else {
            let tempList = results.filter((r) => {
                const { BandID, BandName, BandLevel, Responsibilities} = r
                return (BandName.toLowerCase().includes(searchTerm.toLowerCase()) || BandLevel == searchTerm || searchTerm === "");
            }).map((r) => {
                const { BandID, BandName, BandLevel } = r
            return (
                <tr >
                    <td>{BandName}</td>
                    <td>{BandLevel}</td>
                    <td><AdminButtons bandID={BandID}/></td>
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
                    <Form.Control type="search" placeholder="Search for a band name or band level" onChange={(e) => setSearchTerm(e.target.value)}/>
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
    )
}

const AdminButtons = (props) => {
    return (
        <div>
        <Button variant="warning" className="mr-3"><Link className="linkButton" to={"/band/editBand/"+props.bandID}>Edit</Link></Button>
        <Button variant="danger" onClick={() => handleDeleteBand(props.bandID)}>Delete</Button>
        </div>
    );
}


const handleDeleteBand = (id) => {
    let confirmed =  window.confirm("Are you sure you want to delete this band?");
    if (confirmed) {
        console.log("Deleting band with id: " + id);
        axios.post('http://localhost:5000/deleteBand', {
            BandID: id
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

export default AdminBandView;
