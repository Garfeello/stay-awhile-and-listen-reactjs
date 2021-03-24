import React, {Component} from "react";

import axios from "axios";

import {Card, Form, Button} from "react-bootstrap";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faUndo} from "@fortawesome/free-solid-svg-icons";

import MyToast from "../toasts/MyToast";

export default class QuoteUploadForm extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.submitCharacter = this.submitCharacter.bind(this);
        this.characterChange = this.characterChange.bind(this);
        this.updateCharacter = this.updateCharacter.bind(this);
    }

    initialState = {
        id: "", name: "", description: ""
    }

    componentDidMount() {
        const characterId = +this.props.match.params.id;
        if (characterId) {
            this.findCharacterById(characterId);
        }
    }

    findCharacterById = (characterId) => {
        axios.get("http://localhost:8888/stayAwhileAndListen/character/getCharacter/" + characterId)
            .then(response => {
                if (response.data != null) {
                    this.setState({
                        id: response.data.id,
                        name: response.data.name,
                        description: response.data.description
                    })
                }
            }).catch((error) => {
            console.error("error - " + error)
        })
    }

    submitCharacter = event => {
        event.preventDefault();

        const diablo2Character = {
            name: this.state.name,
            description: this.state.description
        };
        axios.post("http://localhost:8888/stayAwhileAndListen/character/addCharacter", diablo2Character)
            .then(response => {
                if (response.data != null) {
                    this.setState({"show": true});
                    setTimeout(() => this.setState({"show": false}), 3000);
                } else {
                    this.setState({"show": false});
                }
            });
        this.setState(this.initialState)
    }

    updateCharacter = event => {
        event.preventDefault();

        const diablo2Character = {
            id: this.state.id,
            name: this.state.name,
            description: this.state.description
        };
        axios.put("http://localhost:8888/stayAwhileAndListen/character/editCharacter", diablo2Character)
            .then(response => {
                if (response.data != null) {
                    this.setState({"show": true});
                    setTimeout(() => this.setState({"show": false}), 3000);
                } else {
                    this.setState({"show": false});
                }
            });
        this.setState(this.initialState)
    }


    characterChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    resetCharacter = () => {
        this.setState(() => this.initialState);
    }

    render() {
        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast
                        children={{
                            show: this.state.show,
                            message: this.state.id ? "Character Updated successfully !" : "Character saved successfully !",
                            type: "success"
                        }}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Form onReset={this.resetCharacter}
                          onSubmit={this.state.id ? this.updateCharacter : this.submitCharacter} id={"characterFormId"}>
                        <Card.Header>Add Quote</Card.Header>
                        <Card.Body>
                            <Form.Group controlId={"formGridName"}>
                                <Form.Label>Character Name</Form.Label>
                                <Form.Control required autoComplete={"off"}
                                              name={"name"}
                                              value={this.state.name}
                                              onChange={this.characterChange}
                                              type="text"
                                              className={"bg-dark text-white"}
                                />
                            </Form.Group>
                            <Form.Group controlId={"formGridDescription"}>
                                <Form.Label>Character Description</Form.Label>
                                <Form.Control required autoComplete={"off"}
                                              name={"description"}
                                              value={this.state.description}
                                              onChange={this.characterChange}
                                              type="text"
                                              className={"bg-dark text-white"}/>
                            </Form.Group>
                        </Card.Body>
                        <Card.Footer style={{"textAlign": "right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave}/> Submit
                            </Button>
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo}/> Reset
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}
