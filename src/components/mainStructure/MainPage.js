import React, {Component} from "react";

import {Card, Col, Row} from "react-bootstrap";

import Mp3FilePlayer from "../player/Mp3FilePlayer";

export default class MainPage extends Component {


    render() {

        const marginTop = {marginTop: "20px"};


        return (
            <Row>
                <Col lg={6} style={marginTop}>
                    <Card className={"border border-dark bg-dark text-white"}>
                        <Card.Body>
                            <Card.Header as={"h5"}>
                                Akara
                            </Card.Header>
                            <Card.Text>
                                <Mp3FilePlayer children={{quoteId: 35, quoteName: "TEST"}}/>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        )
    }

}