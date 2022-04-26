import React from 'react';
import { Formik, Form} from 'formik';
import TextBar from './TextBar';
import * as Yup from 'yup';
import axiosObject from '../../api/bootapi';

function EditCharges({booking}){

    const validate = Yup.object({
        
      
    charges:Yup.string()
      .required('Enter the charges')
      
    })
    const sendData=(data)=>{
      axiosObject.put(`/editCharges`,data).then(
        (response)=>{
          console.log(response);
          window.location.replace('/retail/booking');
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
    )
  } 
export default EditCharges;
