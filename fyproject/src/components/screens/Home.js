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

const Search = () => {

  const throwDetails = (value)=>{
    localStorage.setItem("data",JSON.stringify(value));
  }
    const getAllCenters=()=>{
      axiosObject.get(`/viewAllCenter`).then(
            (response)=>{
              console.log("centers fetched");
              setCenters(response.data);
            },(error)=>{
              console.log(error);
            }
          );
    };
    useEffect(()=>{
    document.title= "watchService || Home"
    getAllCenters();
    },[]);
    const [centers,setCenters]=useState([
    ]);
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
    <Navbar/>
    <div className="home-body"style={{display:"flex",flexDirection:"column",alignItems:"center"}}>

        <Container className='text-center mt-4' style={{width:"40%"}}>
          <Form.Control id="searchbar" placeholder="Search" value = {filter} onChange={SearchText.bind(this)} />

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
                <Link id="editServicecenterLink" to="/admin/edit"><button className="btn btn-dark " onClick={()=>{throwDetails(center)}} style={{marginRight:10}}>Edit</button></Link>
                <Link id="deleteServicecenterLink" to="/admin/home"><button id="deleteServiceCenterButton" className="btn btn-danger" onClick={()=>{
                    deleteCenter(center.id);
                }} >Remove</button></Link>
                </Card.Body>
              </Card>
             
            </Col>
           )
        })}
        
      </Row>
      </div>
     
    </div>
    </>
  )
}

export default Search