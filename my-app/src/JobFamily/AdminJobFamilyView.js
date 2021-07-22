import { Form, Button, FormLabel } from "react-bootstrap"
import { useState, useEffect } from "react"
import axios from "axios";
import './JobFamily.css'
import { Link } from "react-router-dom";
import ErrorPage from "../shared/ErrorPage";
import { useAuth0 } from '@auth0/auth0-react';
import { Table } from "react-bootstrap";

const AdminJobFamilyView = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState();
    const [list, setList] = useState();
    const { getAccessTokenSilently, user } = useAuth0();
    const [error, setError] = useState();
    const [token, setToken] = useState();

    useEffect(() => {
        if (!results) {
            async function fetchResults() {
                const options = {
                    audience: 'http://my.api:50001',
                    scope: 'read:secured write:secured'
                }
                const accessToken = await getAccessTokenSilently(options);
                console.log(accessToken)
                setToken(accessToken);
                try {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        }
                    }
                const res = await axios.get(`https://my.api:50001/getJobFamilies`, config);
                setResults(res.data);
            }  catch (error) {
                if (error.response.status === 403 || error.response.status === 401 || error.response.status === 500 ) {
                    setError(error.response.status);

                }

            }
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
                    <td><AdminButtons JobFamilyID={JobFamilyID} token={token}/></td>
                </tr>
            )

            })
            setList(tempList);
        }
    }, [results, searchTerm]);

    

    if(error) {
        return <ErrorPage error={error} />
    } else if(results) {
        return <div>
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
    } else {
        return <div></div>
    }
    
}

const AdminButtons = (props) => {
    return (
        <div>
        <Button variant="warning" className="mr-3"><Link className="linkButton" to={"/jobfamily/editJobFamily/"+props.JobFamilyID}>Edit</Link></Button>
        <Button variant="danger" onClick={() => handleDeleteJobFamily(props.JobFamilyID, props.token)}>Delete</Button>
        </div>
    );
}
//


const handleDeleteJobFamily = (id, token) => {
    let confirmed =  window.confirm("Are you sure you want to delete this job family?");
    if (confirmed) {
        console.log("Deleting job family with id: " + id);
        
        const options = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        axios.post('https://my.api:50001/deleteJobFamily', {
            JobFamilyID: id
          }, options)
          .then(function (response) {
            console.log(response);
            if (response.data !== "success") {
                alert("Unable to delete this job family. Ensure all roles under this job family have been deleted first.")
            } else {
                window.location.reload()
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }
}



export default AdminJobFamilyView;
