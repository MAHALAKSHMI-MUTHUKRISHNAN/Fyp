import React, {useState,useEffect} from 'react';
import LoginForm from "./LoginForm";
import watchImg from '../assets/watch.png';
import '../styles/Login.css';
function Login(){
    useEffect(() => {
        document.title = "WatchService  ||  Login";
      },[]);
      
    return(
        <div className='temp'>
        <div className="container mt-5 ">
            <div className="row" style={{justifyContent:'space-around'}}>
                
                <div className="col-md-5 text-center">
                    <LoginForm/>
                </div>

            </div>
        </div>
        </div>
    );
}
export default Login;