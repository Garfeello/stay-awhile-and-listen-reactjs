import React, {Component} from "react";

import {Button, ButtonGroup, Card, Table} from "react-bootstrap";
import axios from "axios";

import Mp3FilePlayer from "../player/Mp3FilePlayer";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import MyToast from "../toasts/MyToast";

export default class QuoteList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quotes: []
        };
    }

    componentDidMount() {
        axios.get("http://localhost:8888/stayAwhileAndListen/quotes/allQuotes")
            .then(response => response.data)
            .then((data) => {
                console.log("lol")
                console.log(data)
                this.setState({quotes: data});
            });
    }

    deleteQuote = (quoteId) => {
        axios.delete("http://localhost:8888/stayAwhileAndListen/quotes/deleteQuote/" + quoteId)
            .then(response => {
                if (response.data != null) {
                    alert("Quote deleted successfully")
                    this.setState({
                        quotes: this.state.quotes.filter(quotes => quotes.id !== quoteId)
                    })
                }
            })
    };

    favQuote = (quoteId) => {
        axios.get("http://localhost:8888/stayAwhileAndListen/quotes/setFavouriteQuote/" + quoteId)
            .then(response => {
                if (response.data != null) {
                    this.componentDidMount();
                    this.setState({
                        "show": true,
                        quotes: this.state.quotes.filter(quotes => quotes.id !== quoteId)
                    });
                    setTimeout(() => this.setState({"show": false}), 3000);
                } else {
                    this.setState({"show": false});
                }
            })
    };

    render() {
        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast
                        children={{
                            show: this.state.show,
                            message: this.state.id ? "Favourite updated !" : "Favourite updated !",
                            type: "success"
                        }}/>
                </div>
                <Card className={"border border-dark bg-dark"}>
                    <Card.Header className={"text-white"}>List Of Quotes : {this.state.quotes.length}</Card.Header>
                    <Card.Body>
                        <Table striped bordered hover variant="dark" style={{textAlign: "center"}}>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Diablo 2 Character</th>
                                <th>Diablo 2 Quote</th>
                                <th>Favourite</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.quotes.map((quote) =>
                                <tr key={quote.id}>
                                    <td>{quote.id}</td>
                                    <td>{quote.diablo2Character === null ? "test" : quote.diablo2Character.name}</td>
                                    <td><Mp3FilePlayer quoteId={quote.id} quoteName={quote.name}/></td>
                                    <td> {quote.favourite === true ? <FontAwesomeIcon icon={faStar}/> : ""}</td>
                                    <td>
                                        <ButtonGroup>
                                            <Button size={"sm"} variant={"outline-danger"}
                                                    onClick={this.deleteQuote.bind(this, quote.id)}>
                                                <FontAwesomeIcon icon={faTrashAlt}/> Delete
                                            </Button>
                                            <Button size={"sm"} variant={"outline-info"}
                                                    onClick={this.favQuote.bind(this, quote.id)}>
                                                <FontAwesomeIcon icon={faStar}/> Favourite
                                            </Button>
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

