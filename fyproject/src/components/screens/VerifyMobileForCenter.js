import React from 'react';
import { Formik, Form} from 'formik';
import firebase from './firebase';
import * as Yup from 'yup';
import axiosObject from '../../api/bootapi';
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';

function VerifyMobileForCenter({booking}){

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
              localStorage.setItem("isCenterAdded","true");
            }
            //look for good method this not the correct one
          },(error)=>{
            console.log(error);
          }
        )
      }
    
      const isAdmin = localStorage.getItem("isAdmin");
      const isRetailer = localStorage.getItem("isRetailer");
    const [num,setNum] = useState('');
    const [otp,setOtp] = useState('');
   
      const configureCaptcha = () =>{
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
          'size': 'invisible',
          'callback': (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            this.onSignInSubmit();
            console.log("Recaptcha varified")
          },
          defaultCountry: "IN"
        });
      }
    const   onSignInSubmit = (e) => {
        e.preventDefault();
    configureCaptcha();
        const phoneNumber = "+91" + booking.mobile;
        console.log(phoneNumber)
        const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
              // SMS sent. Prompt user to type the code from the message, then sign the
              // user in with confirmationResult.confirm(code).
              window.confirmationResult = confirmationResult;
              console.log("OTP has been sent")
              
              // ...
            }).catch((error) => {
              // Error; SMS not sent
              // ...
              console.log("SMS not sent")
            });
      }
      const onSubmitOTP = (e) =>{
        e.preventDefault()
        const code = otp;
        console.log(code)
        window.confirmationResult.confirm(code).then((result) => {
          // User signed in successfully.
          localStorage.setItem("userverified","true");
          alert("User is verified");
          sendData(booking);
          // ...
        }).catch((error) => {
          // User couldn't sign in (bad verification code?)
          localStorage.setItem("usernotverified","true");
          alert("User not verified")
          toast.error('Adding center failed!',{autoClose: 2000});
          // ...
        });
      }

     
  
    
    return (
      <>
      <ToastContainer/>
      <div>
        <h2>Verify Mobile number</h2>
        <form onSubmit={onSignInSubmit}>
          <div id="sign-in-button"></div>
          <input type="number" name="mobile" placeholder="Mobile number" value={booking.mobile} required />
          <button type="submit">Submit</button>
        </form>

        <h2>Enter OTP</h2>
        <form onSubmit={onSubmitOTP}>
          <input type="number" name="otp" placeholder="OTP Number" value={otp} required onChange={e=> setOtp(e.target.value)}/>
          <button type="submit">Submit</button>
        </form>
      </div>
      </>
    )
  } 
export default VerifyMobileForCenter;
