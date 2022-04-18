import React,{useEffect, useState} from 'react';
import { Formik, Form} from 'formik';
import TextBar from './TextBar';
import * as Yup from 'yup';
import axiosObject from '../../api/bootapi';
import '../styles/Appointments.css';
import NavbarUser from './NavbarUser';
import CenterImages from '../assets/centerImages/CenterImages';
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
    document.title= "watchService || SlotBooking"
    getUser();
    },[]);
  const validate = Yup.object({
    productName: Yup.string()
      
      .required('Name of the product is Required'),
    productModelNo: Yup.string()
      .required('Model number is Required'),
    // contactNumber:Yup.string()
    //   .min(10,'should be 10 number')
    //   .max(10,'should be 10 number')
    //   .required('Mobile Number is Required'),
    purchaseDate: Yup.date()
      .transform((curr, orig) => orig === '' ? null : curr)
      .required('Date is required')
      .nullable()
      .max(new Date(), "Purchase date should be today or before!")
      ,
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
  const postDatatoServer=(data)=>{
    axiosObject.post(`/appointment`,data).then(
      (response)=>{
        console.log(response);
        localStorage.removeItem('SelectedCenter');
        window.location.replace("/user/mybooking");
      
      },(error)=>{
        console.log(error);
        console.log("error");
      }
    )
  }
  return (
    <div className='App-temp'>
    <NavbarUser/>
    <Formik
    enableReinitialize={true}
      initialValues={{
        u_id:user.id,
        sc_id:center.id,
        productName: '',
        productModelNo: '',
        contactNumber:user.mobile,
        purchaseDate: '',
        bookingDate:'',
        bookingTime:'',
        problemStatement:  '',
      }}
      validationSchema={validate}
      onSubmit={values => {
      
        console.log(values);
        postDatatoServer(values);
      }}
    >
      {formik => (
        <div className='contents' >
          <div className='Regdiv row'>
            <div className='col-md-6 left'>
              <img src={CenterImages[center.imageurl]} alt="" className="img" />
              <div className='address'>
                  <label>Name : {center.name}</label><br />
                  <label>Address :{center.address}</label><br />
                  <label>E-mail:{center.email}</label><br />
                  <label>Phone Number: {center.mobile}</label><br />
              </div>
            </div>
            <div className='col-md-6'>
              <Form>
                <div className='inp'>
                  <h1 className='mt-4'style={{fontWeight:"bold", paddingBottom: "2vh"}} >Product Details</h1>
                  <TextBar id="productname" label="Name of Product" placeholder="Enter product name" name="productName" type="text" />
                  <TextBar id="modelnumber" label="Model Number" placeholder="Enter model number" name="productModelNo" type="text" />
                  <TextBar id="contactnumber" label="Mobile" name="contactNumber" type="text" />
                  <TextBar id="purchasedate" label="Date of Purchase" name="purchaseDate" type="date" />
                  <TextBar id="bookingdate" label="Date of booking" name="bookingDate" type="date" />
                  <TextBar id="bookingtime" label="Time of booking" placeholder="choose time in 24hr format" name="bookingTime" type="time" />
                  <TextBar id="problemstatement" label="Problem" placeholder="Description about problem" name="problemStatement" type="text" style={{height:"80px"}}/>
                  <button id="resetbutton" className="btn btn-dark mt-3 ml-3"style={{marginLeft:15}} type="reset">Reset</button>
                  <button id="bookappointmentbutton" className="btn btn-success mt-3"style={{marginLeft:40}} type="submit">BOOK</button>
                </div> 
              </Form>
            </div>
          </div>
        </div>
      )}
    </Formik>
    </div>
  )
} 
export default Appoinments;
