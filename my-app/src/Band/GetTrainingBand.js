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
                console.log(res);
                setResults(res.data);
            }
            fetchResults();
        } else {
        let tempList = results.filter((r) => {
            const { BandName, TrainingType, TrainingName, BandLevel } = r
            const bandLev = String(BandLevel)
            console.log(bandLev)
            return ( BandName.includes(searchTerm) || TrainingType.includes(searchTerm) || bandLev.includes(searchTerm) || TrainingName.includes(searchTerm) ||searchTerm === "");
        }).map((r) => {
            const { BandID, BandLevel,  BandName, TrainingType, TrainingName, TrainingLink } = r
            return (
                <tr >
                    <td>{BandID}</td>
                    <td>{BandLevel}</td>
                    <td>{TrainingType}</td>
                    <td>{BandName}</td>
                    <td>{TrainingName}</td>
                    <td><a href = {TrainingLink}>Link to trainig</a></td>
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
                            <th>Minimum BandLevel</th>
                            <th>Training Type</th>
                            <th>Band Name</th>
                            <th>Training Name</th>
                            <th>Training Link </th>
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