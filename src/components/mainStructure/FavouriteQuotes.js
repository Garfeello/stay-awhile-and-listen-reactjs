import React, {Component} from "react";

import axios from "axios";
import {Card, Col, Container, Row} from "react-bootstrap";
import Mp3FilePlayer from "../player/Mp3FilePlayer";

export default class FavouriteQuotes extends Component {


    constructor(props) {
        super(props);
        this.state = this.initialState
    }

    initialState = {quotes: []}

    componentDidMount() {
        axios.get("http://localhost:8888/stayAwhileAndListen/quotes/favQuotes")
            .then(response => response.data)
            .then((data) => {
                console.log(data)
                this.setState({quotes: data});
            });
    }

    render() {
        const marginTopTextCenter = {marginTop: "10px", textAlign: "center"};
        console.log(this.state.quotes)
        return (
            <Row>
                {this.this.state.quotes.map((quote) =>
                    <Col lg={4} style={marginTopTextCenter}>
                        <Card className={"border border-dark bg-dark text-white"}>
                            <Card.Body>
                                <Card.Header>{quote.name}</Card.Header>
                                <Card.Text>
                                    <Mp3FilePlayer
                                        children={{
                                            quoteId: quote.id,
                                            quoteName: quote.name
                                        }}/>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                )}
            </Row>
        )
    }
}