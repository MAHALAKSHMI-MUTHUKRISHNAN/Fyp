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


function ViewUserBookings(){
    const [data,setData] = useState([
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
              setData(response.data);
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
        axiosObject.delete(`/deleteAppointment/${value}`).then(
            (response)=>{
                console.log("User Deleted");
                console.log(response);
                refreshPage();
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
        window.location.replace("/user/payment");
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
                               { val.bookingDate <= today  && val.paymentDone==="no"
                            ?
                               <TableCell>
                                
                                   <button style = {{backgroundColor:"#42C2FF",borderRadius:5,color:"white"}} id="paymentbutton" onClick={() => {localStorage.setItem("appId",val.book_id);  handlepay();} }>payment</button>
                               
                               </TableCell>
                                
                           :  val.bookingDate <= today  && val.paymentDone==="yes" && val.rating===null
                           ?
                           <TableCell>
                                   
                           <button style = {{backgroundColor:"#00C897",borderRadius:5,color:"white"}} id="reviewappointmentbutton" onClick={() => {handleShow1();setModalData(val)} }data-toggle="modal">Rate us</button>
                       
                            </TableCell>

                           :val.bookingDate <= today  && val.paymentDone==="yes" && val.rating!=null
                           ? 
                           <TableCell>
                                <button style = {{backgroundColor:"#00C897",borderRadius:5,color:"black"}} id="reviewappointmentbutton" onClick={() => {handleShow2();setModalData(val.rating)} }data-toggle="modal">Your Review</button>
                                <button style = {{borderColor:"#FD5D5D",borderRadius:5,color:"#FD5D5D",marginLeft:7}} onClick={()=>{deleteRating(val.book_id);}} >Delete review</button>
                           </TableCell>
                           :<TableCell>
                                    <OverlayTrigger
                                    overlay={
                                        <Tooltip id={'tooltip-top'}>
                                            Edit
                                        </Tooltip>
                                    }>
                                        <Button id="editappointmentbutton" onClick={()=>{handleShow();setModalData(val)}} data-toggle="modal"><i className="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i></Button>
                                        </OverlayTrigger>
                                <button style = {{ marginLeft:20}} id="deleteappointmentbutton" onClick={() => remove(val.book_id)}><i className="fa fa-trash fa-lg" aria-hidden="true"></i></button>
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