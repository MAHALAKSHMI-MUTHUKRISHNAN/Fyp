import React,{useEffect} from 'react';
import { Link } from "react-router-dom";

import '../styles/Mainpage.css';
function MainpageRetailer(){
    useEffect(() => {
        document.title = "Fixmate  ||  Welcome";
      
      },[]);
    return(
        
        <div className="home" style={{display:"flex",flexDirection:"column",alignItems:'center',justifyContent:'center'}}>
            
                <h1 style={{color:"black",fontSize:70,marginBottom:40}}>Let your services be known to everyone!</h1>
                <nav>
                    <Link id="login-main"className="btn btn-dark mt-3"to="/retailer/login" onClick={localStorage.setItem("retailer","true")}>LOGIN</Link>
                
                    <Link id="signup-main"className="btn btn-danger mt-3 ml-3" to="/retailer/register"  onClick={localStorage.setItem("retailer","true")}>REGISTER</Link>
<br></br><br></br>
                    <Link id="loginlink" to="/"><h5 style={{color:'black',textDecoration:'none'}}>Not a service provider?</h5></Link>
                </nav>

            </div>

            
    );
    }
    export default MainpageRetailer;
