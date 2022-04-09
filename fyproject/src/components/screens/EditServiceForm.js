import React from 'react';
import { Formik, Form} from 'formik';
import TextBar from './TextBar';
import * as Yup from 'yup';
import axiosObject from '../../api/bootapi';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


function EditServiceForm(){

  let center=JSON.parse(localStorage.getItem('data'));
  
  const validate = Yup.object({
    id:Yup.string()
      .required('Id is required'),
    name: Yup.string()
      .max(30, 'Must be 30 characters or less')
      .required('Name is Required'),
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
    axiosObject.put(`/updateCenter`,data).then(
      (response)=>{
        if(response.data==="exist"){
          toast.error('Service center already exist',{autoClose: 2000});
        }else if(response.data==="success"){
          localStorage.removeItem('data');
          toast.success('center edited successfully',{autoClose: 2000});
          setTimeout(() => {  window.location.replace('/admin/home'); }, 2000);
        }
      },(error)=>{
        console.log(error);
      }
    )
  }
  return (
    <>
    <ToastContainer/>
    <Formik
      initialValues={{
        id:center.id,
        name:center.name,
        mobile: center.mobile,
        address:center.address,
        imageurl: center.imageurl,
        email: center.email,
        details: center.details,
      }}
      validationSchema={validate}
      onSubmit={values => {
      
        console.log(values);
        sendData(values);
      }}
    >
      {formik => (
        <div>
          <h1 className='mt-4'style={{fontWeight:"bold"}} >Edit Center </h1>
          <Form>
          
            <TextBar readOnly={true} label="Center Id"   name="id" type="number" id="editCenterId" />
            <TextBar label="Name"   name="name" type="text" id="editCenterName" />
            <TextBar label="Mobile"   name="mobile" type="number" id="editCenterNumber" />
            <TextBar label="Address" name="address" type="text" id="editCenterAddress" />
            <TextBar label="ImageUrl"  name="imageurl" type="text" id="editCenterImageUrl" />
            <TextBar label="Email"   name="email" type="email" id="editCenterEmail"/>
            <TextBar  label="Description"  name="details" type="text" id="editCenterDescription" style={{height:"80px"}}/>

            
           <button id="updateServiceCenterButton" className="btn btn-dark mt-3" type="submit">Update</button>
            <button id="resetbutton" className="btn btn-danger mt-3 ml-3"style={{marginLeft:15}} type="reset">Reset</button>
            
            
          </Form>

        </div>
      )}
    </Formik>
    </>
  )
} 
export default EditServiceForm;