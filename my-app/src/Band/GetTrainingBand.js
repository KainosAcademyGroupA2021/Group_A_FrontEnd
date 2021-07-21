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
                })

                let groupedDict = {}
                
                for (let item of tempList) {
                    const {  BandLevel, BandName, TrainingType, TrainingName, TrainingLink } = item
                    if (groupedDict[TrainingName]) {
                        groupedDict[TrainingName] = {...groupedDict[TrainingName], bandNames: groupedDict[TrainingName].bandNames + ", " + BandName, bandLevels: groupedDict[TrainingName].bandLevels + ", " + BandLevel}
                    } else {
                        groupedDict[TrainingName] = { bandNames: BandName, bandLevels: BandLevel, TrainingType: TrainingType, TrainingLink: TrainingLink}
                    }
                    console.log(item)
                }

                let tempItems = Object.entries(groupedDict).map((r) => {
                    console.log(r)
                    const {  bandLevels, bandNames, TrainingType, TrainingLink } = r[1]
                    return (
                        <tr >
                            <td>{bandLevels}</td>
                            <td>{TrainingType}</td>
                            <td>{bandNames}</td>
                            <td>{r[0]}</td>
                            <td><a href={TrainingLink}>Link to training</a></td>
                        </tr>
                    )

                })
                setList(tempItems);
            }
        }, [searchTerm, results]);
    } catch (e) {
        console.log(e)
    }


    if (error) {
        return <ErrorPage error={error} />
    } else if (results) {
        return <EmpTable list={list} setSearchTerm={setSearchTerm} columns={columns} />
    } else {
        return <div></div>
    }
    
}


export default GetTrainingBand;