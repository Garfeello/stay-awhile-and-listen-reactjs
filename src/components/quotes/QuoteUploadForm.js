import React, {Component} from "react";

import {Card, Button, Form} from "react-bootstrap";
import MyToast from "../toasts/MyToast";

import axios from "axios";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave, faUndo} from "@fortawesome/free-solid-svg-icons";

export default class QuoteUploadForm extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.submitQuote = this.submitQuote.bind(this);
        this.fileChange = this.fileChange.bind(this)
        this.quoteChange = this.quoteChange.bind(this);
    }

    initialState = {
       name: "", quote: undefined, diablo2Characters: []

    }

    componentDidMount() {
        axios.get("http://localhost:8888/stayAwhileAndListen/character/allCharacters")
            .then(response => response.data)
            .then((data) => {
                this.setState({diablo2Characters: data});
            });
    }

    submitQuote = event => {
        event.preventDefault();

        const form = new FormData;
        form.append('mpegFile', this.state.quote)
        form.append('characterName', this.state.name)
        console.log(this.state.name);

        axios.post("http://localhost:8888/stayAwhileAndListen/quotes/addQuote", form)
            .then(response => {
                if (response.data != null) {
                    this.setState({"show": true});
                    setTimeout(() => this.setState({"show": false}), 3000);
                } else {
                    this.setState({"show": false});
                }
            }).catch((error) => {
            console.log(error)
        })
    }

    quoteChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    fileChange = event => {
        this.setState({
            quote: event.target.files[0]
        })
    }

    resetCharacter = () => {
        this.setState(() => this.initialState);
    }

    render() {
        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast
                        children={{show: this.state.show, message: "Quote saved successfully !", type: "success"}}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Form onReset={this.resetCharacter} onSubmit={this.submitQuote}
                          id={"quoteFormId"}
                          encType="multipart/form-data">
                        <Card.Header>Add Quote</Card.Header>
                        <Card.Body>
                            <Form.Group controlId={"formGridName"}>
                                <Form.Label>Character Name</Form.Label>
                                <Form.Control as={"select"} required autoComplete={"off"}
                                              name={"name"}
                                              value={this.state.name}
                                              onChange={this.quoteChange}
                                              type="text"
                                              className={"bg-dark text-white"}>
                                    {
                                        this.state.diablo2Characters.map((diablo2Characters) =>
                                            <option>{diablo2Characters.name}</option>
                                        )}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId={"formGridDescription"}>
                                <Form.Label>File Upload</Form.Label>
                                <Form.File required
                                           onChange={this.fileChange}
                                           type='file'
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

