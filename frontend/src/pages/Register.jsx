import styled from "styled-components";
import { mobile } from "../responsive";
import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {publicRequest} from "../requestMethod"
 

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://mir-s3-cdn-cf.behance.net/project_modules/disp/52256b8625013.560c0b25855dc.png")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Forms = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
    
  const [data,setData]=useState({
    username:"",
    email:"",
    password:"",
    address:"",
    image:"", 
    phone:"",
    fullname: ""
  })
  const history=useHistory();

  const isEmail = data.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
  console.log('isEmail >>', isEmail)

  const sumbit = async(e) =>{
    e.preventDefault();
    const value = {  
      username:data.username,
      email:data.email, 
      password:data.password,
      address:data.address,
      image:data.image,
      phone:data.phone,
      fullname:data.fullname
    };
    const isEmail = data.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    if(!isEmail || isEmail?.length == 0) {
      alert('Email nhu cc');
      return;
    }
    if(data?.username && data?.email && data?.password && data?.address && data?.phone && data?.fullname) {
      const rs = await publicRequest.post(`/auth/register/`, value );
      console.log('rs >>>>>', rs);
      if(rs) {
        alert('Đăng ký thành công');
      } else {
        alert('Lỗi hệ thống');
      }
      history.push('/login');
    } else {
      alert('Vui lòng điền đẩy đủ thông tin');
    }
  } 

  function handle(e){
    const newdata={...data}
    newdata[e.target.id]=e.target.value
    setData(newdata)
  }
  
  return (  
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Forms >
          <Input placeholder="username"  onChange={(e)=>handle(e)} value={data.username} id="username"/>
          <Input placeholder="fullname"  onChange={(e)=>handle(e)} value={data.fullname} id="fullname"/>
          <Input placeholder="password" type="password"  onChange={(e)=>handle(e)} value={data.password}  id="password"/>
          <Input placeholder="email" onChange={(e)=>handle(e)} value={data.email} id="email"/>
          <Input placeholder="phone"  onChange={(e)=>handle(e)} value={data.phone} id="phone"/>
          <Input placeholder="address"  onChange={(e)=>handle(e)} value={data.address} id="address"/>
          <Input placeholder="Image Link"   onChange={(e)=>handle(e)} value={data.image} id="image"/>
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={(e)=> sumbit(e)} >CREATE</Button>
        </Forms>
      </Wrapper>
    </Container>
  );
};

export default Register;
