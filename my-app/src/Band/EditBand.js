import { useState, useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button } from "react-bootstrap";
import './Band.css';
import axios from 'axios';

const EditBand = () => {
    let { id } = useParams();

    const BAND_NAME_ERROR_MESSAGE = "Enter a band name!";
    const BAND_LEVEL_TAKEN_ERROR_MESSAGE = "This band level is taken!";
    const BAND_LEVEL_EMPTY_ERROR_MESSAGE = "Enter a band level!";
    const RESPONSIBILITIES_ERROR_MESSAGE = "Enter the responsibilities of the";

    const initialState = {
        competencyData: [],
        trainingData: [],
        takenBandLevels: [],
        previousData: {},
        loadedData: false,
        bandName: "",
        bandLevel: "",
        responsibilityText: "",
        bandNameError: false,
        bandLevelError: false,
        bandLevelTakenError: false,
        competencyError: false,
        responsibilityError: false,
        competencySelectorDropdowns: [],
        trainingSelectorDropdowns: [],
        selectedCompetencies: [],
        selectedTrainings: []
    }

    function reducer(state, action) {
        console.log(action.type);
        switch (action.type) {
            case 'LOAD_COMPETENCY_DATA':
                return { ...state, competencyData: action.data };
            case 'LOAD_TRAINING_DATA':
                return { ...state, trainingData: action.data };
            case 'LOAD_TAKEN_BAND_LEVELS':
                let takenBandLevels = action.data.filter((item) => {
                    return item.BandLevel !== state.bandLevel;
                }).map((item) => {
                    return item.BandLevel;
                });
                return { ...state, takenBandLevels: takenBandLevels };
            case 'LOAD_PREVIOUS_BAND_DATA':
                return { ...state, bandName: action.data.BandName, bandLevel: action.data.BandLevel, responsibilityText: action.data.Responsibilities };
            case 'LOAD_PREVIOUS_SELECTED_TRAINING_DATA':
                let previousSelectedTraining = action.data.map((item) => {
                    return item.TrainingID;
                });
                let previousTrainingSelectorDropdowns = action.data.map((item, i) => {
                    return i;
                });
                console.log(action.data)
                return { ...state, selectedTrainings: previousSelectedTraining, trainingSelectorDropdowns: previousTrainingSelectorDropdowns };
            case 'LOAD_PREVIOUS_SELECTED_COMPETENCIES_DATA':
                let previousSelectedCompetencies = action.data.map((item) => {
                    return item.CompetenciesID;
                });
                let previousCompetencySelectorDropdowns = action.data.map((item, i) => {
                    return i;
                });
                console.log(action.data)
                return { ...state, selectedCompetencies: previousSelectedCompetencies, competencySelectorDropdowns: previousCompetencySelectorDropdowns };
            case 'TOGGLE_LOADED_DATA':
                return { ...state, loadedData: !state.loadedData };
            case 'SET_BAND_NAME':
                return { ...state, bandName: action.data };
            case 'SET_BAND_LEVEL':
                if (/^\d+$/.test(action.data) || action.data === "") {
                    if (state.takenBandLevels.includes(parseInt(action.data))) {
                        return { ...state, bandLevel: action.data, bandLevelTakenError: true }
                    } else {
                        return { ...state, bandLevel: action.data, bandLevelTakenError: false };
                    }
                }
                return state;
            case 'SET_RESPONSIBILITY_TEXT':
                return { ...state, responsibilityText: action.data };
            case 'SET_BAND_NAME_ERROR_FLAG':
                return { ...state, bandNameError: action.data };
            case 'SET_BAND_LEVEL_ERROR_FLAG':
                return { ...state, bandLevelError: action.data };
            case 'SET_RESPONSIBILITY_ERROR_FLAG':
                return { ...state, responsibilityError: action.data };
            case 'SET_COMPETENCY_ERROR_FLAG':
                return { ...state, competencyError: action.data };
            case 'ADD_COMPETENCY_SELECTOR':
                return { ...state, competencySelectorDropdowns: [...state.competencySelectorDropdowns, state.competencySelectorDropdowns.length] };
            case 'ADD_TRAINING_SELECTOR':
                return { ...state, trainingSelectorDropdowns: [...state.trainingSelectorDropdowns, state.trainingSelectorDropdowns.length] };
            case 'DELETE_COMPETENCY_SELECTOR':
                return { ...state, competencySelectorDropdowns: [...state.competencySelectorDropdowns.slice(0, -1)], selectedCompetencies: [...state.selectedCompetencies.slice(0, -1)] };
            case 'DELETE_TRAINING_SELECTOR':
                return { ...state, trainingSelectorDropdowns: [...state.trainingSelectorDropdowns.slice(0, -1)], selectedTrainings: [...state.selectedTrainings.slice(0, -1)] };
            case 'SELECT_COMPETENCY':
                let tempSelectedCompetencies = [...state.selectedCompetencies];
                tempSelectedCompetencies[action.selectorID] = parseInt(action.competenciesID);
                return { ...state, selectedCompetencies: tempSelectedCompetencies };
            case 'SELECT_TRAINING':
                let tempSelectedTraining = [...state.selectedTrainings];
                tempSelectedTraining[action.selectorID] = parseInt(action.trainingID);
                return { ...state, selectedTrainings: tempSelectedTraining };
            default:
                console.log("DISPATCH TYPE " + action.type + " NOT FOUND")
                throw new Error();
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (!state.loadedData) {
            async function fetchData() {
                dispatch({ type: 'LOAD_COMPETENCY_DATA', data: (await axios.get(`http://localhost:5000/getCompetencies`)).data });
                dispatch({ type: 'LOAD_TRAINING_DATA', data: (await axios.get(`http://localhost:5000/getTrainings`)).data });
                dispatch({ type: 'LOAD_PREVIOUS_BAND_DATA', data: (await axios.get(`http://localhost:5000/getBand/` + id)).data[0] });
                dispatch({ type: 'LOAD_PREVIOUS_SELECTED_COMPETENCIES_DATA', data: (await axios.get(`http://localhost:5000/getAssociatedCompetenciesIDsWithBand/` + id)).data });
                dispatch({ type: 'LOAD_PREVIOUS_SELECTED_TRAINING_DATA', data: (await axios.get(`http://localhost:5000/getAssociatedTrainingIDsWithBand/` + id)).data });
                dispatch({ type: 'LOAD_TAKEN_BAND_LEVELS', data: (await axios.get(`http://localhost:5000/getTakenBandLevels`)).data });
                dispatch({ type: 'TOGGLE_LOADED_DATA' });
            }
            fetchData();
        }
    }, [state.loadedData]);


    const addTrainingDropdown = () => {
        dispatch({ type: 'ADD_TRAINING_SELECTOR', data: <TrainingSelector key={state.trainingSelectorDropdowns.length} index={state.trainingSelectorDropdowns.length} state={state} dispatch={dispatch} /> })
    }

    const addCompetencyDropdown = () => {
        dispatch({ type: 'ADD_COMPETENCY_SELECTOR', data: <CompetencySelector key={state.competencySelectorDropdowns.length} index={state.competencySelectorDropdowns.length} state={state} dispatch={dispatch} /> })
    }

    const handleSubmit = (e) => {
        console.log(state)

        dispatch({ type: "SET_BAND_NAME_ERROR_FLAG", data: (state.bandName === "") })
        dispatch({ type: "SET_BAND_LEVEL_ERROR_FLAG", data: (state.bandLevel === "" || !/^-?[\d.]+(?:e-?\d+)?$/.test(state.bandLevel)) })
        dispatch({ type: "SET_COMPETENCY_ERROR_FLAG", data: (state.responsibilityText === "") })


        if (state.bandName === "" || state.bandLevel === "" || !/^-?[\d.]+(?:e-?\d+)?$/.test(state.bandLevel) || state.competencyID === "" || state.responsibilityText === "") {
            e.preventDefault();
            console.log("error")
        } else {
            axios.put('http://localhost:5000/editBand/' + id, {
                BandName: state.bandName,
                BandLevel: state.bandLevel,
                Responsibilities: state.responsibilityText,
                CompetenciesList: state.selectedCompetencies,
                TrainingsList: state.selectedTrainings
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
    }

    return (
        <div className="AddBandContainer">
            <h1>Edit a band</h1>
            <br />
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formAddBandName">
                    <Form.Label>Band Name</Form.Label>
                    <Form.Control isInvalid={state.bandNameError} type="bandName" placeholder="Enter band name" value={state.bandName} onChange={(e) => dispatch({ type: 'SET_BAND_NAME', data: e.target.value })} />
                    <Form.Control.Feedback type="invalid">{BAND_NAME_ERROR_MESSAGE}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formAddBandLevel">
                    <Form.Label>Band Level</Form.Label>
                    <Form.Control isInvalid={state.bandLevelError || state.bandLevelTakenError} type="bandLevel" placeholder="Enter the band level" value={state.bandLevel} onChange={(e) => dispatch({ type: 'SET_BAND_LEVEL', data: e.target.value })} />
                    <Form.Control.Feedback type="invalid">{state.bandLevelTakenError ? BAND_LEVEL_TAKEN_ERROR_MESSAGE : BAND_LEVEL_EMPTY_ERROR_MESSAGE}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formResponsibilities">
                    <Form.Label>Responsibilities</Form.Label>
                    <Form.Control as="textarea" rows={3} isInvalid={state.responsibilityError} type="responsibilities" placeholder="Enter the responsibilities for this band" value={state.responsibilityText} onChange={(e) => dispatch({ type: 'SET_RESPONSIBILITY_TEXT', data: e.target.value })} />
                    <Form.Control.Feedback type="invalid">{RESPONSIBILITIES_ERROR_MESSAGE}</Form.Control.Feedback>
                </Form.Group>

                {state.competencySelectorDropdowns.map((id) => {
                    return (<CompetencySelector key={id} index={id} state={state} dispatch={dispatch} />)
                })}
                <Button variant="primary" disabled={state.competencySelectorDropdowns.length > state.selectedCompetencies.length} onClick={() => addCompetencyDropdown()} >
                    Add a competency
                </Button>
                {state.competencySelectorDropdowns.length > 0 ?
                    <Button variant="danger" className="ml-3" onClick={() => dispatch({ type: 'DELETE_COMPETENCY_SELECTOR' })} >
                        Delete a competency
                </Button> : ""}
                <br />
                <br />

                {state.trainingSelectorDropdowns.map((id) => {
                    return (<TrainingSelector key={id} index={id} state={state} dispatch={dispatch} />)
                })}
                <Button variant="primary" disabled={state.trainingSelectorDropdowns.length > state.selectedTrainings.length} onClick={() => addTrainingDropdown()} >
                    Add a training
                </Button>
                {state.trainingSelectorDropdowns.length > 0 ?
                    <Button variant="danger" className="ml-3" onClick={() => dispatch({ type: 'DELETE_TRAINING_SELECTOR' })} >
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

const TrainingSelector = ({ index, state, dispatch, defaultValue }) => {
    const [trainingItems, setTrainingItems] = useState();

    useEffect(() => {
        let tempItems = state.trainingData.map((item) => {
            return <option disabled={state.selectedTrainings.includes(item.TrainingID)} key={item.TrainingID} value={item.TrainingID}>{item.TrainingName}</option>
        });
        setTrainingItems(tempItems);
    }, [state.selectedTrainings])

    return (
        <Form.Group>
            <Form.Label>
                Training {index + 1}
            </Form.Label>
            <Form.Control
                as="select"
                type="select"
                name="training"
                value={state.selectedTrainings[index]}
                onChange={e => {
                    dispatch({ type: 'SELECT_TRAINING', selectorID: index, trainingID: e.target.value })
                }}
            >?.
                <option value="" >Select training</option>
                {trainingItems}
            </Form.Control>
        </Form.Group>)
}

const CompetencySelector = ({ index, state, dispatch, defaultValue }) => {
    const [competencyItems, setCompetencyItems] = useState();

    useEffect(() => {
        console.log(state.competencyData)
        let tempItems = state.competencyData.map((item) => {
            return <option disabled={state.selectedCompetencies.includes(item.CompetenciesID)} key={item.CompetenciesID} value={item.CompetenciesID}>{item.CompetenciesName}</option>
        });
        setCompetencyItems(tempItems);
    }, [state.selectedCompetencies])

    return (
        <Form.Group>
            <Form.Label>
                Competency {index + 1}
            </Form.Label>
            <Form.Control
                as="select"
                type="select"
                name="competency"
                value={state.selectedCompetencies[index]}
                onChange={e => {
                    dispatch({ type: 'SELECT_COMPETENCY', selectorID: index, competenciesID: e.target.value })
                }}
            >?.
                <option value="" >Select competency</option>
                {competencyItems}
            </Form.Control>
        </Form.Group>)
}

export default EditBand;