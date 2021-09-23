import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Table} from 'react-bootstrap';
import { Button, Modal} from 'react-bootstrap';
import axios from 'axios';
import { useForm } from "react-hook-form";
import "bootstrap-icons/font/bootstrap-icons.css";

export function ToDoList() {
 
    const { register, handleSubmit, reset } = useForm();

        const [todolist, todolistSet] = useState([]);

        const [NewListModal, setShow] = React.useState(false);
        const CloseNewListModal = () => setShow(false);
        const OpenNewListModal = () => setShow(true);

        const [ListDetailModal, setLDShow] = React.useState(false);
        const CloseListDetailModal = () => setLDShow(false);
        const OpenListDetailModal = () => setLDShow(true);

        const [listDetail, setListDetails] = React.useState();

        const empid = sessionStorage.getItem('empid');
        const auth = sessionStorage.getItem('auth');

        const history = useHistory();

        async function fetchToDoList() {
            await fetch(`/get/getEmpToDoList/${empid}`, {
             method:'GET'
             }).then(response => response.json()).then(data => {
                 
                 todolistSet(data);
                 console.log(data);
             })               
         }

        useEffect(() => {
            if(auth == 'true'){
            fetchToDoList();
      
    }else{
        history.push('/Login')
    }
}, [])

const AddNewList= (data)=> {
    return axios.post(`/put/addnewlist/${empid}`,  data)
       //.then(res => res.json())
       .then(res => {
         
         CloseNewListModal();
         fetchToDoList();
         reset();
      });  
      
  }
 const deleteList = (data) =>{
     const id = data.id;
     return axios.delete(`/delete/deleteOneList/${empid}/${id}`,data)
     .then(res=>{
        fetchToDoList();
     })
 }

 const ViewListData = (data) =>{
    setListDetails(data.list_content); 
    OpenListDetailModal();
 }
      
        return (
        
         <div class="container ">
            
            <button type="button" class="row btn btn-info m-4"
                          onClick={OpenNewListModal}>Add new list
                         </button>

         {todolist.length != 0  && 
            <Table striped hover id="deptEmpTable" >
            <thead>
                  <tr>
                   <th>My List</th>
                   <th></th>
                   <th></th>
                  </tr>
             </thead>
             <tbody>
            {todolist.map(data =>(
                   <tr >
                     
                     <td><input type="checkbox" value="" id="flexCheckChecked" /><label class="pl-3">{data.list_title}</label></td> 
                     
                     <td><button type="button" class="btn btn-info" onClick={() => {ViewListData(data)}}
                        ><i class="bi bi-info-circle"></i>
                         </button></td>
                         <td><button type="button" class="btn btn-danger" onClick={() => {deleteList(data)}}
                        ><i class="bi bi-x-circle"></i>
                         </button></td>

                     
                    </tr>
              ))}
               
              
              </tbody>
              </Table>
             }



{/* Modal: create a new list */}

<Modal
  show={NewListModal}
  onHide={CloseNewListModal}
  aria-labelledby="contained-modal-title-vcenter"
  centered 
>
 
  <Modal.Header >
  <Modal.Title>Create a New List</Modal.Title>
  </Modal.Header>

<Modal.Body>
     
<form onSubmit={handleSubmit(AddNewList)} >
    <label class="col-4  text-right font-weight-bold">List Title</label>
    <input 
           type="text" 
           class="col-8 "
           name="listTitle" 
           maxlength="30"
           {...register("listTitle", {
            required: "Required",
           })} 
       />

    <label class="col-4  text-right font-weight-bold">List content</label>
    ​<textarea
           type="text" 
           class="col-8 "
           name="listContent" 
           {...register("listContent")} 
       ></textarea>

<button  class="mx-auto d-block mt-3 btn btn-success btn-sm" bsSize="large" 
               type="submit" primary  >Create</button>
</form>


</Modal.Body>
<Modal.Footer>

<Button variant="secondary" onClick={CloseNewListModal}>
Close
</Button>

</Modal.Footer>
</Modal>


{/* view list details modal  */}
<Modal
  show={ListDetailModal}
  onHide={CloseListDetailModal}
  aria-labelledby="contained-modal-title-vcenter"
  centered 
>
<Modal.Header  closeButton>
        
        </Modal.Header>

<Modal.Body>
 <div>{listDetail}</div>
</Modal.Body>

</Modal>
        </div>  
            
        )

       
    
}

export default ToDoList;
