import React, {Component} from "react";

import {Button, ButtonGroup, Card, Table} from "react-bootstrap";
import axios from "axios";

import Mp3FilePlayer from "../player/Mp3FilePlayer";

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

    render() {
        return (
            <Card className={"border border-dark bg-dark"}>
                <Card.Header className={"text-white"}>List Of Quotes : {this.state.quotes.length}</Card.Header>
                <Card.Body>
                    <Table striped bordered hover variant="dark">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Diablo 2 Character</th>
                            <th>Diablo 2 Quote</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.quotes.map((quote) =>
                            <tr align={"center"} key={quote.id}>
                                <td>{quote.id}</td>
                                <td>{quote.diablo2Character.name}</td>
                                <td><Mp3FilePlayer children={{quoteId: quote.id, quoteName: quote.name}}/></td>
                                <td>
                                    <ButtonGroup>
                                        <Button size={"sm"}
                                                variant={"outline-danger"}
                                                onClick={this.deleteQuote.bind(this, quote.id)}>Delete</Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    }
}

