import React, {Component} from "react";

import {Navbar, Container} from "react-bootstrap";

export default class Footer extends Component {
    render() {
        let fullYear = new Date().getFullYear();

        return (
            <Navbar fixed={"bottom"} bg={"dark"} variant={"dark"}>
                <Container className="text-center text-muted">
                    <div> NO RIGHTS !!! {fullYear}</div>
                </Container>
            </Navbar>
        );
    }
}