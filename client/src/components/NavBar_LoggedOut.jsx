import React from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import logo from '../Logo.png';


export const NavBarLoggedOut = () => (

    
        <Navbar className="navbar" expand = 'lg' >
           <Navbar.Toggle   data-toggle="collapse" data-target="#navbarNav"   /> 
           <img className="logo" alt="Logo" src={logo} />
           <h1 className="Nav-title">HR Management</h1>
            <div class="collapse navbar-collapse navItemStyle" id="navbarNav" >
            <Nav className="  ml-auto"  >
                
                <Nav.Item><Nav.Link href="./">Home </Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href="./">About </Nav.Link></Nav.Item>
                
               {/* <button id="loginBtn" type="button" class="btn btn-info btn-rounded">Log In</button> */}
               <Nav.Item ><Nav.Link  className="btn btn-info  text-white" href="./Login">Log In</Nav.Link></Nav.Item>
               
                </Nav>
                </div>
        </Navbar>
     
    )

export default NavBarLoggedOut;


