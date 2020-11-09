import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage';
import { Nav, Navbar } from 'react-bootstrap';

const App = () => {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Humans clone</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Notes</Nav.Link>
                        <Nav.Link href="#timeline">Timeline</Nav.Link>
                        <Nav.Link href="#circles">Circles</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <HomePage />
        </div>
    );
};

export default App;
