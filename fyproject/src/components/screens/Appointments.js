import React,{useEffect, useState} from 'react';
import { Formik, Form} from 'formik';
import TextBar from './TextBar';
import * as Yup from 'yup';
import axiosObject from '../../api/bootapi';
import '../styles/Appointments.css';
import NavbarUser from './NavbarUser';
import { Modal,Button,OverlayTrigger,Tooltip } from "react-bootstrap";
import VerifyMobileForBook from './VerifyMobileForBook';
import CenterImages from '../assets/centerImages/CenterImages';
import emailjs from "@emailjs/browser";

function Appoinments(){
  let center=JSON.parse(localStorage.getItem('SelectedCenter'));
 
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
  
  useEffect(()=>{
    document.title= "Fixmate || SlotBooking"
    getUser();
    },[]);
  const validate = Yup.object({
    custName: Yup.string()
      
      .required('Name is Required'),
    custEmail: Yup.string()
      .required('Email is Required'),
      custAddress: Yup.string()
      .required('Address is Required'),
    
    bookingDate: Yup.date()
    .transform((curr, orig) => orig === '' ? null : curr)
    .required('Date is required')
    .nullable()
    .min(new Date(), "Booking date should be from tomorrow!")
,
    problemStatement:  Yup.string()
      .required('Please enter the problem of the product'),
    bookingTime:Yup.string()
      .required('Please mention time from 10.00AM to 7.00 PM')
      
  })

  const getCoordinates = (position) =>{
    console.log(position.coords.latitude);
   localStorage.setItem("longs",position.coords.longitude);
   localStorage.setItem("lats",position.coords.latitude);
    console.log(lat);
    console.log(long);
   window.location.reload();
    
  
  }
 
  const geoLocation = ()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(getCoordinates);
    }
    else{
      alert("Not supported");
    }
   
  }
  const lat = localStorage.getItem('lats');
  const long = localStorage.getItem('longs');
 

  const [modalData,setModalData] = useState([
    {
       
    },
]);

  const[show,setShow]=useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  return (
    <div className='App-temp'>
    <NavbarUser/>
    <Formik
    enableReinitialize={true}
      initialValues={{
        u_id:user.id,
        sc_id:center.id,
        lattitude : lat,
        longitude : long,
        custName: user.name,
        custEmail: user.email,
        custAddress: '',
        contactNumber:user.mobile,
        bookingDate:'',
        bookingTime:'',
        problemStatement:  '',
      }}
      validationSchema={validate}
      onSubmit={values => {
        setModalData(values);
        localStorage.setItem('centerEmail',center.email);
        handleShow();
        console.log(values);
       
      }}
    >
      {formik => (
        <div className='contents' >
          <div className='Regdiv row'>
            <div className='col-md-6 left'>
              <img src={center.imageurl} alt="" className="img" />
              <div className='address'>
                  <label>Name : {center.name}</label><br />
                  {/* <label>Address :{center.address}</label><br /> */}
                  <label>Services :{center.details}</label><br />
                  
              </div>
            </div>
            <div className='col-md-6'>
              <Form>
                <div className='inp'>
                  <h1 className='mt-4'style={{fontWeight:"bold", paddingBottom: "2vh"}} >Product Details</h1>
                  <button id="location" className="btn btn-dark mt-3" type="button" onClick={geoLocation}>Get Location</button>
                  <TextBar id="problemStatement" label="Problem" placeholder="What are the service needed?" name="problemStatement" type="text" style={{height:"80px"}}/>
                  <TextBar id="bookingdate" label="Date of booking" name="bookingDate" type="date" />
                  <TextBar id="bookingtime" label="Time of booking" placeholder="choose time in 24hr format" name="bookingTime" type="time" />
                  <TextBar id="custName" label="Customer Name" placeholder="Enter your name" name="custName" type="text" />
                  <TextBar id="custEmail" label="Customer Email" placeholder="Enter your email" name="custEmail" type="text" />
                  <TextBar label="lat"  placeholder="Enter the address" name="lattitude"  type="text" id="addCenterAddress" />
            <TextBar label="long"  placeholder="Enter the address" name="longitude" type="text"  id="addCenterAddress" />
            <TextBar id="custAddress" label="Customer Address" placeholder="Place where service to be done" name="custAddress" type="text" style={{height:"50px"}} />
                  <TextBar id="contactnumber" label="Mobile" name="contactNumber" type="text" />
                  <button id="resetbutton" className="btn btn-dark mt-3 ml-3"style={{marginLeft:15}} type="reset">Reset</button>
                  <button id="bookappointmentbutton" className="btn btn-success mt-3"style={{marginLeft:40}} type="submit">BOOK</button>
                </div> 
              </Form>
            </div>
          </div>
        </div>
      )}
    </Formik>
    <Modal show={show} onHide={handleClose} >
                        <Modal.Header closeButton>
                            <Modal.Body>
                                <VerifyMobileForBook booking={modalData}/>
                            </Modal.Body>
                        </Modal.Header>

                    </Modal>
    </div>
  )
} 
export default Appoinments;
