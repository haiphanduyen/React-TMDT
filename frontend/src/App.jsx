import React, { useEffect, useState } from "react";
import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import InfoUser from "./pages/InfoUser";
import ModalIsLogOut from "./components/ModalISLogOut";
import { BROAD_CAST_CHANNEL } from "./constant"
import "./app.css"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  const [ state, setState ] = useState({
    isLogOut: false
  });
  const bc = new BroadcastChannel(BROAD_CAST_CHANNEL);
  const user = useSelector((state) => state.user.currentUser);

  const reloadUI = () => {
    setState({...state});
  };

  useEffect(() => {
    let timer
    bc.onmessage = (e) => {
      const data = e?.data;
      if(data === "logout") {
        timer = window.setTimeout(() => {
          setState({...state, isLogOut: true});
        }, 2000);
      }
     
      if(data === "login") {
        reloadUI();
      }
    }
    return () => {
      timer = null;
    }
  }, [])

  if(state.isLogOut) {
    return <ModalIsLogOut reloadUI={reloadUI}/>;  
  };

  return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/products/:category">
            <ProductList />
          </Route>
          <Route path="/product/:id">
            <Product />
          </Route>
          <Route path="/user/:id">
            <InfoUser/>
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/success">
            <Success />
          </Route>
          
          <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
          <Route path="/register">
            {user ? <Redirect to="/" /> : <Register />}
          </Route>
        </Switch>
      </Router>
  );
};

export default App;