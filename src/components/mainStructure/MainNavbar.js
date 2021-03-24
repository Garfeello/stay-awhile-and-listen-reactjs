import React, {Component} from "react";

import logo from "../../logo/pngwing.com.png"

import {Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faListUl, faPlusSquare} from "@fortawesome/free-solid-svg-icons";

export default class MainNavbar extends Component {
    render() {
        return (
                <Navbar bg="dark" variant="dark" sticky={"top"}>
                    <Link className={"navbar-brand"} to={""}>
                        <img src={logo} alt={"d2Icon"} width={"40"} height={"40"}/>
                    </Link>
                    <Nav className="mr-auto">
                        <Link className="nav-link" to={"characterList"}><FontAwesomeIcon icon={faListUl}/> CharacterList</Link>
                        <Link className="nav-link" to={"quotesList"}>QuotesList</Link>
                        <Link className="nav-link" to={"add"}><FontAwesomeIcon icon={faPlusSquare}/> AddQuote</Link>
                        <Link className="nav-link" to={"addCharacter"}>AddCharacter</Link>
                    </Nav>
                </Navbar>
        );
    }
}
// list-ul