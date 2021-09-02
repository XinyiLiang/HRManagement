import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {UpdateContact} from './UpdateContact';
import {ShowDeparmentEmps} from './showDepartmentEmps';
export function EmpProfile() {

 
        const [emp, dataSet] = useState([])
        const [empManager, ManagerSet] = useState([])
        

        const empid = sessionStorage.getItem('empid');
        const auth = sessionStorage.getItem('auth');

        const history = useHistory();

        useEffect(() => {
            if(auth === 'true'){
            async function fetchMyAPI() {
             await fetch(`/get/getEmployeeInfo/${empid}`, {
                method:'GET'
                }).then(response => response.json()).then(data => {
                    
                    dataSet(data);
                   
                })               
            }
            async function fetchMyManager() {
                 await fetch(`/get/getEmployeeManager/${empid}`, {
                    method:'GET'
                    }).then(managerData => managerData.json()).then(mdata => {
    
                        ManagerSet(mdata);
                        if(mdata.mid == empid )
                        sessionStorage.setItem("isManager",true);
                        else
                        sessionStorage.setItem("isManager",false);
                        
                    })
                }
            
            fetchMyManager();
            fetchMyAPI();
       
      
    }else{
        history.push('/Login')
    }
}, [])


        return (
        
         <div class="container profile ">
            
            <div class="row row-eq-height ">
                     <div class=" col col-sm-12 col-md-12 col-lg-3 profilerow">
                         <span>
                        <h2>Hello,</h2>
                        <h1>{emp.empfname} {emp.emplname}</h1>
                        </span>
                     </div>
                     
                     <div class=" col col-sm-12 col-md-12 col-lg-8 empinfo ">
                     
                     <div class="container p-md-4 p-2"> 

                        <div class="row pb-2">
                              <div class="col-5 col-sm-3 col-md-3 col-lg-2 ">Employee ID:</div>
                              <div class="col-7 col-sm-8 col-md-8 col-lg-9 "> {emp.empid}</div>

                         </div>

                         <div class="row pb-2">
                              <div class="col-5 col-sm-3 col-md-3 col-lg-2 ">Department:</div>
                              <div class="col-7 col-sm-8 col-md-8 col-lg-9 "> {emp.deptname}</div>

                         </div>
                         <div class="row pb-2">
                              <div class="col-5 col-sm-3 col-md-3 col-lg-2 ">Job Title:</div>
                              <div class="col-7 col-sm-8 col-md-8 col-lg-9 "> {emp.title}</div>

                         </div>
                         <div class="row pb-2">
                              <div class="col-5 col-sm-3 col-md-3 col-lg-2 ">Manager:</div>
                              <div class="col-7 col-sm-8 col-md-8 col-lg-9 "> {empManager.manager} </div>

                         </div>
                      </div>

                       
                      <div class="container p-2">
                               <div class="row ContactInfo">
                                 <h3 pb-2>Contact Info</h3>
                             <UpdateContact />
                       </div>
                       <div class="row pt-2 pb-2">
                              <div class="col-5 col-sm-3 col-md-3 col-lg-2  ">Phone:</div>
                              <div class="col-7 col-sm-8 col-md-8 col-lg-9 "> {emp.phone}</div>

                         </div>
                         <div class="row pb-2">
                              <div class="col-5 col-sm-3 col-md-3 col-lg-2 ">Email:</div>
                              <div class="col-7 col-sm-8 col-md-8 col-lg-9 "> {emp.email}</div>

                         </div>
                     </div>

                       <ShowDeparmentEmps />

                     </div>
    
                     
            </div>
                                           
       

        </div>  
            
        )

       
    
}

export default EmpProfile;
