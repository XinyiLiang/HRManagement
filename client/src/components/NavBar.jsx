import React from 'react';
import NavBarLoggedIn from './NavBar_LoggedIn'
import NavBarLoggedOut from './NavBar_LoggedOut'

 export function NavBar (){


           const isLogedIn = sessionStorage.getItem('auth');
           
           if(isLogedIn === 'true'){
                return( <NavBarLoggedIn/>)
               
            }else{
                return( <NavBarLoggedOut/>)
               
            }
    
        
    
        
 
 }



