import React, {useState,useEffect} from 'react';
import RegisterForm from './RegisterForm';
import '../styles/Register.css';
function Register(){
    useEffect(() => {
        document.title = "WatchService  ||  Registration";
      },[]);
      
    return(
        <div className='temp'>
        <div className="container mt-5 ">
            <div className="row" style={{justifyContent:'space-around'}}>
               
                <div className="col-md-5 text-center">
                    <RegisterForm/>
                </div>

            </div>
        </div>
        </div>
    );
}
export default Register;