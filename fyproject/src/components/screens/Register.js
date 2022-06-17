import React, {useState,useEffect} from 'react';
import RegisterForm from './RegisterForm';
import RegisterFormRetailer from './RegisterFormRetailer';
import { Link } from "react-router-dom";
import '../styles/Register.css';
function Register(){
    useEffect(() => {
        document.title = "Fixmate  ||  Registration";
      },[]);
      const retailer = localStorage.getItem("retailer")
    return(
        <div className='temp'>
        <div className="container mt-5 ">
            <div className="row" style={{justifyContent:'space-around'}}>
               
                <div className="col-md-5 text-center">
                    {
                        retailer ?
                        <RegisterFormRetailer/>
                        :
                        <RegisterForm/>
                    }
                    <br></br>
                   <nav>
                    <Link id="loginlink" to="/"><h4 style={{color:'black'}}>Go to Welcome page!</h4></Link>
                  </nav>
                
                </div>
              
                 
                 
                   
              

            </div>
        </div>
        </div>
    );
}
export default Register;