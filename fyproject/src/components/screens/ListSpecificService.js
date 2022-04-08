import React, { useEffect, useState } from "react";
import axiosObject from "../../api/bootapi";
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

  const SearchText = (event) =>{
    setFilter(event.target.value);
  }
    let dataSearch = centers.filter(item =>{
      return Object.keys(item).some(key =>
        item[key].toString().toLowerCase().includes(filter.toString().toLowerCase())
    )});

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
         <Container className='text-center mt-4' style={{width:"40%"}}>
          <Form.Control  id="searchbar" placeholder="Search" value = {filter} onChange={SearchText.bind(this)} />

        </Container>
        <div className="fixed-content">

        <Row>
        {dataSearch.map((center) => {<dataSearch key ={center.id}/>
          return (
            
            <Col style={{ padding: '2rem' }} >
                
              <Card style={{ width: '18rem',borderRadius:20 ,marginRight:5,marginLeft:5}}>
                    <Card.Img variant="top" src={CenterImages[center.imageurl]} style={{ width: '10rem', height: '10rem',marginLeft:"20%",marginTop:10,borderRadius:"50%" }} />
                <Card.Body>
                  <Card.Title>{center.name}</Card.Title>
                  <Card.Text>
                  {center.details}
                  </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>PHONE : {center.mobile}</ListGroupItem>
                  <ListGroupItem>MAIL ID : {center.email}</ListGroupItem>
                  <ListGroupItem>ADDRESS : {center.address}</ListGroupItem>
                </ListGroup>

                <Card.Body style={{alignItems:"center"}}>
                <Link id="booklink" to="/user/Appointment"><button className="btn btn-success " onClick={()=>{throwDetails(center)}}>Book</button></Link>
                <Link id="viewreviewlink" to="/user/viewscreview"><button className="btn btn-info "style={{marginLeft:10}} onClick={()=>{throwID(center)}}> Reviews</button></Link>
                </Card.Body>
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
