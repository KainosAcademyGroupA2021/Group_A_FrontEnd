import { useState, useEffect, useReducer } from 'react';
import { Form, Button } from "react-bootstrap";
import './Band.css';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import ErrorPage from '../shared/ErrorPage';

const AddBand = () => {

    const BAND_NAME_ERROR_MESSAGE = "Enter a band name!";
    const BAND_LEVEL_TAKEN_ERROR_MESSAGE = "This band level is taken!";
    const BAND_LEVEL_EMPTY_ERROR_MESSAGE = "Enter a band level!";
    const RESPONSIBILITIES_ERROR_MESSAGE = "Enter the responsibilities of the band";

    const initialState = {
        loadedData: false,
        bandName: "",
        bandLevel: "",
        responsibilityText: "",
        bandNameError: false,
        bandLevelError: false,
        bandLevelTakenError: false,
        competencyError: false,
        responsibilityError: false
    }

    function reducer(state, action) {
        console.log(action.type)
        switch (action.type) {
            case 'LOAD_COMPETENCY_DATA':
                return { ...state, competencyData: action.data };
            case 'LOAD_TRAINING_DATA':
                return { ...state, trainingData: action.data };
            case 'LOAD_TAKEN_BAND_LEVELS':
                let takenBandLevels = action.data.map((item) => {
                    return item.BandLevel;
                });
                return { ...state, takenBandLevels: takenBandLevels };
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
                return { ...state, competencySelectorDropdowns: [...state.competencySelectorDropdowns, state.competencySelectorDropdowns.length] }
            case 'ADD_TRAINING_SELECTOR':
                return { ...state, trainingSelectorDropdowns: [...state.trainingSelectorDropdowns, state.trainingSelectorDropdowns.length] }
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

    const { getAccessTokenSilently, user } = useAuth0();
    const [error, setError] = useState();
    const [token, setToken] = useState();

    useEffect(() => {
        if (!state.loadedData) {
            async function fetchData() {
                const options = {
                    audience: 'http://my.api:50001',
                    scope: 'read:secured write:secured'
                }
                const accessToken = await getAccessTokenSilently(options);
                setToken(accessToken);

                try {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        }
                    }
                    dispatch({ type: 'LOAD_COMPETENCY_DATA', data: (await axios.get(`https://my.api:50001/getCompetencies`, config)).data });
                    dispatch({ type: 'LOAD_TRAINING_DATA', data: (await axios.get(`https://my.api:50001/getTrainings`, config)).data });
                    dispatch({ type: 'LOAD_TAKEN_BAND_LEVELS', data: (await axios.get(`https://my.api:50001/getTakenBandLevels`, config)).data });
                    dispatch({ type: 'TOGGLE_LOADED_DATA' });
                } catch (error) {
                    if (error.response.status === 403 || error.response.status === 401) {
                        setError(error.response.status);
                    }

                }
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
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` + token,
            }
        };

        dispatch({ type: "SET_BAND_NAME_ERROR_FLAG", data: (state.bandName === "") })
        dispatch({ type: "SET_BAND_LEVEL_ERROR_FLAG", data: (state.bandLevel === "" || !/^-?[\d.]+(?:e-?\d+)?$/.test(state.bandLevel)) })
        dispatch({ type: "SET_RESPONSIBILITY_ERROR_FLAG", data: (state.responsibilityText === "") })


        if (state.bandName === "" || state.bandLevel === "" || !/^-?[\d.]+(?:e-?\d+)?$/.test(state.bandLevel) || state.competencyID === "" || state.responsibilityText === "") {
            e.preventDefault();
            console.log("error")
        } else {
            axios.post('https://my.api:50001/addBand', {
                BandName: state.bandName,
                BandLevel: state.bandLevel,
                Responsibilities: state.responsibilityText,
                CompetenciesList: state.selectedCompetencies,
                TrainingsList: state.selectedTrainings
            }, config)
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

    if (error) {
        return (<ErrorPage error={error} />)
    } else if (state.takenBandLevels) {
        return (
            <div className="AddBandContainer">
                <h1>Add a band</h1>
                <br />
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formAddBandName">
                        <Form.Label>Band Name</Form.Label>
                        <Form.Control isInvalid={state.bandNameError} type="bandName" placeholder="Enter band name" value={state.bandName} onChange={(e) => dispatch({ type: 'SET_BAND_NAME', data: e.target.value })} />
                        <Form.Control.Feedback type="invalid">{BAND_NAME_ERROR_MESSAGE}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formAddBandLevel">
                        <Form.Label>Band Level</Form.Label>
                        <Form.Control autoComplete="off" isInvalid={state.bandLevelError || state.bandLevelTakenError} type="bandLevel" placeholder="Enter the band level" value={state.bandLevel} onChange={(e) => dispatch({ type: 'SET_BAND_LEVEL', data: e.target.value })} />
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
    } else {
        return (<div>Loading data!</div>)
    }
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
                defaultValue={defaultValue ? defaultValue : ""}
                onChange={e => {
                    dispatch({ type: 'SELECT_TRAINING', selectorID: index, trainingID: e.target.value })
                }}
            >?.
                <option value="" >Select training</option>
                {trainingItems}
            </Form.Control>
        </Form.Group>)
}

const CompetencySelector = ({ index, state, dispatch }) => {
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
                name="training"
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

export default AddBand;