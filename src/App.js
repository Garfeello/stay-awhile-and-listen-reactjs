import './App.css';
import React from 'react'

import {BrowserRouter as Router} from "react-router-dom";
import {Container, Row, Col,} from "react-bootstrap";
import Switch from "react-bootstrap/Switch";
import Route from "react-router-dom/es/Route";

import MainNavbar from "./components/mainStructure/MainNavbar";
import QuoteUploadForm from "./components/quotes/QuoteUploadForm";
import QuoteList from "./components/quotes/QuoteList";
import Footer from "./components/mainStructure/Footer";
import AddCharacterForm from "./components/characters/AddCharacterForm";
import CharacterList from "./components/characters/CharacterList";
import Mp3FilePlayer from "./components/player/Mp3FilePlayer";


function App() {

    const marginTop = {marginTop: "20px"};

    return (
        <Router>
            <MainNavbar/>
            <Container>
                <Row>
                    <Col lg={12} style={marginTop}>
                        <Switch>
                            {/*<Route path={"/"} exact component={Mp3FilePlayer}/>*/}
                            <Route path={"/characterList"} exact component={CharacterList}/>
                            <Route path={"/quotesList"} exact component={QuoteList}/>
                            <Route path={"/add"} exact component={QuoteUploadForm}/>
                            <Route path={"/addCharacter"} exact component={AddCharacterForm}/>
                        </Switch>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </Router>
    );
}

export default App;
