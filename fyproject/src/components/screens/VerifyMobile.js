import React from 'react';
import { Formik, Form} from 'formik';
import firebase from './firebase';
import * as Yup from 'yup';
import axiosObject from '../../api/bootapi';
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';

function VerifyMobile({booking}){

    const sendData=(data)=>{
        axiosObject.post(`/register`,data).then(
          (response)=>{
            console.log(response);
            if(response.data==="Email"){
              toast.error('Email Already exist!!',{autoClose: 2000});
            }
            if(response.data==="Mobile"){
              toast.error('Mobile Number  Already exist!!',{autoClose: 2000});
            }
            if(response.data==="Username"){
              toast.error('Username  Already exist!!',{autoClose: 2000});
            }
            if(response.data==="Success"){
              toast.success('registration successful!',{autoClose: 2000});
              setTimeout(() => {  window.location.replace('/'); }, 2000);
            }
            if(response.data==="Error"){
              toast.error('Something went Wrong Try again!!',{autoClose: 2000});
            }
          
          },(error)=>{
            console.log(error);
            toast.error('registration failed!',{autoClose: 2000});
          }
        )
      }
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
          toast.error('registration failed!',{autoClose: 2000});
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
export default VerifyMobile;
