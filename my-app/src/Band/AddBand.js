import { useState, useEffect } from 'react';
import { Form, Button } from "react-bootstrap";
import './Band.css';
import axios from 'axios';

const AddBand = () => {

    const [competencyData, setCompetencyData] = useState();
    const [trainingData, setTrainingData] = useState();

    const [competencyItems, setCompetencyItems] = useState();
    const [trainingItems, setTrainingItems] = useState();

    const [bandName, setBandName] = useState("");
    const [bandLevel, setBandLevel] = useState("");
    const [competencyID, setCompetencyID] = useState("");
    const [responsibilities, setResponsibilities] = useState("");

    const [validated, setValidated] = useState("false");

    const [bandNameValidationMessage, setBandNameValidationMessage] = useState("");
    const [bandLevelValidationMessage, setBandLevelValidationMessage] = useState("");
    const [competencyValidationMessage, setCompetencyValidationMessage] = useState("");
    const [responsibilitiesValidationMessage, setResponsibilityValidationMessage] = useState("");

    const [trainingSelectorItems, setTrainingSelectorItems] = useState([]);
    const [selectedTrainingItems, setSelectedTrainingItems] = useState([]);

    useEffect(() => {
        if (!competencyData || !trainingData) {
            async function fetchResults() {
                setCompetencyData((await axios.get(`http://localhost:5000/getCompetencies`)).data);
                setTrainingData((await axios.get(`http://localhost:5000/getTrainings`)).data);
            }
            fetchResults();
        } else if (!competencyItems || !trainingItems) {
            console.log(competencyData)
            setCompetencyItems(competencyData.map((competency) => {
                const { CompetenciesID, CompetenciesName } = competency;
                return (
                    <option key={CompetenciesID} value={CompetenciesID}>{CompetenciesName}</option>
                );
            }));

            setTrainingItems(trainingData.map((training) => {
                const { TrainingID, TrainingName } = training;
                return (
                    <option key={TrainingID} value={TrainingID}>{TrainingName}</option>
                );
            }));
        } else {
            setTrainingItems(trainingData.map((training) => {
                const { TrainingID, TrainingName } = training;
                return (
                    <option disabled={selectedTrainingItems.includes(TrainingID)} key={TrainingID} value={TrainingID}>{TrainingName}</option>
                );
            }));
        }
    }, [competencyData, selectedTrainingItems]);


    const addTrainingDropdown = () => {
        if (selectedTrainingItems[selectedTrainingItems.length-1] != -1) {
        setTrainingSelectorItems(trainingSelectorItems => [...trainingSelectorItems, <Form.Group key={trainingSelectorItems.length}>
            <Form.Label>
                Training
            </Form.Label>
            <Form.Control
                as="select"
                type="select"
                name="training"
                onChange={e => {
                    let tempSelectedItems = [...selectedTrainingItems]
                    tempSelectedItems.pop()
                    setSelectedTrainingItems(tempSelectedItems)
                    setSelectedTrainingItems([...selectedTrainingItems, parseInt(e.target.value)])
                }}
            >
                <option value="" >Select training</option>
                {trainingItems}
            </Form.Control>
        </Form.Group>])
        setSelectedTrainingItems([...selectedTrainingItems, -1])
            } else {

            }
    }

    const deleteTrainingDropdown = () => {
        let tempSelectedItems = [...selectedTrainingItems]
        tempSelectedItems.pop()
        setSelectedTrainingItems(tempSelectedItems)

        let tempSelectorItems = [...trainingSelectorItems]
        tempSelectorItems.pop();
        setTrainingSelectorItems(tempSelectorItems)
    }


    const handleSubmit = (e) => {
        console.log(selectedTrainingItems)
        bandName === "" ? setBandNameValidationMessage("You must enter a name!") : setBandNameValidationMessage("");
        bandLevel === "" ||  !/^-?[\d.]+(?:e-?\d+)?$/.test(bandLevel) ? setBandLevelValidationMessage("You must enter a valid band level!") : setBandLevelValidationMessage("");
        competencyID === "" ? setCompetencyValidationMessage("You must select a competency") : setCompetencyValidationMessage("");
        responsibilities === "" ? setResponsibilityValidationMessage("You must enter a responsibility") : setResponsibilityValidationMessage("");

        if (bandName === "" || bandLevel === "" ||  !/^-?[\d.]+(?:e-?\d+)?$/.test(bandLevel) || competencyID === "" || responsibilities === "") {
            e.preventDefault();
            console.log("error")
        } else {
            console.log("sent thing")
            axios.post('http://localhost:5000/addBand', {
                BandName: bandName,
                BandLevel: bandLevel,
                CompetencyID: competencyID,
                Responsibilities: responsibilities,
                TrainingsList: selectedTrainingItems
            })
                .then(function (response) {
                    console.log(response);
                    window.location.href = '/Band/GetBandResponsibilities';
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        e.preventDefault();
        setValidated("true");
    }

    return (
        <div className="AddBandContainer">
            <h1>Add a band</h1>
            <br />
            <Form onSubmit={handleSubmit} validiated={validated}>
                <Form.Group controlId="formAddBandName">
                    <Form.Label>Band Name</Form.Label>
                    <Form.Control isInvalid={bandNameValidationMessage !== ""} type="bandName" placeholder="Enter band name" value={bandName} onChange={(e) => setBandName(e.target.value)} />
                    <Form.Control.Feedback type="invalid">{bandNameValidationMessage}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formAddBandLevel">
                    <Form.Label>Band Level</Form.Label>
                    <Form.Control isInvalid={bandLevelValidationMessage !== ""} type="bandLevel" placeholder="Enter the band level" value={bandLevel} onChange={(e) => setBandLevel(e.target.value)} />
                    <Form.Control.Feedback type="invalid">{bandLevelValidationMessage}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label>
                        Competency
            </Form.Label>
                    <Form.Control
                        as="select"
                        type="select"
                        name="competency"
                        isInvalid={competencyValidationMessage !== ""}
                        onChange={e => {
                            console.log(e.target.value)
                            setCompetencyID(e.target.value);
                        }}
                    >
                        <option value="" >Select the competency</option>
                        {competencyItems}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        {competencyValidationMessage}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formResponsibilities">
                    <Form.Label>Responsibilities</Form.Label>
                    <Form.Control isInvalid={responsibilitiesValidationMessage !== ""} type="responsibilities" placeholder="Enter the responsibilities for this band" value={responsibilities} onChange={(e) => setResponsibilities(e.target.value)} />
                    <Form.Control.Feedback type="invalid">{responsibilitiesValidationMessage}</Form.Control.Feedback>
                </Form.Group>


                {trainingSelectorItems}
                <Button variant="primary" disabled={selectedTrainingItems[selectedTrainingItems.length-1] == -1} onClick={() => addTrainingDropdown()} >
                    Add a training
                </Button>
                {trainingSelectorItems.length > 0 ?
                    <Button variant="danger" className="ml-3" onClick={() => deleteTrainingDropdown()} >
                        Delete a training
                </Button> : ""}
                <br />



                <br />
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default AddBand;