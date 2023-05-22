import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import axios from 'axios';
import {publicRequest, userRequest} from "../requestMethod"
import Order from '../components/Order';


export default function InfoUser() {
  const user = JSON.parse(localStorage.getItem("curentUser"));
  const [data, setData] = useState({
    username:'',
    email: "",
    fullname: "",
    address: "",
    phone: "",
    address: ""
  });

  const timerRef = useRef();

  const [cart, setCart] = useState([]);
  const handleGetUser = async () => {
    const rs = await publicRequest.get(`/users/find/${user?._id}`);
    if(rs?.status == 200) {
      setData(rs?.data);
      localStorage.setItem("curentUser", JSON.stringify(rs?.data || {}));
      return true
    }
  }

  const handleGetOrder = async () => {
    const rs = await publicRequest.get(`/orders/find/${user?._id}`);
    if(rs?.status == 200) {
      setCart(rs?.data);
    } else {
      alert('Lỗi hệ thống');
    }
  }

  useEffect(() => {
    timerRef.current = setInterval(() => {
      handleGetOrder();
    }, 10000)
    return () => {
      clearInterval(timerRef.current);
    }
  }, [])

  useEffect(() => {
    handleGetUser();
    handleGetOrder();
  }, [user?._id])

  async function updateUser(e) {
    const isEmail = data.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    if(!isEmail || isEmail?.length == 0) {
      alert('Email nhu cc');
      return;
    }
    e.preventDefault()
    const rs = await userRequest.put(`/users/${user?._id}`,{
      email: data.email,
      fullname: data.fullname,
      address: data.address,
      phone: data.phone,
      username: data.username,
      address: data.address
    })
    if(rs?.status == 200) {
      const rs = await handleGetUser();
      if(rs) {
        alert('Cập nhật thành công');
      }
    } else {
      alert("Lôi hệ thống");
    }
  }

  const onChangeValue = (type, value) => {
    setData({
      ...data,
      [type]: value
    });
  };

  return (
  <div className='infoPage'>
    <div className="main-content">
      <div className="container-fluid mt--7">
        <div className="row">
          <div className="col-xl-8 order-xl-1">
            <div className="card bg-secondary shadow">
              <div className="card-header bg-white border-0">
                <div className="row align-items-center">
                  <div className="col-8">
                    <h3 className="mb-0">My account</h3>
                  </div>
                  <div className="col-4 text-right">
                    <a href="#!" className="btn btn-sm btn-primary">
                      Update
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group focused">
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Username
                          </label>
                          <input
                            onChange={(e) => onChangeValue('username',e.target.value)}
                            type="text"
                            id="input-username"
                            className="form-control form-control-alternative"
                            placeholder="Username"
                            defaultValue={data?.username}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email address
                          </label>
                          <input
                            onChange={(e) => onChangeValue('email',e.target.value)}
                            type="email"
                            id="input-email"
                            className="form-control form-control-alternative"
                            placeholder="jesse@example.com"
                            defaultValue={data?.email}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group focused">
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            First name
                          </label>
                          <input
                            onChange={(e) => onChangeValue('fullname',e.target.value)}
                            type="text"
                            id="input-first-name"
                            className="form-control form-control-alternative"
                            placeholder="First name"
                            defaultValue={data?.fullname}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group focused">
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Phone
                          </label>
                          <input
                            onChange={(e) => onChangeValue('phone',e.target.value)}
                            type="text"
                            id="input-last-name"
                            className="form-control form-control-alternative"
                            placeholder="Phone"
                            defaultValue={data?.phone}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Contact information
                  </h6>
                  <div className="pl-lg-4">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group focused">
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Address
                          </label>
                          <input
                            onChange={(e) => onChangeValue('address',e.target.value)}
                            id="input-address"
                            className="form-control form-control-alternative"
                            placeholder="Home Address"
                            defaultValue={data?.address}
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group focused">
                          <button
                            className="form-control-label"
                            htmlFor="input-address"
                            onClick={updateUser}
                          >
                            Update
                          </button>
                        
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="my-4" />
                  {/* Description */}
                  <h6 className="heading-small text-muted mb-4">Orders</h6>
                  <div className="pl-lg-4">
                    <div className="form-group focused" style={{display: "flex", gap: "30px", flexDirection: 'column'}}>
                      {cart?.map(item => {
                        return (
                          <div>
                            <Order item={item} handleGetOrder={handleGetOrder}/>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
)}
