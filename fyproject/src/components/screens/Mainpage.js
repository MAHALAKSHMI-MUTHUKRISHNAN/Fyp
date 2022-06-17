import React,{useEffect} from 'react';
import { Link } from "react-router-dom";

import '../styles/Mainpage.css';
function Mainpage(){
    useEffect(() => {
        document.title = "Fixmate  ||  Welcome";
       
      },[]);
    return(
        
        <div className="home" style={{display:"flex",flexDirection:"column",alignItems:'center',justifyContent:'center'}}>
            
                <h1 style={{color:"black",fontSize:70,marginBottom:40}}>We are here to fix your issues!</h1>
                <nav>
                    <Link id="login-main"className="btn btn-dark mt-3"to="user/login" onClick={localStorage.setItem("user","true")}>LOGIN</Link>
                
                    <Link id="signup-main"className="btn btn-danger mt-3 ml-3" to="user/register" onClick={localStorage.setItem("user","true")}>REGISTER</Link>
                
                <br></br>
                <br></br>
                    <Link id="loginlink" to="/"><h5 style={{color:'black'}}>Not a User?</h5></Link>
                </nav>

            </div>

            
    );
    }
    export default Mainpage;
