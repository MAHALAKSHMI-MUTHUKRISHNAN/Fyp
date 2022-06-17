import React,{useEffect, useState} from 'react';
import { Formik, Form} from 'formik';
import TextBar from './TextBar';
import * as Yup from 'yup';
import axiosObject from '../../api/bootapi';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import VerifyMobileForCenter from './VerifyMobileForCenter';

import { Modal} from "react-bootstrap";

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
const geoLocation = ()=>{
  console.log("clicked");
  if(navigator.geolocation){
   
    navigator.geolocation.getCurrentPosition(getCoordinates);
    
  }
  else{
    alert("Not supported");
  }
 
}
const lat = localStorage.getItem('lats');
const long = localStorage.getItem('longs');
const getCoordinates = (position) =>{
  console.log("received");
  console.log(position.coords.latitude);
 localStorage.setItem("longs",position.coords.longitude);
 localStorage.setItem("lats",position.coords.latitude);
  console.log(lat);
  console.log(long);
 window.location.reload();
  

}
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
      .max(100, 'Must be 30 characters or less')
      .required('Address is Required'),
    imageurl:Yup.string()
      .required('Image url required'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
    details: Yup.string()
      .max(500, 'Must be 250 characters or less')
      .required('Description is required'),
  })
  

  const [modalData,setModalData] = useState([
    {
       
    },
]);

  const[show,setShow]=useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

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
        lattitude : lat,
        longitude : long,
        address:'',
        imageurl: '',
        email:'',
        details: '',
      }}
      validationSchema={validate}
      onSubmit={(values, { resetForm }) => {
        setModalData(values);
        handleShow();
        console.log(values);
        console.log(values.lattitude);
        
        resetForm();
       
      }}
    >
      {formik => (
        <div>
          <h1 className='mt-4'style={{fontWeight:"bold"}} >Add Center </h1>
          <Form>
          <button id="location" className="btn btn-dark mt-3" type="button" onClick={geoLocation}>Get Location</button>
            <TextBar label="Center Id"  placeholder="Enter the id" name="id" type="number" id="addCenterId" />
            <TextBar label="Name"  placeholder="Enter the Name" name="name" type="text" id="addCenterName" />
            <TextBar label="Service Type"  placeholder="1-AC, 2-Paint, 3-Salon, 4-Car Service,5-Home Cleaning,6-Plumbing" name="sctype" type="text" id="addCenterType" />
            <TextBar label="Mobile"  placeholder="Enter the Phone number" name="mobile" type="text" id="addCenterNumber" />
           
            <TextBar label="lat"  placeholder="Enter the address" name="lattitude"  type="text" id="addCenterAddress" />
            <TextBar label="long"  placeholder="Enter the address" name="longitude" type="text"  id="addCenterAddress" />
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
    <Modal show={show} onHide={handleClose} >
                        <Modal.Header closeButton>
                            <Modal.Body>
                                <VerifyMobileForCenter booking={modalData}/>
                            </Modal.Body>
                        </Modal.Header>

                    </Modal>
    </>
  )
} 
export default AddServiceForm;
