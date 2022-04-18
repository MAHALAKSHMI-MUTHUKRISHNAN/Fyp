import React,{useEffect, useState} from 'react';
import { Formik, Form} from 'formik';
import TextBar from './TextBar';
import * as Yup from 'yup';
import axiosObject from '../../api/bootapi';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function AddServiceForm(){
  const getUser=()=>{
    axiosObject.get(`/mydetails`).then(
        (response)=>{
          console.log("user fetched");
          setUser(response.data);
        },(error)=>{
          console.log(error);
        }
      );
  };

  const [user,setUser] = useState([{"id":1,"mobile":"4534332323"}]);
  useEffect(() => {
    document.title = "WatchService || AddCenter";
    getUser();
  },[]);
  const validate = Yup.object({
    id:Yup.string()
      .required('Id is required'),
    name: Yup.string()
      .max(30, 'Must be 30 characters or less')
      .required('Name is Required'),
    sctype:Yup.string()
      .required('Type is required'),
    mobile:Yup.string()
      .min(10,'should be 10 number')
      .max(10,'should be 10 number')
      .required('Phone Number is Required'),
    address:Yup.string()
      .max(50, 'Must be 30 characters or less')
      .required('Address is Required'),
    imageurl:Yup.string()
      .required('Image url required'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    details: Yup.string()
      .max(250, 'Must be 250 characters or less')
      .required('Description is required'),
  })
  const sendData=(data)=>{
    axiosObject.post(`/addServiceCenter`,data).then(
      (response)=>{
        if(response.data==="id"){
          toast.error('Id should be unique',{autoClose: 2000});
        }
        if(response.data==="exist"){
          toast.error('Service center already exist',{autoClose: 2000});
        }else if(response.data==="success"){
          localStorage.setItem("isCenterAdded","true");
          toast.success('center added successfully',{autoClose: 2000});
          if(isAdmin)
          setTimeout(() => {  window.location.replace('/admin/home'); }, 2000);
          else if(isRetailer)
          setTimeout(() => {  window.location.replace('/retail/home'); }, 2000);
          //localStorage.setItem("isCenterAdded","true");
        }
        //look for good method this not the correct one
      },(error)=>{
        console.log(error);
      }
    )
  }
  const isAdmin = localStorage.getItem("isAdmin");
  const isRetailer = localStorage.getItem("isRetailer");
  return (
    <>
    <ToastContainer/>
    <Formik
      initialValues={{
        u_id:user.id,
        id:'',
        name: '',
        sctype: '',
        mobile: '',
        address:'',
        imageurl: '',
        email: '',
        details: '',
      }}
      validationSchema={validate}
      onSubmit={(values, { resetForm }) => {
      
        console.log(values);
        sendData(values);
        resetForm();
       
      }}
    >
      {formik => (
        <div>
          <h1 className='mt-4'style={{fontWeight:"bold"}} >Add Center </h1>
          <Form>
          
            <TextBar label="Center Id"  placeholder="Enter the id" name="id" type="number" id="addCenterId" />
            <TextBar label="Name"  placeholder="Enter the Name" name="name" type="text" id="addCenterName" />
            <TextBar label="Service Type"  placeholder="1-AC, 2-Paint, 3-Salon, 4-Car Service,5-Home Cleaning,6-Plumbing" name="sctype" type="text" id="addCenterType" />
            <TextBar label="Mobile"  placeholder="Enter the Phone number" name="mobile" type="text" id="addCenterNumber" />
            <TextBar label="Address"  placeholder="Enter the address" name="address" type="text" id="addCenterAddress" />
            <TextBar label="ImageUrl"  placeholder="Enter the Image Url" name="imageurl" type="text" id="addCenterImageUrl" />
            <TextBar label="Email"  placeholder="Enter the mail id" name="email" type="email" id="addCenterEmail"/>
            <TextBar  label="Description" placeholder="Description about Service center" name="details" type="text" id="addCenterDescription" style={{height:"80px"}}/>

            <button id="addCenterButton" className="btn btn-dark mt-3" type="submit">Add</button>
            <button id="resetbutton" className="btn btn-danger mt-3 ml-3"style={{marginLeft:15}} type="reset">Reset</button>
            
            
          </Form>

        </div>
      )}
    </Formik>
    </>
  )
} 
export default AddServiceForm;
