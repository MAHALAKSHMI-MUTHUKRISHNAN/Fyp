import React, { useEffect, useState } from "react";
import axiosObject from "../../api/bootapi";

import Navbar from "./Navbar";
import NavbarUser from "./NavbarUser";
import '../styles/Home.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Container} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import CenterImages from "../assets/centerImages/CenterImages.js";
import { Link } from "react-router-dom";

const ListSpecificService = () => {
  let id = localStorage.getItem('centerType');
  const throwDetails = (value)=>{
    localStorage.setItem("SelectedCenter",JSON.stringify(value));
  }
  const throwID = (value)=>{
    localStorage.setItem("centerId",JSON.stringify(value.id));
  }
    const getAllServices=()=>{
        axiosObject.get(`/viewCenterByType/${id}`).then(
            (response)=>{
              console.log("Type fetched");
              setCenters(response.data);
              localStorage.removeItem("centerType");
            },(error)=>{
              console.log(error);
            }
          );
    };
    useEffect(()=>{
    document.title= "watchService || Type"
    getAllServices();
    },[]);
    const [centers,setCenters]=useState([
    ]);
    const [filter,setFilter] = useState('');
    const deleteCenter=(value)=>{
      axiosObject.delete(`/deleteCenter/${value}`).then(
          (response)=>{
              console.log("center Deleted");
              console.log(response);
              refreshPage();
          },(error)=>{
              console.log(error);
          }
      )
  }
  const refreshPage=()=>{
    window.location.reload(false);
}
  const SearchText = (event) =>{
    setFilter(event.target.value);
  }
    let dataSearch = centers.filter(item =>{
      return Object.keys(item).some(key =>
        item[key].toString().toLowerCase().includes(filter.toString().toLowerCase())
    )});
    const isAdmin = localStorage.getItem("isAdmin");
    const isUser = localStorage.getItem("isUser");
  return (
    <>
    {isAdmin ?
      <Navbar />:
      <NavbarUser/>
    }
      <div
        className="home-body"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        
        <div>
        <Container className='text-center mt-4' style={{width:"100%"}}>
          <Form.Control  id="searchbar" placeholder="Search" value = {filter} onChange={SearchText.bind(this)} />

        </Container>
        <Row>
        {dataSearch.map((center) => {<dataSearch key ={center.id}/>
          return (
            
            <Col style={{ padding: '2rem' }} >
                
              <Card style={{ width: '18rem',borderRadius:20 ,marginRight:5,marginLeft:5}}>
                    <Card.Img variant="top" src={center.imageurl} style={{ width: '10rem', height: '10rem',marginLeft:"20%",marginTop:10,borderRadius:"50%" }} />
                <Card.Body>
                  <Card.Title>{center.name}</Card.Title>
                  <Card.Text>
                  <div class="m-4">
    <div class="accordion" id="myAccordion">
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button type="button" class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#collapseOne">Details</button>									
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse" data-bs-parent="#myAccordion">
                <div class="card-body">
                  <p>{center.details}</p>
                </div>
            </div>
        </div>
        
        </div>
    </div>

                  </Card.Text>
                 </Card.Body>
                  {
  isAdmin ?
  <>    
                <ListGroup className="list-group-flush">
                  <ListGroupItem>PHONE : {center.mobile}</ListGroupItem>
                  <ListGroupItem>MAIL ID : {center.email}</ListGroupItem>
                  <ListGroupItem>ADDRESS : {center.address}</ListGroupItem>
                </ListGroup>

<Card.Body style={{alignItems:"center"}}>
                <Link id="editServicecenterLink" to="/admin/edit"><button className="btn btn-dark " onClick={()=>{throwDetails(center)}} style={{marginRight:10}}>Edit</button></Link>
                <Link id="deleteServicecenterLink" to="/admin/home"><button id="deleteServiceCenterButton" className="btn btn-danger" onClick={()=>{
                    deleteCenter(center.id);
                }} >Remove</button></Link>
                </Card.Body>
                </>
  :
  <>
  <ListGroup className="list-group-flush">
                  
                  <ListGroupItem>ADDRESS : {center.address}</ListGroupItem>
                </ListGroup>
  <Card.Body style={{alignItems:"center"}}>
                <Link id="booklink" to="/user/Appointment"><button className="btn btn-success " onClick={()=>{throwDetails(center)}}>Book</button></Link>
                <Link id="viewreviewlink" to="/user/viewscreview"><button className="btn btn-info "style={{marginLeft:10}} onClick={()=>{throwID(center)}}> Reviews</button></Link>
                </Card.Body>
                </>
}
                
              </Card>
             
            </Col>    
           )
        })}
        
      </Row>
        </div>
      </div>
    </>
  );
};

export default ListSpecificService;
