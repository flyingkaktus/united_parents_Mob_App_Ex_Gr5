import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
// The bootstrap import overrides almost all custom styles
import 'bootstrap/dist/css/bootstrap.min.css'
import App from "./components/App";
import "antd/dist/antd.css"


 


ReactDOM.render(<Router><App /></Router>, document.getElementById("root"));
