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
import Navbar from './Navbar'
import CenterImages from "../assets/centerImages/CenterImages";

const HomeAdmin = () => {
   
    useEffect(()=>{
    document.title= "watchService || Home"
    },[]);
    

  const handleClick = (value)=>{
    localStorage.setItem("centerType",JSON.stringify(value));
  }

  return (
    <>
    <Navbar/>
    <div className="home-body"style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
    <Container className='text-center mt-4' style={{width:"40%"}}>
        <Link id="viewreviewlink" to="/admin/service"><button className="btn btn-info " style={{marginLeft:10}} onClick={()=>{handleClick(2)}}>AC</button></Link>
        <Link id="viewreviewlink" to="/admin/service"><button className="btn btn-info " style={{marginLeft:10}} onClick={()=>{handleClick(1)}}>Photo</button></Link>
        </Container> 
    
        <div className="fixed-content">
        
      </div>
     
    </div>
    </>
  )
}

export default HomeAdmin