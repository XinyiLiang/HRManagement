import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {Tabs, Tab, Table} from 'react-bootstrap';
import { Button, Modal} from 'react-bootstrap';
import { useForm } from "react-hook-form";


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


    const [key, setKey] = useState('AllEmployees');

    useEffect(() => {
        if(auth === 'true'){
        async function fetchDeptEmployees() { 
             await fetch(`/get/getDeptEmployees/${empid}`, {
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
                   <th></th>
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
                     
                     {/* <td><button type="button" class="btn btn-info"
                          onClick={() => {handleModify(data)}}>Modify
                         </button></td>

                     <td><button type="button" class="btn btn-danger">Delete</button></td> */}
                    </tr>
              ))}
               
              
              </tbody>
            </Table>
            </Tab>

            <Tab eventKey="Modified" title="Modified">
              <p>modified</p>
            </Tab>
           
          </Tabs>


               

{/* Modal: update a sepecific employee by his Manager */}

<Modal
  show={EMPModal}
  onHide={CloseEMP}
  aria-labelledby="contained-modal-title-vcenter"
  centered 
>
 
  <Modal.Header  closeButton>
  <Modal.Title>{ModifyEmp.empfname} {ModifyEmp.emplname} - Modify</Modal.Title>
  </Modal.Header>

<Modal.Body>

<form onSubmit={handleSubmit(handleSubmitModifyEmp)} >
    
    <label class="col-4 text-right">Phone Number: {ModifyEmp.empphone}</label>
    
   <br/>
 
   <label class="col-4 text-right">Email:</label>


   <br/>

   <button  class="mx-auto d-block mt-3 btn btn-success btn-sm" bsSize="large" 
           type="submit" primary id="UpdateBtn"  >Update</button>

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
         return( <div> not a  manager </div>)
        
     }


}

export default ShowDeparmentEmps;
