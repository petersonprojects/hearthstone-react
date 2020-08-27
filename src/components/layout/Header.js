import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import './Header.css';

const Header = () => {

    const [heroes, setHeroes] = useState(false)
    let handleIt = () => {
        setHeroes(true);
    }

    return (
        <>
            <Navbar id="headerTitle" bg="dark" expand="lg">
                <Navbar.Brand id="headerTitle" href="/">Hearthstone <b style={{color:'lightskyblue'}}>React</b> </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto verticalLine">
                    <Nav.Link id="navLink" href="/">Home</Nav.Link>
                    <Nav.Link id="navLink" href="/cards">Cards</Nav.Link>
                    <Nav.Link id="navLink" href="/heroes" onClick={handleIt} heroes={heroes}>Heroes</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button id="searchButton" variant="outline-light">Search</Button>
                </Form>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default Header
