import { Form, FormLabel, Table } from "react-bootstrap"
import { useState, useEffect } from "react"
import { useAuth0 } from '@auth0/auth0-react';
import axios from "axios";
import "./Band.css";
import ErrorPage from "../shared/ErrorPage";
import EmpTable from "../shared/EmpTable"


const GetTrainingBand = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState();
    const [list, setList] = useState();
    const { getAccessTokenSilently, user } = useAuth0();
    const [error, setError] = useState();
    const columns = ["Band Level", "Training Type", "Band Name", "Training Name", "Training Link"]

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
                        const res = await axios.get(`https://my.api:50001/getTrainingByBand`, options);
                        console.log(res);
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
                    const { BandName, TrainingType, TrainingName, BandLevel} = r
                    const bandLev = String(BandLevel)
                    return (BandName.includes(searchTerm) || TrainingType.includes(searchTerm) || bandLev.includes(searchTerm) || TrainingName.includes(searchTerm) || searchTerm === "");
                }).map((r) => {
                    const {  BandLevel, BandName, TrainingType, TrainingName, TrainingLink } = r
                    return (
                        <tr >
                            <td>{BandLevel}</td>
                            <td>{TrainingType}</td>
                            <td>{BandName}</td>
                            <td>{TrainingName}</td>
                            <td><a href={TrainingLink}>Link to training</a></td>
                        </tr>
                    )

                })
                setList(tempList);
            }
        }, [searchTerm, results]);
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


export default GetTrainingBand;