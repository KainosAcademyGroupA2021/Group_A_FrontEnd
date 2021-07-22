import { useState, useEffect } from "react"
import axios from "axios";
import './Capability.css'
import ErrorPage from "../shared/ErrorPage";
import EmpTable from "../shared/EmpTable"
import { useAuth0 } from '@auth0/auth0-react';

const CapabilityLead = () => {
    const [CapabilityName, setCapabilityName] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const { getAccessTokenSilently} = useAuth0();
    const [results, setResults] = useState();
    const [error, setError] = useState();
    const [list, setList] = useState();
    const columns = ["Job Family Name", "Capability Lead Name", "Capability Lead Photo", "Capability Lead Message"]

    useEffect(() => {
        if (!results) {
        const fetchResults = async (e) => {
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
                const res = await axios.get(`https://my.api:50001/getCapabilityLeads`, options)
                console.log(res)
      
                setCapabilityName(res.data);
                setResults(res.data)

            } catch (error) {
                if (error.response.status === 403 || error.response.status === 401 || error.response.status === 500 ) {
                    setError(error.response.status);

                }

            }
        }
        fetchResults();
    }else {
        const list = CapabilityName.filter((r) => {
            const { CapabilityName, CapabilityLeadName, CapabilityLeadMessage } = r
            return (CapabilityName.toLowerCase().includes(searchTerm.toLowerCase()) || CapabilityLeadName.toLowerCase().includes(searchTerm.toLowerCase()) || CapabilityLeadMessage.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm == "")
        }).map((r) => {
            const { CapabilityID, CapabilityName, CapabilityLeadName, CapabilityLeadPhoto, CapabilityLeadMessage } = r
            return (
                <tr key={CapabilityID}>
                    <td>{CapabilityName}</td>
                    <td>{CapabilityLeadName}</td>
                    <td><img src={CapabilityLeadPhoto}/></td>
                    <td>{CapabilityLeadMessage}/</td>
                </tr>
            )
           
        })
        setList(list)
    }
    }, [results, searchTerm])

   

    if (error) {
        return (<ErrorPage error={error} />)
    } else if (results) {
        return <EmpTable list={list} setSearchTerm={setSearchTerm} columns={columns} />
    } else {
        return <div></div>
    }
}




export default CapabilityLead;
