
import React,{useEffect} from 'react';
import { Link } from "react-router-dom";

import '../styles/Mainpage.css';
function Linking(){
   
      const [pay,setPay] = useState([
        {
            book_id:'1',
            productName:"Sonata Service",
            bookingDate:"27/2/2022",
            bookingTime:"4pm to 6pm",
        },
    ]);
    const getUserBookings=()=>{
        axiosObject.get(`/getAppointments/user`).then(
            (response)=>{
              console.log("booking fetched");
              setPay(response.data);
            },(error)=>{
              console.log(error);
            }
          );
    };
    useEffect(() => {
        document.title = "WatchService  ||  Welcome";
        localStorage.clear();
      },[]);
    return(
        
        <div className="home" style={{display:"flex",flexDirection:"column",alignItems:'center',justifyContent:'center'}}>
                    <button style = {{backgroundColor:"#42C2FF",borderRadius:5,color:"white"}} id="paymentbutton" onClick={() => {localStorage.setItem("appId",val.book_id);  handlepay();} }>payment</button>
                                         
                <h1 style={{color:"black",fontSize:70,marginBottom:40}}>Directing you to payment page</h1>
             

            </div>

            
    );
    }
    export default Linking;
