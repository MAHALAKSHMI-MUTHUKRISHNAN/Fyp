import React, { useEffect, useState } from "react";
import axiosObject from "../../api/bootapi";
import NavbarRetail from './NavbarRetail';
import Table from '@mui/material/Table';

import EditCharges from "./EditCharges";
import { Modal,Button,OverlayTrigger,Tooltip } from "react-bootstrap";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import '../styles/MyBookings.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from "@emailjs/browser";


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
    const handleservice=()=>{
        let id = localStorage.getItem('appId');
        let custemail = localStorage.getItem('email');
        var templateParams = {
         email : custemail,
         decision : 'Service is started'
     };
     emailjs.send('service_zw5vono', 'template_o3wqthx', templateParams,'oM-ruoNGEgD2fdPNh')
     .then(function(response) {
      
        
     }, function(error) {
        alert('FAILED...', error);
     });
        axiosObject.put(`/servicestart/${id}`).then(
          (response)=>{
            localStorage.removeItem("appId");
            toast.success('Your service started',{autoClose: 500});
            setTimeout(() => { window.location.replace('/retail/booking'); }, 2000);
          },(error)=>{
            console.log(error);
          }
        )
      }
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

    const handleStatusAccept=()=>{
      let id = localStorage.getItem('appId');
      let custemail = localStorage.getItem('email');
      var templateParams = {
       email : custemail,
       decision : 'Booking is Accepted'
   };
   emailjs.send('service_zw5vono', 'template_o3wqthx', templateParams,'oM-ruoNGEgD2fdPNh')
   .then(function(response) {
      alert('SUCCESS!', response.status, response.text);
  
   }, function(error) {
      alert('FAILED...', error);
   });
      axiosObject.put(`/statusaccept/${id}`).then(
        (response)=>{
          localStorage.removeItem("appId");
          toast.success('Accepted successfully',{autoClose: 500});
          setTimeout(() => { window.location.replace('/retail/booking'); }, 2000);
        },(error)=>{
          console.log(error);
        }
      )
        
      }

      const today = new Date().toISOString().slice(0,10);
      const handleStatusReject=()=>{
        let id = localStorage.getItem('appId');
        let custemail = localStorage.getItem('email');
        var templateParams = {
         email : custemail,
         decision : 'Booking is Rejected'
     };
     emailjs.send('service_zw5vono', 'template_o3wqthx', templateParams,'oM-ruoNGEgD2fdPNh')
     .then(function(response) {
        alert('SUCCESS!', response.status, response.text);
    
     }, function(error) {
        alert('FAILED...', error);
     });
        axiosObject.put(`/statusreject/${id}`).then(
          (response)=>{
            localStorage.removeItem("appId");
            toast.success('Rejected successfully',{autoClose: 500});
            setTimeout(() => { window.location.replace('/retail/booking'); }, 2000);
          },(error)=>{
            console.log(error);
          }
        )
      }
      const [modalData,setModalData] = useState([
        {
            book_id:'1',
            productName:"Sonata Service",
            bookingDate:"27/2/2022",
            bookingTime:"4pm to 6pm",
        },
    ]);

      const[show,setShow]=useState(false);
      const handleShow = () => setShow(true);
      const handleClose = () => setShow(false);

    useEffect(()=>{
    document.title= "watchService || CenterBookings" 
    getSCBookings();
    },[]);

  
    
        return(
            
     <>
     <ToastContainer/>
         <NavbarRetail/>
     <div className="home-body"style={{color:"black",margin:'auto',fontWeight:'bolder'}}>
       
         <h1 style={{textAlign:'center',paddingTop:'10%'}}>Bookings </h1>
         
         <Table style={{width:'50%', margin:'auto'}}>
        
         <TableHead style={{fontWeight:"bolder"}}>
             <TableCell>Booking No.</TableCell>
             <TableCell>Customer Name</TableCell>
         <TableCell>Contact Details</TableCell>
         <TableCell>Date</TableCell>
         <TableCell>Time</TableCell>
         <TableCell>Initial Pay Status</TableCell>
         </TableHead>
                    <TableBody>
                       {
                           data.map(val => {
                               return(
                                
                                   <TableRow key="key">
                                       <TableCell>{val.book_id}</TableCell>
                                       <TableCell>{val.custName}</TableCell>
                                       <TableCell>{val.custAddress}<br></br>{val.custEmail}<br></br>{val.contactNumber}</TableCell>
                                <TableCell>{val.bookingDate}</TableCell>
                                <TableCell>{val.bookingTime}</TableCell>
                                <TableCell>{val.paymentDone}</TableCell>
                               {
                                   val.bookingStatus === "no" ?
                                   <TableCell>
  <button style = {{backgroundColor:"#42C2FF",borderRadius:5,color:"white"}} id="paymentbutton" onClick={() => {localStorage.setItem("appId",val.book_id);localStorage.setItem("email",val.custEmail);  handleStatusAccept();} }>Accept</button>
  <button style = {{backgroundColor:"#42C2FF",borderRadius:5,color:"white"}} id="paymentbutton" onClick={() => {localStorage.setItem("appId",val.book_id);localStorage.setItem("email",val.custEmail);  handleStatusReject();} }>Reject</button>
                               
                                   </TableCell>: 
                                   val.bookingStatus === "reject" ?
                                   <TableCell>
<p>This Booking has been rejected by you </p>
                                   </TableCell>:
                                   val.bookingStatus === "accept"  && val.paymentDone === "no" ?
                                   <TableCell>
<p>Wait for initial payment to be done</p>
                                   </TableCell>:
                                   val.bookingStatus === "accept"  && val.paymentDone === "yes" && val.serviceStatus === "no"?
                                   <TableCell>
 <button style = {{backgroundColor:"#42C2FF",borderRadius:5,color:"black"}} id="servicebutton" onClick={() => {localStorage.setItem("appId",val.book_id);;localStorage.setItem("email",val.custEmail);  handleservice();} }>Start the service</button>
                               
                                   </TableCell>:
                                    val.bookingDate <= today && val.bookingStatus === "accept"  && val.paymentDone === "yes" && val.serviceStatus === "started"?
                                    <TableCell>
  <p>Wait for the service to be completed</p>                              
                                    </TableCell>:
                                   val.bookingDate <= today && val.bookingStatus === "accept"  && val.paymentDone === "yes" && val.serviceStatus === "ended" && val.charges === "null" ?
                                   <TableCell>
                               <OverlayTrigger
                                    overlay={
                                        <Tooltip id={'tooltip-top'}>
                                            Edit
                                        </Tooltip>
                                    }>
                                        <Button id="editappointmentbutton" onClick={()=>{localStorage.setItem("email",val.custEmail);handleShow();setModalData(val)}} data-toggle="modal"><i className="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i>Charges</Button>
                                        </OverlayTrigger>
                                   </TableCell>:
                                   val.bookingDate <= today && val.bookingStatus === "accept"  && val.paymentDone === "yes" && val.serviceStatus === "ended" && val.charges != null  && val.finalPay === "no"?
                                   <TableCell>
 <p>Wait for the final Pay</p>                              
                                   </TableCell>:
                                   val.bookingDate <= today && val.bookingStatus === "accept"  && val.paymentDone === "yes" && val.serviceStatus === "ended" && val.charges != null && val.finalPay === "yes" ?
                                   <TableCell>
 <p>Payment successful</p>                              
                                   </TableCell>:
                                   <TableCell>
<p></p>
                                   </TableCell>

                               }
                                  </TableRow>
                                )})
                       }
                    </TableBody>
                    </Table>

                    <Modal show={show} onHide={handleClose} >
                        <Modal.Header closeButton>
                            <Modal.Body>
                                <EditCharges booking={modalData}/>
                            </Modal.Body>
                        </Modal.Header>

                    </Modal>
                  
     </div>
     
     </>
     )}

 

export default ViewSCBooking;