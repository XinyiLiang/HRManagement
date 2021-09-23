import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {Tabs, Tab, Table} from 'react-bootstrap';
import { Button, Modal} from 'react-bootstrap';
import { useForm } from "react-hook-form";
import {ToDoList } from "./ToDoList";

export function ShowDeparmentEmps (){

    const { register, handleSubmit} = useForm();
    const isManager = sessionStorage.getItem('isManager');
    const auth = sessionStorage.getItem('auth');
    const history = useHistory();
    const empid = sessionStorage.getItem('empid');
    const [DeptEmployees, DeptEmpSet] = useState([]);

    const [ModifyEmp, ModifyEmpSet] = useState([]);

    const [EMPModal, setShow] = React.useState(false);
    const CloseEMP = () => setShow(false);
    const OpenEMP = () => setShow(true);

    const [key, setKey] = useState('ToDoListTab');

    useEffect(() => {
        if(auth === 'true'){
        async function fetchDeptEmployees() { 
             await fetch(`/get/getDeptEmployees/${empid}`, {
                method:'GET'
                }).then(data => data.json()).then(data => {
                    DeptEmpSet(data);
                    
                })
            }
       
            fetchDeptEmployees();
        
}else{
    history.push('/Login')
}


}, [])

const handleModify= (data)=> {

  console.log(data)
  ModifyEmpSet(data);
  OpenEMP();
}


const handleSubmitModifyEmp= ()=>{

}

    if(isManager=='true'){
         return( 
            <div class="container pt-2 pl-2 pr-2">
             <div class="row"> 
            <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mt-3 TabMenu" 
      
          >
            <Tab eventKey="ToDoListTab" title="To Do List">
            <br/>
               <ToDoList />
            </Tab>
            <Tab eventKey="AllEmployees" title="All Employees">
              <br/>
            <Table striped hover id="deptEmpTable">
            <thead>
                  <tr>
                   <th>ID</th>
                   <th>First Name</th>
                   <th>Last Name</th>
                   <th>Job Title</th>
                   <th></th>
                   
                  </tr>
             </thead>
             <tbody>
            {DeptEmployees.map(data =>(
                   <tr >
                     
                     <td>{data.empid}</td> 
                     <td>{data.empfname}</td> 
                     <td>{data.emplname}</td> 
                     <td>{data.title}</td> 
                     
                     <td><button type="button" class="btn btn-info"
                          onClick={() => {handleModify(data)}}>Details
                         </button></td>

                     
                    </tr>
              ))}
               
              
              </tbody>
            </Table>
            </Tab>

            
           
          </Tabs>


               

{/* Modal: view a sepecific employee details */}

<Modal
  show={EMPModal}
  onHide={CloseEMP}
  aria-labelledby="contained-modal-title-vcenter"
  centered 
  id = "ManagerModifyEmp"
>
 
  <Modal.Header >
  <Modal.Title>Employee Details </Modal.Title>
  </Modal.Header>

<Modal.Body>

<form onSubmit={handleSubmit(handleSubmitModifyEmp)} >
    <label class="col-4  text-right font-weight-bold">Employee ID:</label>
    <label class="col-8  text-left mb-3">{ModifyEmp.empid}</label>
    <label class="col-4  text-right font-weight-bold">Employee name:</label>
    <label class="col-8  text-left mb-3">{ModifyEmp.empfname} {ModifyEmp.emplname}</label>
    <label class="col-4  text-right font-weight-bold">Department:</label>
    <label class="col-8  text-left mb-3">{ModifyEmp.deptname}</label>
    <label class="col-4  text-right font-weight-bold">Job title:</label>
    <label class="col-8  text-left mb-3">{ModifyEmp.title}</label>
    <label class="col-4 text-right font-weight-bold">Phone Number: </label>
    <label class="col-8  text-left mb-3">{ModifyEmp.empphone}</label>
   <br/>
 
   <label class="col-4 text-right font-weight-bold">Email:</label>
   <label class="col-8  text-left">{ModifyEmp.email}</label>
   


   <br/>

  

</form>
</Modal.Body>


<Modal.Footer>
<Button variant="secondary" onClick={CloseEMP}>
Close
</Button>

</Modal.Footer>
</Modal>


          </div> 
          </div>
            )
        
     }else{
         return(  
         <div class="container pt-2 pl-2 pr-2">
         <div class="row"> 
        <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mt-3 TabMenu"
      >

        <Tab eventKey="ToDoListTab" title="To Do List">
           <ToDoList />
        </Tab>
        
       
      </Tabs>
      </div>
      </div>)
        
     }


}

export default ShowDeparmentEmps;
