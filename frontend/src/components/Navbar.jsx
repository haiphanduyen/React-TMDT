import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React, {useState} from "react";
import { L } from "../utils"
import { useSelector } from "react-redux";
import styled from "styled-components";
import { mobile } from "../responsive";
import {
  BrowserRouter as Router,

  Link,
 
} from "react-router-dom";

const link = styled.div`

  text-decoration: none;
  color: inherit;

`

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;
  
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = ({ onSearch }) => {
  const quantity= (useSelector(state=>state.cart.quantity));
  const lang = localStorage.getItem("lang");

  const onHandleSearch = (e) => {
    onSearch && onSearch(e.target.value);
  }

  const user = JSON.parse(localStorage.getItem("curentUser"));


  const handleChangeLanguage = (e) => {
    const curLang = lang === "vn" ? "en" : "vn";
    console.log("curLang", curLang);
    localStorage.setItem("lang", curLang);
    window.location.reload();
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language onClick={handleChangeLanguage}>{lang === "vn" ? "VN" : "EN"}</Language>
          <SearchContainer>
            <Input id="input-search" placeholder={L("Hold Shilf + f to search")} onChange={onHandleSearch}/>
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          
          <Logo>DEHIGH</Logo>
          
        </Center>
        <Right>
        {user ? (
        <div>
           <Right>
          <Link to={`/user/${user?._id}` } className="link">
            <MenuItem>{user?.fullname}</MenuItem>
            </Link>
          
          <Link to='/login' className="link">
          <MenuItem>LOG OUT</MenuItem>
          </Link>
          </Right>

        </div>
        
      ) : (
        <div>
          <Right>
          <Link to='/register' className="link">
            <MenuItem>REGISTER</MenuItem>
            </Link>
          
          <Link to='/login' className="link">
          <MenuItem>SIGN IN</MenuItem>
          </Link>
          </Right>

        </div>
         
      )}
         
            
          <Link to ='/cart'>
          <MenuItem>
            <Badge badgeContent={quantity || JSON.parse(localStorage.getItem("cart"))?.quantity} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
