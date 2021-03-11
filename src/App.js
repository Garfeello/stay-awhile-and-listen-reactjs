import './App.css';
import React from 'react'

import {BrowserRouter as Router} from "react-router-dom";
import {Container, Row, Col,} from "react-bootstrap";
import Switch from "react-bootstrap/Switch";
import {Route} from "react-router-dom";

import MainNavbar from "./components/mainStructure/MainNavbar";
import QuoteUploadForm from "./components/quotes/QuoteUploadForm";
import QuoteList from "./components/quotes/QuoteList";
import Footer from "./components/mainStructure/Footer";
import AddCharacterForm from "./components/characters/AddCharacterForm";
import CharacterList from "./components/characters/CharacterList";
import MainPage from "./components/mainStructure/MainPage";

function App() {

    const marginTop = {marginTop: "20px"};

    return (
        <Router>
            <MainNavbar/>
            <Container>
                <Row>
                    <Col lg={12} style={marginTop}>
                        <Switch>
                            <Route path={"/"} exact component={MainPage}/>
                            <Route path={"/characterList"} exact component={CharacterList}/>
                            <Route path={"/quotesList"} exact component={QuoteList}/>
                            <Route path={"/add"} exact component={QuoteUploadForm}/>
                            <Route path={"/addCharacter"} exact component={AddCharacterForm}/>
                        </Switch>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Footer/>
            </Container>
        </Router>
    );
}

export default App;
