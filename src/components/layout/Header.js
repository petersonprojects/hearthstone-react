import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import './Header.css';

const Header = () => {

    return (
        <>
            <Navbar id="headerTitle" bg="dark" expand="lg">
                <Navbar.Brand id="headerTitle" href="/">Hearthstone React </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto verticalLine">
                    <Nav.Link id="navLink" href="/">Home</Nav.Link>
                    <Nav.Link id="navLink" href="/cards">Cards</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-primary">Search</Button>
                </Form>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default Header
