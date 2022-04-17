import React, { useEffect, useState } from "react";
import axiosObject from "../../api/bootapi";
import NavBar from "./Navbar";
import Table from '@mui/material/Table';
import '../styles/MyBookings.css';

import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";

function AllBookings(){
    const getAllBookings=()=>{
        axiosObject.get(`/getAppointments`).then(
            (response)=>{
              console.log("Appointments fetched");
              setData(response.data);
            },(error)=>{
              console.log(error);
            }
          );
    };
    useEffect(()=>{
    document.title= "watchService || AllBooking"
    getAllBookings();
    },[]);
    const [data,setData] = useState([
        {
            book_id:'1',
            productName:"Sonata Service",
            bookingDate:"27/2/2022",
            bookingTime:"4pm to 6pm",
        },
    ]);
 return(
     <>
         <NavBar/>
     <div className="home-body"style={{color:"black",margin:'auto',fontWeight:'bolder'}}>
         <h1 style={{textAlign:'center',paddingTop:'10%'}}>Bookings</h1>
         

         
         <Table style={{width:'50%', margin:'auto' }}>
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
 )
}
export default AllBookings;