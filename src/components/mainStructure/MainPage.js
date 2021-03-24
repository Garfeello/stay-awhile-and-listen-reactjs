import React, {Component} from "react";

import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";

import Mp3FilePlayer from "../player/Mp3FilePlayer";
import FavouriteQuotes from "./FavouriteQuotes";
import axios from "axios";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDice} from "@fortawesome/free-solid-svg-icons";

export default class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDay: new Date().getDate(),
            dailyQuote: "",
            randomQuote: "",
            dailyDiablo2Character: "",
            randomDiablo2Character: ""
        }
    }

    fetchRandomQuote = (event) => {
        event.preventDefault();
        axios.get("http://localhost:8888/stayAwhileAndListen/quotes/randomQuote")
            .then(response => response.data)
            .then((data) => {
                this.setState({randomQuote: data, randomDiablo2Character: data.diablo2Character});
            });
    }

    componentDidMount() {
        axios.get("http://localhost:8888/stayAwhileAndListen/quotes/getRandomDailyQuote/" + this.state.currentDay)
            .then(response => response.data)
            .then((data) => {
                this.setState({dailyQuote: data, dailyDiablo2Character: data.diablo2Character});
            });
    }

    render() {
        const marginTopTextCenter = {marginTop: "10px", textAlign: "center"};
        const marginBottomTextCenter = {marginBottom: "60px", textAlign: "center"};
        return (
            <Container fluid>
                <Row className={"d-flex justify-content-center"}>
                    <Col lg={8} style={marginTopTextCenter}>
                        <Card className={"border border-dark bg-dark text-white"}>
                            <Card.Body>
                                <Card.Title as={"h5"}>Today's random quote</Card.Title>
                                <Card.Header>{this.state.dailyDiablo2Character.name}</Card.Header>
                                <Card.Text>
                                    <Mp3FilePlayer
                                        children={{
                                            quoteId: this.state.dailyQuote.id,
                                            quoteName: this.state.dailyQuote.name
                                        }}/>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>


                </Row>
                <Row className={"d-flex justify-content-center"}>
                    <Col lg={8} style={marginBottomTextCenter}>
                        <Card className={"border border-dark bg-dark text-white"}>
                            <Card.Body>
                                <Card.Title as={"h5"}>Roll Random Quote</Card.Title>
                                <Card.Header>{this.state.randomDiablo2Character.name}</Card.Header>
                                <Card.Text>
                                    <Mp3FilePlayer
                                        children={{
                                            quoteId: this.state.randomQuote.id,
                                            quoteName: this.state.randomQuote.name
                                        }}/>
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Form onSubmit={this.fetchRandomQuote}>
                                    <Button size="sm" variant="success" type="submit">
                                        <FontAwesomeIcon icon={faDice}/> Random
                                    </Button>
                                </Form>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}