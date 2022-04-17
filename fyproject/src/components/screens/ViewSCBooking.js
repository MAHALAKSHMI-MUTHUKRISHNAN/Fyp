import React, { useEffect, useState } from "react";
import axiosObject from "../../api/bootapi";
import NavbarUser from './NavbarUser';
import Table from '@mui/material/Table';
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import '../styles/MyBookings.css';


function ViewSCBooking(){
    let id = localStorage.getItem('centerId');
    const [data,setData] = useState([
        {
            book_id:'1',
            productName:"Sonata Service",
            bookingDate:"27/2/2022",
            bookingTime:"4pm to 6pm",
        },
    ]);
    const getSCBookings=()=>{
        axiosObject.get(`/getAppointmentbyCenter/${id}`).then(
            (response)=>{
              console.log("booking fetched");
              setData(response.data);
            },(error)=>{
              console.log(error);
            }
          );
    };


    useEffect(()=>{
    document.title= "watchService || CenterBookings" 
    getSCBookings();
    },[]);

  
    
        return(
     <>
         <NavbarUser/>
     <div className="home-body"style={{color:"black",margin:'auto',fontWeight:'bolder'}}>
       
         <h1 style={{textAlign:'center',paddingTop:'10%'}}>Bookings</h1>
         
         <Table style={{width:'50%', margin:'auto'}}>
        
         <TableHead style={{fontWeight:"bolder"}}>
             <TableCell>Booking No.</TableCell>
         <TableCell>Product Name</TableCell>
         <TableCell>Date</TableCell>
         <TableCell>Time</TableCell>
         </TableHead>
                    <TableBody>
                       {
                           data.map(val => {
                               return(
                                
                                   <TableRow key="key">
                                       <TableCell>{val.book_id}</TableCell>
                                <TableCell>{val.productName}</TableCell>
                                <TableCell>{val.bookingDate}</TableCell>
                                <TableCell>{val.bookingTime}</TableCell>
                               
                                  </TableRow>
                                )})
                       }
                    </TableBody>
                    </Table>
                  
     </div>
     
     </>
     )}

 

export default ViewSCBooking;