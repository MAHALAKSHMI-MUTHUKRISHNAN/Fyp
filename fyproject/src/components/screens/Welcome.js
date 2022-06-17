import React,{useEffect} from 'react';
import { Link } from "react-router-dom";

import '../styles/Mainpage.css';
function Welcome(){
    useEffect(() => {
        document.title = "Fixmate  ||  Welcome";
        localStorage.clear();
      },[]);
    return(
        
        <div className="home" style={{display:"flex",flexDirection:"column",alignItems:'center',justifyContent:'center'}}>
            
                <h1 style={{color:"black",fontSize:70,marginBottom:40}}>WELCOME TO FIX MATE</h1>
                <nav>
                    <Link id="login-main"className="btn btn-dark mt-3"to="/user">Customer </Link>
                
                    <Link id="signup-main"className="btn btn-dark mt-3 ml-3" to="/retailer">Service Provider </Link>
                </nav>
<nav>
<Link id="signup-main"className="btn btn-danger mt-3 ml-3" to="/admin/login">Admin </Link>
</nav>
            </div>

            
    );
    }
    export default Welcome;
