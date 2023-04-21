import React from 'react';
import { RiChat1Line, RiUserLine } from "react-icons/ri";
import { BiSearchAlt } from "react-icons/bi";
import { MdMoreHoriz } from "react-icons/md";
import { Link } from 'react-router-dom';
import'../styles/navigation.scss';

function Navigation() {
  return (
    <>
    <nav className='tab_bar'>
      <ul>
        <li><Link to={'/'}><i><RiUserLine/></i>Friends</Link></li>
        <li><Link to={'/chatlist'}><i><RiChat1Line/></i>chatlist</Link></li>
        {/* <li><Link to={'/loading'}><i><CiChat2/></i>chatlist</Link></li> */}
        <li><Link to={'/find'}><i><BiSearchAlt/></i>Find</Link></li>
        <li><Link to={'/more'}><i><MdMoreHoriz/></i>More</Link></li>
      </ul>
    </nav>
    </>
  )
}

export default Navigation