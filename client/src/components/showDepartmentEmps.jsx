import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {Tabs, Tab, Table} from 'react-bootstrap'

export function ShowDeparmentEmps (){


    const isManager = sessionStorage.getItem('isManager');
    const auth = sessionStorage.getItem('auth');
    const history = useHistory();
    const empid = sessionStorage.getItem('empid');
    const [DeptEmployees, DeptEmpSet] = useState([]);


    const [key, setKey] = useState('AllEmployees');

    useEffect(() => {
        if(auth == 'true'){
        async function fetchDeptEmployees() { 
            let response = await fetch(`/get/getDeptEmployees/${empid}`, {
                method:'GET'
                }).then(data => data.json()).then(data => {
                    DeptEmpSet(data);
                    console.log(data);
                    
                })
            }
       
        fetchDeptEmployees();
}else{
    history.push('/Login')
}
}, [])


    if(isManager=='true'){
         return( 
            <div class="container pt-2 pl-2 pr-2">
             <div class="row"> 
            <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mt-3 ManagerMenu" 
      
          >
            <Tab eventKey="AllEmployees" title="All Employees">
              <br/>
            <Table striped hover id="deptEmpTable">
            <thead>
                  <tr>
                   <th>ID</th>
                   <th>First Name</th>
                   <th>Last Name</th>
                   <th>Job Title</th>

                  </tr>
             </thead>
             <tbody>
            {DeptEmployees.map(data =>(
                   <tr >
                     
                     <td>{data.empid}</td> 
                     <td>{data.empfname}</td> 
                     <td>{data.emplname}</td> 
                     <td>{data.title}</td> 
                    </tr>
              ))}
               
              
              </tbody>
            </Table>
            </Tab>

            <Tab eventKey="Modified" title="Modified">
              <p>modified</p>
            </Tab>
           
          </Tabs>
          </div> 
          </div>
            )
        
     }else{
         return( <div> not a  manager </div>)
        
     }


}

export default ShowDeparmentEmps;
