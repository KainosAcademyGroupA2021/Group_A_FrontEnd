
import { useState, useEffect } from "react"
import { useAuth0 } from '@auth0/auth0-react';
import axios from "axios";
import './Role.css'
import ErrorPage from "../shared/ErrorPage";
import EmpTable from "../shared/EmpTable";

const GetJobRoles = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState();
    const [list, setList] = useState();
    const { getAccessTokenSilently, user } = useAuth0();
    const [error, setError] = useState();

    const columns = ["Role Name", "Role Spec", "Role Spec Summary", "Capabilty name", "Band Name", "Band Level"];


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
                    if (error.response.status === 403 || error.response.status === 401 || error.response.status === 500) {
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


    if (error) {
        return <ErrorPage error={error} />
    } else if (results) {
        return <EmpTable list={list} setSearchTerm={setSearchTerm} columns={columns} />
    } else {
        return <div></div>
    }
}







export default GetJobRoles;
