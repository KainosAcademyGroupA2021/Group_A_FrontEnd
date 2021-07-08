import { Form,  FormLabel, Table } from "react-bootstrap"
import { useState, useEffect } from "react"
import axios from "axios";
import "./Band.css";

const GetTrainingBand = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState();
    const [list, setList] = useState();

   
    useEffect(() => {
        if (!results) {
            async function fetchResults() {
                const res = await axios.get(`http://localhost:5000/getTrainingByBand`);
                setResults(res.data);
            }
            fetchResults();
        } else {
        let tempList = results.filter((r) => {
            const { BandName, TrainingType, TrainingName } = r
            return ( BandName.includes(searchTerm) || TrainingType.includes(searchTerm) || TrainingName.includes(searchTerm) || searchTerm === "");
        }).map((r) => {
            const { BandID, TrainingType, BandName, TrainingName, TrainingLink } = r
            return (
                <tr >
                    <td>{BandID}</td>
                    <td>{TrainingType}</td>
                    <td>{BandName}</td>
                    <td>{TrainingName}</td>
                    <td>{TrainingLink}</td>
                </tr>
            )

        })
        setList(tempList);
    }
    }, [searchTerm, results]);

    return (
        <div>
            <FormLabel
                label="Search Term"
                className="searchBar"
            >
                <Form.Control type="search" placeholder="Search for Band or Training " onChange={(e) => setSearchTerm(e.target.value)} />
            </FormLabel>
            <div className="emp-table">
                <Table >
                    <thead>
                        <tr>
                            <th>BandID</th>
                            <th>Training Type</th>
                            <th>Band Name</th>
                            <th>Training Name</th>
                            <th>Training </th>
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


export default GetTrainingBand;