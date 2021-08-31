import React from 'react';
import Login from '../components/Login';
import logo from '../Logo.png';


export const LoginPage = () =>(
    <div className="LoginPageContainer">
           <div className="LoginComponent">
                 <a href="/">
                 <div className="login-Title">
                     <img className="LoginLogo" alt="Logo" src={logo} />
                     <h2>HR Management App</h2>
                 </div>
                 </a>
               
               <h1>Log In </h1>
              
               <Login />
            
           </div>

      
     </div>
    )
export default LoginPage;
