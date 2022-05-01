import React from 'react';
import { Formik, Form} from 'formik';
import TextBar from './TextBar';
import * as Yup from 'yup';
import axiosObject from '../../api/bootapi';
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from 'react-toastify';

function EditCharges({booking}){

    const validate = Yup.object({
        
      
    charges:Yup.string()
      .required('Enter the charges')
      
    })
    const sendData=(data)=>{
     
      let custemail = localStorage.getItem('email');
      var templateParams = {
       email : custemail,
       decision : 'Charges updated'
   };
   emailjs.send('service_zw5vono', 'template_o3wqthx', templateParams,'oM-ruoNGEgD2fdPNh')
   .then(function(response) {
      alert('SUCCESS!', response.status, response.text);
  
   }, function(error) {
      alert('FAILED...', error);
   });
      axiosObject.put(`/editCharges`,data).then(
        (response)=>{
          console.log(response);
          toast.success('Your service started',{autoClose: 500});
          setTimeout(() => { window.location.replace('/retail/booking'); }, 2000);
          
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
          book_id:booking.book_id,
          u_id:booking.u_id,
          sc_id:booking.sc_id,
          custName: booking.custName,
          custEmail: booking.custEmail,
          custAddress:  booking.custAddress,
          bookingDate:booking.bookingDate,
          contactNumber:booking.contactNumber,
          bookingTime:booking.bookingTime,
          problemStatement:booking.problemStatement,
          charges :booking.charges
        }}
        validationSchema={validate}
        onSubmit={values => {
        
          console.log(values);
          sendData(values);
          
        }}
      >
        {formik => (
          <div>
            <h1 className='mt-4'style={{fontWeight:"bold"}} >Enter the Charges </h1>
            <Form>
            
              <TextBar label="Charges"   name="charges" type="text" id="editCharges" />
              
              
             <button id="updateBookingButton" className="btn btn-dark mt-3" type="submit">Confirm</button>
              <button id="resetButton" className="btn btn-danger mt-3 ml-3"style={{marginLeft:15}} type="reset">Reset</button>
              
              
            </Form>
  
          </div>
        )}
      </Formik>
      </>
    )
  } 
export default EditCharges;
