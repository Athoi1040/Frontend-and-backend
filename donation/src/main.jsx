
import React from 'react'
import ReactDom from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from "./App";
import "./index.css"
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDom.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
  
);
