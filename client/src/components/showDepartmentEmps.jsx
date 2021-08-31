import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {Tabs, Tab} from 'react-bootstrap'

export function ShowDeparmentEmps (){


    const isManager = sessionStorage.getItem('isManager');
    const auth = sessionStorage.getItem('auth');
    const history = useHistory();

    const [key, setKey] = useState('AllEmployees');

    useEffect(() => {
        if(auth == 'true'){
        // async function fetchMyManager() { 
        //     let response = await fetch(`/get/getEmployeeManager/${empid}`, {
        //         method:'GET'
        //         }).then(data => data.json()).then(data => {
        //             console.log(data.mid + " " + empid);
                    
        //         })
        //     }
        console.log( "inside:" + isManager)
        // fetchMyManager();
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
            <p> all employees</p>
            <p> all employees</p>
            <p> all employees</p>
            <p> all employees</p>
            <p> all employees</p>
            <p> all employees</p>
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
