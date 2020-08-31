import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import './Header.css';

const Header = () => {

    // const [heroes, setHeroes] = useState(false)
    // let handleIt = () => {
    //     setHeroes(true);
    // }

    return (
        <>
            <Navbar id="headerTitle" bg="dark" expand="lg" sticky="top">
                <Navbar.Brand id="headerTitle" href="/">Hearthstone <b className="reactBold" style={{color:'lightskyblue'}}>React</b></Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto verticalLine">
                    <Nav.Link id="navLink" href="/">Home</Nav.Link>
                    <Nav.Link id="navLink" href="/cards">All Cards</Nav.Link>
                    <Nav.Link id="navLink" href="/heroes">Heroes</Nav.Link>
                </Nav>
                <Form  inline>
                    <FormControl style={{fontSize:'0.8em'}} type="text" placeholder="Search" className="mr-sm-2" />
                    <Button style={{fontSize:'0.8em'}} id="searchButton" variant="outline-light">Search</Button>
                </Form>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default Header
