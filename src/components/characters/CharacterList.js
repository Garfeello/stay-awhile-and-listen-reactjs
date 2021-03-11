import React, {Component} from "react";

import {Button, ButtonGroup, Card, Table} from "react-bootstrap";
import axios from "axios";

import MyToast from "../toasts/MyToast";

export default class CharacterList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            character: []
        };
    }

    componentDidMount() {
        axios.get("http://localhost:8888/stayAwhileAndListen/character/allCharacters")
            .then(response => response.data)
            .then((data) => {
                this.setState({character: data});
            });
    }

    deleteCharacter = (characterId) => {
        axios.delete("http://localhost:8888/stayAwhileAndListen/character/deleteCharacter/" + characterId)
            .then(response => {
                if (response.data != null) {
                    this.setState({"show": true});
                    setTimeout(() => this.setState({"show": false}), 3000);
                    this.setState({
                        character: this.state.character.filter(character => character.id !== characterId)
                    })
                } else {
                    this.setState({"show": false});
                }
            })
    };

    render() {
        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast children={{show: this.state.show, message: "Character deleted successfully !", type:"danger"}}/>
                </div>
                <Card className={"border border-dark bg-dark"}>
                    <Card.Header className={"text-white"}>List Of Characters : {this.state.character.length}</Card.Header>
                    <Card.Body>
                        <Table striped bordered hover variant="dark">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Diablo 2 Character name</th>
                                <th>Diablo 2 Character description</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.character.map((character) =>
                                <tr align={"center"} key={character.id}>
                                    <td>{character.id}</td>
                                    <td>{character.name}</td>
                                    <td>{character.description}</td>
                                    <td>
                                        <ButtonGroup>
                                            <Button size={"sm"}
                                                    variant={"outline-danger"}
                                                    onClick={this.deleteCharacter.bind(this, character.id)}>Delete</Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

