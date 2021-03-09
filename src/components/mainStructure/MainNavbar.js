import React, {Component} from "react";

import logo from "../../logo/pngwing.com.png"

import {Button, Container, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

export default class MainNavbar extends Component {
    render() {
        return (
                <Navbar bg="dark" variant="dark" sticky={"top"}>
                    <Link className={"navbar-brand"} to={""}>
                        <img src={logo} alt={"d2Icon"} width={"40"} height={"40"}/>
                    </Link>
                    <Nav className="mr-auto">
                        <Link className="nav-link" to={"characterList"}>CharacterList</Link>
                        <Link className="nav-link" to={"quotesList"}>QuotesList</Link>
                        <Link className="nav-link" to={"add"}>AddQuote</Link>
                        <Link className="nav-link" to={"addCharacter"}>AddCharacter</Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                        <Button variant="outline-info">Search</Button>
                    </Form>
                </Navbar>
        );
    }
}
