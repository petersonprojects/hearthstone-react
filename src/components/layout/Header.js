import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './Header.css';

const Header = () => {

    return (
        <>
            <Navbar id="headerTitle" bg="dark" expand="lg" sticky="top">
                <Navbar.Brand id="headerTitle" href="/">Hearthstone<b className="reactBold mr-auto" style={{color:'lightskyblue'}}>React</b></Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto verticalLine">
                    <Nav.Link id="navLink" href="/">Home</Nav.Link>
                    <Nav.Link id="navLink" href="/cards">All Cards</Nav.Link>
                    <Nav.Link id="navLink" href="/heroes">Heroes</Nav.Link>
                    <Nav.Link id="navLink" href="/heroes">My Collection</Nav.Link>
                    <Nav.Link target="_blank" href="https://github.com/petersonprojects/hearthstone-react" style={{ marginTop:'-10px'}}><img style={{height:'1.5em', width:'1.5em'}} src="./images/score.png" alt="things"></img></Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default Header
