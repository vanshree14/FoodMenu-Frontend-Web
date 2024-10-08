import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from './Component/Redux/Store';
import axios from 'axios';
// import {  Key } from "./Component/Utils/Config";
import Loader from './Component/Utils/Loader';
import { ToastContainer } from 'react-toastify';
// import { GoogleOAuthProvider } from '@react-oauth/google';

// const clientId = '636182318567-bk2i2kf1soreko4a11lj0ciinmb88uuh.apps.googleusercontent.com';

// axios.defaults.headers.common["key"] = Key

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <BrowserRouter>
      {/* <GoogleOAuthProvider clientId={clientId}> */}
        <Provider store={Store}>
          <App />
          {/* <Loader/> */}
          <ToastContainer/>
        </Provider>
      {/* </GoogleOAuthProvider> */}
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
