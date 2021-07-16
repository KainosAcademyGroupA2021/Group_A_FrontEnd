
import { useState, useEffect } from "react"
import { useAuth0 } from '@auth0/auth0-react';
import axios from "axios";
import './Role.css'
import { Table } from "react-bootstrap";
import ErrorPage from "../shared/ErrorPage";
import EmpTable from "../shared/EmpTable";

const GetJobRoles = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState();
    const [list, setList] = useState();
    const { getAccessTokenSilently, user } = useAuth0();
    const [error, setError] = useState();
    
    const columns = ["Role Name", "Role Spec", "Role Spec Summary", "Capabilty name", "Band Name", "Band Level" ];

    try {
        useEffect(() => {
            if (!results) {
                const fetchResults = async () => {
                    const options = {
                        audience: 'http://my.api:50001',
                        scope: 'read:secured'
                    }
                    const token = await getAccessTokenSilently(options);
                    console.log(token)


                    try {
                        const options = {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            }
                        }
                        const res = await axios.get(`https://my.api:50001/getJobRoles`, options);
                        console.log(res.data);
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
                    const { RoleName, CapabilityName, BandName } = r
                    return (RoleName.includes(searchTerm) || CapabilityName.includes(searchTerm) || BandName.includes(searchTerm) || searchTerm === "");
                }).map((r) => {
                    const { RoleID, RoleName, RoleSpec, RoleSpecSummary, CapabilityName, BandName, BandLevel } = r
                    return (
                        <tr key={RoleID}>
                            <td>{RoleName}</td>
                            <td><a href={RoleSpec}>Link to job spec</a></td>
                            <td>{RoleSpecSummary}</td>
                            <td>{CapabilityName}</td>
                            <td>{BandName}</td>
                            <td>{BandLevel}</td>
                        </tr>
                    )
                })

                setList(tempList);
            }

        }, [results, searchTerm]);

    } catch (e) {
        console.log(e)
    }

    let data = null;
    const renderData = async () => {
        if (error) {
            data = <ErrorPage error={error} />
        } else {
            data = <EmpTable list={list}  setSearchTerm={setSearchTerm}  columns={columns} />

        }
    }
    renderData();
    return (
        <div>{data}</div>
    )

}

export default GetJobRoles;
