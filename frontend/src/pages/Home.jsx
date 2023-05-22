import React, { useEffect } from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import {publicRequest, userRequest} from "../requestMethod"

const Home = () => {
  const idUser = JSON.parse(localStorage.getItem('curentUser') || "{}")?._id || null;
  
  const handleGetUser = async () => {
    const rs = await publicRequest.get(`/users/find/${idUser}`);
    if(rs?.status == 200) {
      localStorage.setItem("curentUser", JSON.stringify(rs?.data || {}));
    }
  }

  useEffect(() => {
    if(idUser) {
      handleGetUser()
    }
  }, [])

  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Categories />
      <Products/>
      <Newsletter/>
      <Footer/>
    </div>
  );
};

export default Home;
