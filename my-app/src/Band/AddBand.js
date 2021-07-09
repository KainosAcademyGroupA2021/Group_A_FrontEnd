import { useState, useEffect } from 'react';
import { Form, Button } from "react-bootstrap";
import './Band.css';
import axios from 'axios';

const AddBand = () => {

    const [bandName, setBandName] = useState("");
    const [bandLevel, setBandLevel] = useState("");

    const [validated, setValidated] = useState("false");

    const [bandNameValidationMessage, setBandNameValidationMessage] = useState("");
    const [bandLevelValidationMessage, setBandLevelValidationMessage] = useState("");


    const handleSubmit = (e) => {

        bandName === "" ? setBandNameValidationMessage("You must enter a name!") : setBandNameValidationMessage("");

        if (bandName === "") {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated("true");

        axios.post('http://localhost:5000/addBand', {
            BandName: bandName
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
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

                <div className="indentedField">
                <Form.Group controlId="formAddBandLevel">
                    <Form.Label>Training Name</Form.Label>
                    <Form.Control isInvalid={bandLevelValidationMessage !== ""} type="bandLevel" placeholder="Enter the training name" value={bandLevel} onChange={(e) => setBandLevel(e.target.value)} />
                    <Form.Control.Feedback type="invalid">{bandLevelValidationMessage}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formAddBandLevel">
                    <Form.Label>Type of Training</Form.Label>
                    <Form.Control isInvalid={bandLevelValidationMessage !== ""} type="bandLevel" placeholder="Enter the training name" value={bandLevel} onChange={(e) => setBandLevel(e.target.value)} />
                    <Form.Control.Feedback type="invalid">{bandLevelValidationMessage}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formAddBandLevel">
                    <Form.Label>Training Link</Form.Label>
                    <Form.Control isInvalid={bandLevelValidationMessage !== ""} type="bandLevel" placeholder="Enter the training name" value={bandLevel} onChange={(e) => setBandLevel(e.target.value)} />
                    <Form.Control.Feedback type="invalid">{bandLevelValidationMessage}</Form.Control.Feedback>
                </Form.Group>
                </div>

                <Button variant="primary">
                    Add a training
                </Button>
                <br/>

                <br />
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default AddBand;