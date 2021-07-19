import { useState, useEffect } from "react"
import axios from "axios";
import './Capability.css'
import ErrorPage from "../shared/ErrorPage";
import EmpTable from "../shared/EmpTable";
import { useAuth0 } from '@auth0/auth0-react';


const CapabilityPerJobFamily = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState();
    const [list, setList] = useState();
    const { getAccessTokenSilently, user } = useAuth0();
    const [error, setError] = useState();

    const columns = ["Job Family Name", "Capability Name"];


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
                    const res = await axios.get('https://my.api:50001/getCapabilityAndJobFamily', options);
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
                const { JobFamilyName, CapabilityName } = r
                return (JobFamilyName.includes(searchTerm) || CapabilityName.includes(searchTerm) || searchTerm === "");
            }).map((r) => {
                const { CapabilityID, CapabilityName, JobFamilyName } = r
                return (
                    <tr key={CapabilityID}>
                        <td>{JobFamilyName}</td>
                        <td>{CapabilityName}</td>
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

export default CapabilityPerJobFamily;
