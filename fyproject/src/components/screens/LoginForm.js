import React from 'react';
import { ErrorMessage,Formik, Form} from 'formik';
import TextBar from './TextBar';
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import axiosObject from '../../api/bootapi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function LoginForm(){
  const validate = Yup.object({
    
    username: Yup.string()
      .required('Username is required'),
    password: Yup.string()
      .required('Password is required'),
  })
  const sendData=(data)=>{
    console.log("I'm here");
    axiosObject.post("/authenticate",data).then(res=>{
      console.log(res);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("usertoken",res.data.jwtToken);
      if(data.role==="admin") {
        localStorage.setItem("isAdmin","true");
        toast.success('Welcome Admin',{autoClose: 2000});
        setTimeout(() => { window.location.replace('/admin/home'); }, 2000);
        
      } else if(data.role==="retailer"){
        localStorage.setItem("isRetailer","true");
        toast.success('Welcome Retailer',{autoClose: 2000});
        setTimeout(() => {  window.location.replace('/retail/home'); }, 2000);
      }
     else{
      localStorage.setItem("isUser","true");
      toast.success('Welcome User',{autoClose: 2000});
      setTimeout(() => {  window.location.replace('/user/home'); }, 2000);
    }
    }).catch(err=>{
      console.log(err);
      toast.error('Invalid Credentials',{autoClose: 2000});
    })
  }
  return (
    <>
    <ToastContainer/>
    <Formik
      initialValues={{
        username: '',
        password: '',
        role:'',
      }}
      validationSchema={validate}
      onSubmit={values => {
        console.log(values);
        sendData(values);
      }}
    >
      {formik => (
        <div>
          <h1 className='mt-4'style={{color:"black",fontWeight:"bold"}} >Login</h1>
          <Form>
          
            <TextBar id="username" label="username" name="username" type="text" />
            <TextBar id="password" label="password" name="password" type="password" />
            <TextBar id="role" label="role" name="role" type="text" />
            {/* <div className="mb-2">
      <label htmlFor="role" style={{color:"black",display:"flex",justifyContent:'flex-start',fontSize:17}}>Role</label>
      <select name="role" id="role" className={`form-control shadow-none`}>
  <option value="user" >User</option>
  <option value="retailer">Retailer</option>
  <option value="admin">Admin</option>
</select>

<ErrorMessage component="div" name="role" style={{color:"red",display:"flex"}}/>
    </div> */}
            <span className="">
                  New User
                  <nav>
                    <Link id="registerlink" to="/Register"><h4 style={{color:'black'}}>Signup</h4></Link>
                  </nav>
                </span>
            <button id="loginbutton" className="btn btn-dark mt-3" type="submit">Login</button>
            <button id="resetbutton" className="btn btn-danger mt-3 ml-3"style={{marginLeft:15}} type="reset">Reset</button>
          </Form>
        </div>
      )}
    </Formik>
    </>
  )
} 
export default LoginForm;
