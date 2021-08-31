import React, { useState } from "react";
import { Form, Field } from 'react-advanced-form'
import { Input, Button } from 'react-advanced-form-addons'
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {useAlert } from 'react-alert';


export function Login() {

  let history = useHistory();
  const { register, handleSubmit} = useForm();
  const axios = require('axios');
  

  const alert = useAlert();
  
  const loginUser= (data)=> {

    return axios.post(`/get/LoginEmpCheckId`,data)
        .then(res => {
          if (res.data.length == 1)
          {
            axios.post('/get/userLogin', data)
            //.then(res => res.json())
            .then(res => {
              console.log(res.data);
             if (res.data.length == 1) 
               {
                // console.log('user exists');
                 sessionStorage.setItem("auth", "true");
                 sessionStorage.setItem("name",res.data[0].emplname + " " + res.data[0].empfname);
                 sessionStorage.setItem("empid",res.data[0].empid);
                 history.push({ 
                   pathname: '/Profile',
                 })
                 window.location.reload();
               }
             else
             {
              // console.log('user not exist!!!' );  
               alert.error("Wrong Password!");
             }
           });
          }
          else
           {
            alert.error("Employee ID does not exist");
           }
        })
    
    
  }


  return (


    <div id="LoginForm">
      
      <form onSubmit={handleSubmit(loginUser)}>
      
      
         <input type="text" 
                 placeholder="Employee ID"
                 name="empid" 
                 {...register("empid", {
                  required: "Required",
                })}
        
          />
       <br />
      <input type="password" 
             placeholder="Password"
             name="password" 
             {...register("password", {
              required: "Required",
            })}
         
          />
         <br />
      
        <Button bsSize="large" variant="success" type="submit" primary  >Login</Button>
       
        </form>
       
    </div>
  );
}
       
export default Login;


