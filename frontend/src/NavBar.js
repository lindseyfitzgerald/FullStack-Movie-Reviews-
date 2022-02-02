import React from "react";
import { Navbar, Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

class NavBar extends React.Component {
    render(){
    return(
       
        <Navbar  bg="light" expand="lg">
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" >
                    <Nav>
                        <Nav.Link href="/"> Home </Nav.Link>
                        <Nav.Link href="/add"> Add Review </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        
    )
}
}

export default NavBar;