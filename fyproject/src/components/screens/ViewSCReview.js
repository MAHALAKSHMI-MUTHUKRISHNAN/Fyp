import React, { useEffect, useState } from "react";
import axiosObject from "../../api/bootapi";
import "../styles/Appointments.css";
import NavbarUser from "./NavbarUser";
import '../styles/Home.css';
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import star from "../assets/star.png"
const ViewSCReview = () => {
  let id = localStorage.getItem('centerId');
  const [data,setData]= useState([

  ]);

    const getAllRatings=()=>{
        axiosObject.get(`/getCentersRating/${id}`).then(
            (response)=>{
              console.log("Ratings fetched");
              setData(response.data);
              localStorage.removeItem("centerId");
            },(error)=>{
              console.log(error);
            }
          );
    };
    useEffect(()=>{
    document.title= "watchService || Ratings"
    getAllRatings();
    },[]);


  return (
    <>
      <NavbarUser />
      <div
        className="home-body"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="fixed-content">
          <Row className="g-4">
            {data.map((val) => {
              return (
                
                <Col style={{ padding: '2rem' }} >
                
                <Card style={{ width: '18rem',marginRight:5,marginLeft:5,backgroundColor:"#EFFFFD",borderRadius:"10%",boxShadow: "7px 7px 7px #9E9E9E",borderColor:"white"}}>
                      <div style={{display:'flex',marginLeft:'40%'}}>
                        <Card.Title style={{fontSize:40}} >{val.starCount}</Card.Title>
                        <Card.Img variant="top" src={star} style={{height:40,width:40}}/>
                      </div>
                  <Card.Body>
                        <Card.Title>{val.userName}</Card.Title>
                        <Card.Text>{val.experience}</Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <small className="text-muted">{val.givenDate}</small>
                      </Card.Footer>
                </Card>
               
              </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </>
  );
};

export default ViewSCReview;
