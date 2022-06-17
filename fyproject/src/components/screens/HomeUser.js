import React, { useEffect, useState } from "react";
import axiosObject from "../../api/bootapi";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Container} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import '../styles/Home.css';
import NavbarUser from './NavbarUser';
import CenterImages from "../assets/centerImages/CenterImages.js";

const HomeUser = () => {

   
    useEffect(()=>{
    document.title= "Fixmate || Home"
   
    },[]);
  
  const handleClick = (value)=>{
    localStorage.setItem("centerType",JSON.stringify(value));
  }
  return (
    <>
    <NavbarUser/>
    <div className="home-body"style={{alignItems:"center"}}>
    <div className="whole">
      <div class="container">

<h3 class="title"> our services </h3>

<div class="products-container">
<Link id="viewreviewlink" to="/user/service" onClick={()=>{handleClick(1)}}>
   <div class="product" data-name="p-1">
      <img src="https://media.istockphoto.com/photos/male-repair-air-conditioner-at-room-he-is-air-technician-mechanic-picture-id1279259535?b=1&k=20&m=1279259535&s=170667a&w=0&h=GC1LaqaNNYVPIEQR5yQfA5dnhIwHLYTU7Ps7oHAB4cM=" alt=""/>
      <h3>AC SERVICE</h3>
      
   </div>
   </Link>
   <Link id="viewreviewlink" to="/user/service" onClick={()=>{handleClick(2)}}>
   <div class="product" data-name="p-2">
      <img src="http://dirtblaster.in/wp-content/uploads/2020/03/Painting-5.jpg" alt=""/>
      <h3>PAINTING</h3>
      
   </div>
   </Link>
   <Link id="viewreviewlink" to="/user/service" onClick={()=>{handleClick(3)}}>
   <div class="product" data-name="p-3">
      <img src="https://www.shivassalon.com/wp-content/uploads/2021/08/beautician-with-brush-applies-white-moisturizing-mask-face-young-girl-client-spa-beauty-salon-min-scaled.jpg" alt=""/>
      <h3>SALON</h3>
      
   </div>
   </Link>
   <Link id="viewreviewlink" to="/user/service" onClick={()=>{handleClick(4)}}>
   <div class="product" data-name="p-4">
      <img src="https://i.ytimg.com/vi/aOTmI8w1hBA/maxresdefault.jpg" alt=""/>
      <h3>CAR SERVICE</h3>
      
   </div>
   </Link>
   <Link id="viewreviewlink" to="/user/service" onClick={()=>{handleClick(5)}}>
   <div class="product" data-name="p-5">
      <img src="https://www.hourmaid.com/wp-content/uploads/2017/12/cleaning-services-1024x682.jpeg" alt=""/>
      <h3>HOME CLEANING</h3>
    
   </div>
   </Link>
   <Link id="viewreviewlink" to="/user/service" onClick={()=>{handleClick(6)}}>
       
 
   <div class="product" data-name="p-6">
      <img src="https://5.imimg.com/data5/VL/NY/GLADMIN-60573408/plumber-service-500x500.png" alt=""/>
      <h3>PLUMBING</h3>
        </div>
        </Link>

</div>

</div>




</div>
</div>
</>

  )
}

export default HomeUser;