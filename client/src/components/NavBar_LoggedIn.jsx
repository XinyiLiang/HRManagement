import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import logo from '../Logo.png';

const clearSession=() =>{
    sessionStorage.clear();
    window.location.href = '/';
}
export const NavBarLoggedIn = () => (

    
        <Navbar expand = 'lg' >
           
           <Navbar.Toggle   data-toggle="collapse" data-target="#navbarNav" /> 
           <img className="logo" alt="Logo" src={logo} />
           <h1 className="Nav-title">HR Management</h1>
           
            <div class="collapse navbar-collapse navItemStyle" id="navbarNav" >
            {/* <Navbar.Collapse class=" collapse navbar-collapse navItemStyle" id='navbarNav'> */}
            <Nav className="  ml-auto"  >
                
                <Nav.Item><Nav.Link href="./">Home </Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="./About">About </Nav.Link></Nav.Item>
    

                <Nav.Item><Nav.Link href="./Profile">Hello! {sessionStorage.getItem("name")} </Nav.Link></Nav.Item>
                {/* <button id="loginBtn" type="button" class="btn btn-outline-warning" onClick={(e) => sessionStorage.clear()}>Log Out</button> */}
                <button id="logOutBtn" type="button" class="btn btn-outline-warning" onClick={clearSession}>Log Out</button>
                </Nav>

                {/* </Navbar.Collapse> */}
                </div>
        </Navbar>
     
    )

export default NavBarLoggedIn;


