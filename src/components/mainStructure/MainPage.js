import React, {Component} from "react";

import {Card, Col, Row} from "react-bootstrap";

import Mp3FilePlayer from "../player/Mp3FilePlayer";
import axios from "axios";

export default class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDay: new Date().getDay(),
            quote: ""
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8888/stayAwhileAndListen/quotes/getRandomDailyQuote/" + this.state.currentDay)
            .then(response => response.data)
            .then((data) => {
                this.setState({quote: data});
            });
    }

    render() {
        const marginTop = {marginTop: "20px"};
        console.log("DAY: " + this.state.currentDay)
        return (
            <Row>
                <Col lg={6} style={marginTop}>
                    <Card className={"border border-dark bg-dark text-white"}>
                        <Card.Body>
                            <Card.Header as={"h5"}>
                                {this.state.quote.name}
                            </Card.Header>
                            <Card.Text>
                                <Mp3FilePlayer
                                    children={{
                                        quoteId: this.state.quote.id,
                                        quoteName: this.state.quote.name
                                    }}/>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        )
    }

}