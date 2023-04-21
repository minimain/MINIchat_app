import React from 'react'
import {CiUser, CiSearch, CiChat2 } from "react-icons/ci";
import { IoIosMore } from "react-icons/io";
import { Link } from 'react-router-dom';
import'../styles/navigation.scss';

function Navigation() {
  return (
    <>
    <nav className='tab_bar'>
      <ul>
        <li><Link to={'/'}><i><CiUser/></i>Friends</Link></li>
        <li><Link to={'/chatlist'}><i><CiChat2/></i>chatlist</Link></li>
        {/* <li><Link to={'/loading'}><i><CiChat2/></i>chatlist</Link></li> */}
        <li><Link to={'/find'}><i><CiSearch/></i>Find</Link></li>
        <li><Link to={'/more'}><i><IoIosMore/></i>More</Link></li>
      </ul>
    </nav>
    </>
  )
}

export default Navigation