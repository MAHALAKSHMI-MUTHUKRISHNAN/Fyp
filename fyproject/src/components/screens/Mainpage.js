import React,{useEffect} from 'react';
import { Link } from "react-router-dom";

import '../styles/Mainpage.css';
function Mainpage(){
    useEffect(() => {
        document.title = "WatchService  ||  Welcome";
        localStorage.clear();
      },[]);
    return(
        
        <div className="home" style={{display:"flex",flexDirection:"column",alignItems:'center',justifyContent:'center'}}>
            
                <h1 style={{color:"black",fontSize:70,marginBottom:40}}>WELCOME TO WATCH SERVICE</h1>
                <nav>
                    <Link id="login-main"className="btn btn-dark mt-3"to="/Login">Click here to Login</Link>
                
                    <Link id="signup-main"className="btn btn-danger mt-3 ml-3" to="/Register">Register</Link>
                </nav>

            </div>

            
    );
    }
    export default Mainpage;
