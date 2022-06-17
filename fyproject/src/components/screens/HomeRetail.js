import React, { useEffect, useState } from "react";
import axiosObject from "../../api/bootapi";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from "react-router-dom";
import '../styles/Home.css';
import NavbarRetail from './NavbarRetail'

const HomeRetail = () => {

  const throwDetails = (value)=>{
    localStorage.setItem("SelectedCenter",JSON.stringify(value));
  }

  const throwID = (value)=>{
    localStorage.setItem("centerId",JSON.stringify(value));
  }
    const getAllCenters=()=>{
      axiosObject.get(`/getCenters/user`).then(
            (response)=>{
              console.log("centers fetched");
              setCenters(response.data);
            },(error)=>{
              console.log(error);
            }
          );
    };
    useEffect(()=>{
    document.title= "Fixmate || Home"
    getAllCenters();
    },[]);
    const [centers,setCenters]=useState([
    ]);
   // const isCenterAdded = localStorage.getItem("isCenterAdded");
    const deleteCenter=(value)=>{
        axiosObject.delete(`/deleteCenter/${value}`).then(
            (response)=>{
                localStorage.removeItem("isCenterAdded");
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
 
  
  return (
    <>
    <NavbarRetail/>
    <div className="home-body"style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
 {/* {(!(isCenterAdded)) ? 
    <Link
                exact
                to="/retail/AddServiceCenter"
                activeClassName="active"
                id="addserviceCenterlink"
                className="nav-links"
              ><button className="btn btn-dark ">
                Add center
                </button>
              </Link>
              :  */}
              
        <div className="fixed-content">
    
        <Row>
        {centers.map((center) => {<dataSearch key ={center.id}/>
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
                <ListGroup className="list-group-flush">
                  <ListGroupItem>CONTACT : {center.mobile}<br/>
                  {center.email}</ListGroupItem>
                  <ListGroupItem>ADDRESS : {center.address}</ListGroupItem>
                  <ListGroupItem>
                  <iframe src={`http://maps.google.com/maps?q=${center.lattitude},${center.longitude}&output=embed`} height="70" width="200"></iframe></ListGroupItem> 
                  {/* <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${center.lattitude},${center.longitude}&zoom=14&size=400x300&sensor=false&markers=color:red%7C${center.lattitude},${center.longitude}&key=AIzaSyDCw5MGvFFQRPYWUOs-Ik26g1mrhINMW_I`}></img> */}
                </ListGroup>

                <Card.Body style={{alignItems:"center"}}>
                <Link id="editServicecenterLink" to="/retail/edit"><button className="btn btn-dark " onClick={()=>{throwDetails(center)}} style={{marginRight:10}}>Edit</button></Link>
                <Link id="deleteServicecenterLink" to="/retail/home"><button id="deleteServiceCenterButton" className="btn btn-danger" onClick={()=>{ deleteCenter(center.id)}} >Remove</button></Link>
                <Link id="booklink" to="/retail/booking"><button className="btn btn-success " onClick={()=>{throwID(center.id)}}>Bookings</button></Link>
                
                </Card.Body>
              </Card>
             
            </Col>
           )
        })}
        
      </Row>
      </div>
 {/* }  */}
     
    </div>
    </>
  )
}

export default HomeRetail