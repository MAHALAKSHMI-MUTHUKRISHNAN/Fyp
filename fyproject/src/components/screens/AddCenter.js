import React, {useState,useEffect} from 'react';
import watchImg from '../assets/watch.png';
import '../styles/AddCenter.css';
import AddServiceForm from './AddService';
import NavBar from './Navbar';
import NavBarRetail from './NavbarRetail';
function AddCenter(){
    useEffect(() => {
        document.title = "WatchService || AddCenter";
      },[]);
      const[time,setTime]= useState("0:0");
      setInterval(updateTime,1000);
      function updateTime(){
          const obj = new Date();
           var current = obj.getHours()+":"+obj.getMinutes();
          setTime(current);
      }
      const isAdmin = localStorage.getItem("isAdmin");
    return(
        <>
        {isAdmin ?<NavBar/>:<NavBarRetail/>
        }
        
        <div className='temp'>
        <div className="container mt-5 ">
            <div className="row" style={{justifyContent:'space-around'}}>
                <div className="col-md-5" style={{position:'relative'}}>
                    <img src={watchImg} alt="" className="img-fluid mx-auto my-auto w-100" />
                    <p className="watchtime">{time}</p>
                </div>
                <div className="col-md-5 text-center">
                    <AddServiceForm/>
                </div>

            </div>
        </div>
        </div>
        </>
    );
}
export default AddCenter;