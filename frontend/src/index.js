import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import store from './redux/store'

// const curLang = localStorage.getItem("lang");
// !curLang && localStorage.setItem("lang", "vn");

window.addEventListener("keydown", (e) => {
  if(e.shiftKey && e.code === "KeyF") {
    const a = document.getElementById("input-search");
    a.focus();
    return;
  }
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);