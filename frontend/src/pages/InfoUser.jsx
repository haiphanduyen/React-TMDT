import React from 'react'
import { useSelector } from "react-redux";
import { Card,Button,Row,Col,Form} from 'react-bootstrap'
import  Container from 'react-bootstrap/Container'
import { useState } from 'react';
import axios from 'axios'

export default function InfoUser( ) {
  const user = JSON.parse(localStorage.getItem("curentUser"));
  const [data,setData]=useState({
    email:"",
    fullname:"",
    address:"",
    phone:"",
    
  })

  function update(e){
    e.preventDefault()
    axios.put(`http://localhost:5000/api/users/${user?._id}`,{  
 
      email:data.email, 
      fullname:data.fullname,
      address:data.address,
      
      phone:data.phone,
     
    }).then(res=>{
    })
     
  }
  function handle(e){
    const newdata={...data}
    newdata[e.target.id]=e.target.value
    setData(newdata)
  }
    return ( 
      <div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
                  <Container>
            <Row>
              <center><h1>User</h1></center>
              <Col> <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={user?.image}  />
            <Card.Body>
              <Card.Title>{user?.fullname}</Card.Title>
               
              <Button variant="primary">Change avatars</Button>
            </Card.Body>
          </Card>
         </Col>
              <Col><Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder={user?.email}  onChange={(e)=>handle(e)} value={data.email} id="email"  />
                <Form.Label>Fullname</Form.Label>
                <Form.Control type="fullname" placeholder={user?.fullname}   onChange={(e)=>handle(e)} value={data.fullname} id="fullname" />
                 
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                 
              </Form.Group>
              <Form.Label>Address</Form.Label>
                <Form.Control type="address" placeholder={user?.address}  onChange={(e)=>handle(e)} value={data.address} id="address"  />
                <Form.Label>Phone</Form.Label>
                <Form.Control type="phone" placeholder={user?.phone}   onChange={(e)=>handle(e)} value={data.phone} id="phone" />
                <br/>
               
              <Button variant="primary" type="submit" onClick={(e)=> update(e)}>
                Update
              </Button>
              <br/>
              <br/>
              <Button variant="primary" type="submit">
                 History Purchased
              </Button>
            </Form>
</Col>
            </Row>
            
          </Container>
       


      </div>
        
       
            
    )
    
}
