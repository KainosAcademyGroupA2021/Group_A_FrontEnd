import { Form, Button, FormLabel } from "react-bootstrap"
import { useState, useEffect } from "react"
import axios from "axios";
import './JobFamily.css'
import { Link } from "react-router-dom";

import { Table } from "react-bootstrap";

const AdminJobFamilyView = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState();
    const [list, setList] = useState();


    useEffect(() => {
        if (!results) {
            async function fetchResults() {
                const res = await axios.get(`https://my.api:50001/getJobFamilies`);
                setResults(res.data);
            }
            fetchResults();
        } else {
            let tempList = results.filter((r) => {
                const { JobFamilyName, CapabilityName } = r
                return (JobFamilyName.toLowerCase().includes(searchTerm.toLowerCase()) || CapabilityName.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === "");
            }).map((r) => {
                const { JobFamilyID, JobFamilyName, CapabilityName } = r
            return (
                <tr key={JobFamilyID}>
                    <td>{JobFamilyName}</td>
                    <td>{CapabilityName}</td>
                    <td><AdminButtons JobFamilyID={JobFamilyID}/></td>
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
                    <Form.Control type="search" placeholder="Search for a job family or capability" onChange={(e) => setSearchTerm(e.target.value)}/>
                </FormLabel>
            <div className="emp-table">
                <Table >
                    <thead>
                        <tr>
                            <th>Job Family Name</th>
                            <th>Capability Name</th>
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
        <Button variant="warning" className="mr-3"><Link className="linkButton" to={"/jobfamily/editJobFamily/"+props.JobFamilyID}>Edit</Link></Button>
        <Button variant="danger" onClick={() => handleDeleteJobFamily(props.JobFamilyID)}>Delete</Button>
        </div>
    );
}


const handleDeleteJobFamily = (id) => {
    /*let confirmed =  window.confirm("Are you sure you want to delete this band?");
    if (confirmed) {
        console.log("Deleting band with id: " + id);
        axios.post('https://my.api:50001/deleteBand', {
            BandID: id
          })
          .then(function (response) {
            console.log(response);
            if (response.data !== "success") {
                alert("Unable to delete this band. Ensure all roles under this band have been deleted first.")
            } else {
                window.location.reload()
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }*/
}

export default AdminJobFamilyView;
