import React from 'react';
import { Formik, Form} from 'formik';
import TextBar from './TextBar';
import * as Yup from 'yup';
import axiosObject from '../../api/bootapi';

function EditBooking({booking}){

    const validate = Yup.object({
        
      productName: Yup.string()
      
      .required('Name of the product is Required'),
    productModelNo: Yup.string()
      .required('Model number is Required'),
    contactNumber:Yup.string()
      .min(10,'should be 10 number')
      .max(10,'should be 10 number')
      .required('Mobile Number is Required'),
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
          u_id:booking.u_id,
          sc_id:booking.sc_id,
          productName:booking.productName,
          productModelNo:booking.productModelNo,
          purchaseDate:booking.purchaseDate,
          bookingDate:booking.bookingDate,
          contactNumber:booking.contactNumber,
          bookingTime:booking.bookingTime,
          problemStatement:booking.problemStatement,
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
            
              <TextBar label="Product Name"   name="productName" type="text" id="editName" />
              <TextBar label="ModelNumber"   name="productModelNo" type="text" id="editNumber" />
              <TextBar label="DateOfPurchase" name="purchaseDate" type="date" id="editPurchaseDate" />
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
