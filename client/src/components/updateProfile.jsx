import React ,{ useEffect, useState } from 'react';
import { Button, Modal} from 'react-bootstrap';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';

export function UpdateProfile(){

    const [PModal, setPShow] = React.useState(false);
    const CloseP = () => setPShow(false);
    const OpenP = () => setPShow(true);

    const [empNewPhone, newPhoneSet] = useState();
    const [empNewEmail, newEmailSet] = useState();

    const empid = sessionStorage.getItem('empid');
    const auth = sessionStorage.getItem('auth');
    const { register, handleSubmit} = useForm();
    const history = useHistory();

    useEffect(() => {
        if(auth == 'true'){
        async function fetchMyAPI() {
        let response = await fetch(`/get/getEmployeeInfo/${empid}`, {
            method:'GET'
            }).then(response => response.json()).then(data => {
                
                newPhoneSet(data.phone);
                newEmailSet(data.email);
            
            })               
        }
     
        fetchMyAPI();
   
       }else{
           history.push('/Login')
            }
     }, [])

    const UpdateContact= (data)=> {
        return axios.put(`/put/UpdateEmpContact/${empid}`,  data)
           //.then(res => res.json())
           .then(res => {
             console.log(res.data);
            
             CloseP();
             window.location.reload();
          });  
      }

    return (
       <>
        
         <button id="UpdateBtn" type="button" class="btn btn-success btn-sm" 
          onClick={OpenP}>Update
         </button>

        <Modal
        show={PModal}
        onHide={CloseP}
       
        aria-labelledby="contained-modal-title-vcenter"
        centered
        
      >
        <Modal.Header  closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
     
        <Modal.Body>
       
        <form onSubmit={handleSubmit(UpdateContact)} class="container">
    
        <label class="col-4 text-right">Phone Number:</label>
        <input 
             type="text" 
             class="col-8"
             name="phone" 
             defaultValue = {empNewPhone}
            {...register("newPhone", {
              required: "Required",
            })}
          
     />
       <br/>
     
       <label class="col-4 text-right">Email:</label>
       <input 
           type="email" 
           class="col-8 "
           name="email" 
           defaultValue={empNewEmail}
           {...register("newEmail", {
            required: "Required",
           })} 
       />
  
       <br/>
 
       <button  class="mx-auto d-block mt-3 btn btn-success btn-sm" bsSize="large" 
               type="submit" primary id="UpdateBtn"  >Update</button>
  
   </form>
        </Modal.Body>

     
        <Modal.Footer>
          <Button variant="secondary" onClick={CloseP}>
            Close
          </Button>
       
        </Modal.Footer>
      </Modal>

      </>
    );

    }

export default UpdateProfile;
