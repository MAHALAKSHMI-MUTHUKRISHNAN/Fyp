import React, {useState,useEffect} from 'react';
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";
import LoginFormRetailer from "./LoginFormRetailer";
import watchImg from '../assets/watch.png';
import '../styles/Login.css';
function Login(){
    useEffect(() => {
        document.title = "Fixmate ||  Login";
      },[]);
      const retailer = localStorage.getItem('retailer');
    return(
        <div className='temp'>
        <div className="container mt-5 ">
            <div className="row" style={{justifyContent:'space-around'}}>
                
                <div className="col-md-5 text-center">
                    {
                        retailer ?
                        <LoginFormRetailer/>

                        :
                        <LoginForm/>
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
export default Login;