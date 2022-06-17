import React, { useEffect, useState } from "react";
import axiosObject from "../../api/bootapi";
import NavbarUser from './NavbarUser';
import Table from '@mui/material/Table';
import { Modal,Button,OverlayTrigger,Tooltip } from "react-bootstrap";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Rating from "./Rating";
import EditRating from "./EditRating";
import EditBooking from "./EditBooking";
import '../styles/MyBookings.css';
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ViewUserBookings(){
   
    const [data,setData] = useState([
        {
            book_id:'1',
            productName:"Sonata Service",
            bookingDate:"27/2/2022",
            bookingTime:"4pm to 6pm",
        },
    ]);
    const [center,setCenter] = useState([
        {
email:'maha@gmail.com',

        },
    ]);
    const getUserBookings=()=>{
        axiosObject.get(`/getAppointments/user`).then(
            (response)=>{
              console.log("booking fetched");
              setData(response.data);
              
            },(error)=>{
              console.log(error);
            }
          );
    };

    const getCenterDetails=(centerid)=>{
        axiosObject.get(`/viewCenterById/${centerid}`).then(
            (response)=>{
                console.log("start fetched");
              setCenter(response.data);
              console.log(response.data);
              console.log(center.email);
              console.log("center fetched");
              localStorage.setItem('centerEmail',center.email);
            },(error)=>{
              console.log(error);
            }
          );
    };

    const deleteRating=(value)=>{
        axiosObject.delete(`/deleteRating/${value}`).then(res=>{
            console.log("Rating Deleted");
            console.log(res);
            refreshPage();
        }).catch(err=>{
          console.log(err);
        })
    }


    const remove=(value)=>{
        let centerid = localStorage.getItem('centerId');
        let bookID = localStorage.getItem('bookId');
        getCenterDetails(centerid);
        var templateParams = {
            email : center.email,
            decision : 'Booking has been deleted by user, booking id :'+ bookID
        };
        emailjs.send('service_zw5vono', 'template_o3wqthx', templateParams,'oM-ruoNGEgD2fdPNh')
        .then(function(response) {
          
           
        }, function(error) {
          
        }); 
        axiosObject.delete(`/deleteAppointment/${value}`).then(
            (response)=>{
                console.log("User Deleted");
                console.log(response);
                toast.success('Your Booking has been cancelled, Refund will be done within 2-3days',{autoClose: 2000});
               
                setTimeout(() => { window.location.replace('/user/mybooking'); }, 4000);
            },(error)=>{
                console.log(error);
            }
        )
    };
    const refreshPage=()=>{
        window.location.reload(false);
    }
    useEffect(()=>{
    document.title= "watchService || MyBookings" 
    getUserBookings();
    },[]);

    const [modalData,setModalData] = useState([
        {
            book_id:'1',
            productName:"Sonata Service",
            bookingDate:"27/2/2022",
            bookingTime:"4pm to 6pm",
        },
    ]);
    const handlepay=()=>{
        let centerid = localStorage.getItem('centerId');
        getCenterDetails(centerid);
        setTimeout(() => { window.location.replace('/user/payment'); }, 4000);   
      //window.location.replace("/user/payment");
    }
    const handleservice=()=>{
        let id = localStorage.getItem('appId');
        let centerid = localStorage.getItem('centerId');
        let bookId = localStorage.getItem('bookId');
        getCenterDetails(centerid);
        var templateParams = {
            email : center.email,
            decision : 'Service Ended by user, booking ID:'+ bookId
        };
        emailjs.send('service_zw5vono', 'template_o3wqthx', templateParams,'oM-ruoNGEgD2fdPNh')
        .then(function(response) {
           
           
        }, function(error) {
           
        });
        axiosObject.put(`/serviceend/${id}`).then(
            (response)=>{
              localStorage.removeItem("appId");
              toast.success('Thanks for making service with us',{autoClose: 2000});
              setTimeout(() => { window.location.replace('/user/mybooking'); }, 4000);
            },(error)=>{
              console.log(error);
            }
          )
        
      }
    const[show,setShow]=useState(false);
    const[show1,setShow1]=useState(false);
    const[show2,setShow2]=useState(false);
    const handleShow = () => setShow(true);
    const handleShow1 = () => setShow1(true);
    const handleShow2 = () => setShow2(true);

    const handleClose = () => setShow(false);
    const handleClose1 = () => setShow1(false);
    const handleClose2 = () => setShow2(false);

    const today = new Date().toISOString().slice(0,10);
    console.log(today);
    //const time = new Date().toTimeString().slice(0,5);

    // const[time,setTime]= useState("0:0");
    //   setInterval(updateTime,1000);
    //   function updateTime(){
    //       const obj = new Date();
    //        var current = obj.toTimeString().slice(0,5);
    //       setTime(current);
    //   }

    // console.log(time);
    // console.log(today);
        return(
     <>
     <ToastContainer/>
         <NavbarUser/>
     <div className="home-body"style={{color:"black",margin:'auto',fontWeight:'bolder'}}>
       
         <h1 style={{textAlign:'center',paddingTop:'10%'}}>Bookings</h1>
         
         <Table style={{width:'80%', margin:'auto'}}>
        
         <TableHead style={{fontWeight:"bolder"}}>
             <TableCell>Booking No.</TableCell>
         <TableCell>Date</TableCell>
         <TableCell>Time</TableCell>
         <TableCell>Center Id</TableCell>
         <TableCell>Problem</TableCell>
         </TableHead>
                    <TableBody>
                       {
                           data.map(val => {
                               return(
                                
                                   <TableRow key="key">
                                       <TableCell>{val.book_id}</TableCell>
                                
                                <TableCell>{val.bookingDate}</TableCell>
                                <TableCell>{val.bookingTime}</TableCell>
                                <TableCell>{val.sc_id}</TableCell>
                                <TableCell>{val.problemStatement}</TableCell>
                               {val.bookingStatus ==="no" ?
                               <TableCell>
<p>Wait for confirmation from the service</p>
                               </TableCell>:
                               val.bookingStatus ==="reject" ?
                               <TableCell>
<p>Sorry, your booking has been cancelled by the service provider</p>
                               </TableCell>:
                               val.bookingStatus ==="accept"  && val.paymentDone==="no"
                            ?
                               <TableCell>
                                
                                   <button style = {{backgroundColor:"#42C2FF",borderRadius:5,color:"white"}} id="paymentbutton" onClick={() => {localStorage.setItem("appId",val.book_id);localStorage.setItem("custEmail",val.custEmail);localStorage.setItem("centerId",val.sc_id);  handlepay();} }>Make Initial Payment to confirm your service </button>
                               
                               </TableCell>
                                
                           :  
                           val.bookingStatus ==="accept" && val.bookingDate > today  && val.paymentDone==="yes"
                           ?
                           <TableCell>
                                   
                           {/* <OverlayTrigger
                                    overlay={
                                        <Tooltip id={'tooltip-top'}>
                                            Edit
                                        </Tooltip>
                                    }>
                                        <Button id="editappointmentbutton" onClick={()=>{handleShow();setModalData(val)}} data-toggle="modal"><i className="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i>Edit</Button>
                                        </OverlayTrigger> */}
                                <button style = {{ marginLeft:20}} id="deleteappointmentbutton" onClick={() =>{localStorage.setItem("centerId",val.sc_id);localStorage.setItem("bookId",val.book_id);localStorage.setItem("custName",val.custName); remove(val.book_id)}}><i className="fa fa-trash fa-lg" aria-hidden="true"></i>Delete</button>
                          
                            </TableCell>

                           :val.bookingStatus ==="accept" && val.bookingDate <= today  && val.paymentDone==="yes" && val.serviceStatus === "no"
                           ? 
                           <TableCell>
                               <p>Wait for your service to be started</p>
                                 </TableCell> 
                                 :val.bookingStatus ==="accept" && val.bookingDate <= today  && val.paymentDone==="yes" && val.serviceStatus === "started"
                                 ? 
                                 <TableCell>
                                     <button style = {{backgroundColor:"#42C2FF",borderRadius:5,color:"black"}} id="servicebutton" onClick={() => {localStorage.setItem("appId",val.book_id);localStorage.setItem("centerId",val.sc_id); localStorage.setItem("bookId",val.book_id);localStorage.setItem("custName",val.custName); handleservice();} }>Click when your service is completed</button>
                               
                                       </TableCell> 
                                        : val.bookingStatus ==="accept" && val.bookingDate <= today  && val.paymentDone==="yes" && val.serviceStatus === "ended" && val.charges === "null"
                                        ? 
                                        <TableCell>
                                           <p>Wait for the Final service charges</p>
                                              </TableCell>
                                              : val.bookingStatus ==="accept" && val.bookingDate <= today  && val.paymentDone==="yes" && val.serviceStatus === "ended" && val.charges !== "null" && val.finalPay === "no"
                                              ? 
                                              <TableCell>
                                                   <button style = {{backgroundColor:"#42C2FF",borderRadius:5,color:"white"}} id="paymentbutton" onClick={() => {localStorage.setItem("appId",val.book_id); localStorage.setItem("custEmail",val.custEmail);localStorage.setItem("centerId",val.sc_id);localStorage.setItem("bookId",val.book_id);localStorage.setItem("custName",val.custName);localStorage.setItem("finalPay",val.charges);localStorage.setItem("isFinalPay","true"); handlepay();} }>Final Payment </button>
                               
                                                    </TableCell>
                                 : val.bookingStatus ==="accept" && val.bookingDate <= today  && val.paymentDone==="yes" && val.serviceStatus === "ended"  && val.charges !=null && val.finalPay === "yes" && val.rating ==null
                           ? 
                           <TableCell>
                                <button style = {{backgroundColor:"#00C897",borderRadius:5,color:"white"}} id="reviewappointmentbutton" onClick={() => {handleShow1();setModalData(val)} }data-toggle="modal">Rate us</button>
                          
                                 </TableCell>
                          :val.bookingStatus =="accept" && val.bookingDate <= today  && val.paymentDone==="yes"&& val.serviceStatus === "ended" && val.charges != null && val.finalPay === "yes" && val.rating!=null
                             ? <TableCell>
                                  <button style = {{backgroundColor:"#00C897",borderRadius:5,color:"black"}} id="reviewappointmentbutton" onClick={() => {handleShow2();setModalData(val.rating)} }data-toggle="modal">Your Review</button>
                                <button style = {{borderColor:"#FD5D5D",borderRadius:5,color:"#FD5D5D",marginLeft:7}} onClick={()=>{deleteRating(val.book_id);}} >Delete review</button>
                          
                              </TableCell>:
                              <TableCell>

                              </TableCell>
                                }
                                  </TableRow>
                                )})
                       }
                    </TableBody>
                    </Table>
                   {/*} <button onClick={() => {handleShow1()}}>
                        Reviews</button>*/}
                    <Modal show={show1} onHide={handleClose1} >
                        <Modal.Header closeButton>
                            <Modal.Body>
                                <Rating booking={modalData}/>
                            </Modal.Body>
                        </Modal.Header>

                    </Modal>

                    <Modal show={show2} onHide={handleClose2} >
                        <Modal.Header closeButton>
                            <Modal.Body>
                                <EditRating Rating={modalData}/>
                            </Modal.Body>
                        </Modal.Header>

                    </Modal>
                  
                    <Modal show={show} onHide={handleClose} >
                        <Modal.Header closeButton>
                            <Modal.Body>
                                <EditBooking booking={modalData}/>
                            </Modal.Body>
                        </Modal.Header>

                    </Modal>
     </div>
     
     </>
     )}

 

export default ViewUserBookings;