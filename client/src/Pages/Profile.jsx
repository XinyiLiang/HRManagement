import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {EmpProfile} from '../components/EmpProfile'
//import axios from 'axios';

const empname = sessionStorage.getItem("name");

export const Profile = () =>(
      
          <EmpProfile />


    )
export default Profile;
