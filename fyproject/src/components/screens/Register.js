import React, {useState,useEffect} from 'react';
import RegisterForm from './RegisterForm';
import watchImg from '../assets/watch.png';
import '../styles/Register.css';
function Register(){
    useEffect(() => {
        document.title = "WatchService  ||  Registration";
      },[]);
      const[time,setTime]= useState("0:0");
      setInterval(updateTime,1000);
      function updateTime(){
          const obj = new Date();
           var current = obj.getHours()+":"+obj.getMinutes();
          setTime(current);
      }
    return(
        <div className='temp'>
        <div className="container mt-5 ">
            <div className="row" style={{justifyContent:'space-around'}}>
                <div className="col-md-5" style={{position:'relative'}}>
                    <img src={watchImg} alt="" className="img-fluid mt-3 w-100" />
                    <p className="watch">{time}</p>
                </div>
                <div className="col-md-5 text-center">
                    <RegisterForm/>
                </div>

            </div>
        </div>
        </div>
    );
}
export default Register;