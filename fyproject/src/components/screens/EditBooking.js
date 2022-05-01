import React,{useEffect, useState} from 'react';
import { Formik, Form} from 'formik';
import TextBar from './TextBar';
import * as Yup from 'yup';
import axiosObject from '../../api/bootapi';

function EditBooking({booking}){

    const validate = Yup.object({
        
      custName: Yup.string()
      
      .required('Name is Required'),
    custEmail: Yup.string()
      .required('Email is Required'),
      custAddress: Yup.string()
      .required('Address is Required'),
    contactNumber:Yup.string()
      .min(10,'should be 10 number')
      .max(10,'should be 10 number')
      .required('Mobile Number is Required'),
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

    const sendData=(data)=>{
      axiosObject.put(`/editAppointment`,data).then(
        (response)=>{
          console.log(response);
          window.location.replace('/user/mybooking');
        },(error)=>{
          console.log(error);
        }
      )
    }
    
    return (
      <Formik
        initialValues={{
        book_id:booking.book_id,
        u_id:user.id,
        sc_id:booking.sc_id,
        custName: booking.custName,
        custEmail: booking.custEmail,
        custAddress:  booking.custAddress,
        contactNumber: booking.contactNumber,
        bookingDate: booking.bookingDate,
        bookingTime: booking.bookingTime,
        problemStatement:  booking.problemStatement,

         
        }}
        validationSchema={validate}
        onSubmit={values => {
        
          console.log(values);
          sendData(values);
          
        }}
      >
        {formik => (
          <div>
            <h1 className='mt-4'style={{fontWeight:"bold"}} >Enter the Product Details </h1>
            <Form>
            
              <TextBar label="Customer Name"   name="custName" type="text" id="editName" />
              <TextBar label="Customer Email"   name="custEmail" type="text" id="editNumber" />
              <TextBar label="Customer Address" name="custAddress" type="text" id="editCustomerAddress" />
              <TextBar label="DateOfBooking" name="bookingDate" type="date" id="editBookingDate" />
              <TextBar label="Contact"  name="contactNumber" type="text" id="editContact" />
              <TextBar  label="Slot Time"  name="bookingTime" type="time" id="editBookingTime" />
              <TextBar label="Problem"   name="problemStatement" type="text" id="editProblemStatement"style={{height:"80px"}}/>
  
              
             <button id="updateBookingButton" className="btn btn-dark mt-3" type="submit">Update</button>
              <button id="resetButton" className="btn btn-danger mt-3 ml-3"style={{marginLeft:15}} type="reset">Reset</button>
              
              
            </Form>
  
          </div>
        )}
      </Formik>
    )
  } 
export default EditBooking;
