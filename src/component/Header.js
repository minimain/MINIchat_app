import React from 'react'
import {CiBatteryFull} from "react-icons/ci";
import { TiWiFi } from "react-icons/ti";
import { FaPlane } from "react-icons/fa";
import { TbMoonFilled } from "react-icons/tb";
import { BiBluetooth } from "react-icons/bi";

import'../styles/header.scss';
import { Link } from 'react-router-dom';

function Header({h1, span, i, iconback, className}) {
  return (
    <div className={className}>
      {/* <div className="header"> */}

  <div className="status_bar">
    <div className="left_item">
      <i><FaPlane/></i>
      <i><TiWiFi/></i>
    </div>
    <div className="center_item">
      <span>15</span>:<span>33</span>

    </div>
    <div className="right_item">
      <i><TbMoonFilled/></i>
      <i><BiBluetooth/></i>
      {/* <span><span>100</span>%</span> */}
      <i><CiBatteryFull/></i>
    </div>
  </div>

  <div className="title_bar">
    <h1>{h1}</h1>
    <div className="left_item"><Link to={'/'}>{iconback}</Link> </div>
    <div className="right_item"><i>{i}</i></div>
  </div>
</div>
  )
}

export default Header