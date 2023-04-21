import React from 'react'
import { useLocation } from 'react-router-dom';
import { FaPaintBrush } from "react-icons/fa";
import { IoChatbubbleSharp } from "react-icons/io5";
import {BsChevronLeft} from "react-icons/bs";
import Header from 'component/Header';
import'styles/friendprofile.scss';
import classNames from 'classnames';

function FriendProfile() {

  const location = useLocation();
  console.log('location->',location);
  const {name, username, image, email, background} = location.state;
  return (
    <div>
    <Header iconback = {<BsChevronLeft/>} className="chatting"></Header>



<main className='profile_page'>
<section className="background"><img src={background} alt=''/>
  <h2 className="blind">My profile background image</h2>
</section>
<section className="profile">
  <h2 className="blind">My profile info</h2>
  <div className="profile_img empty"><img src={image} alt=''/></div>
  <div className="profile_cont">
    <span className="profile_name">{name}</span>
    <span className="profile_email">{email}</span>
    <ul className="profile_menu">
      <li>
        <a href="#">
          <span className="icon">
            <i><IoChatbubbleSharp/></i>
          </span>
          My Chatroom
        </a>
      </li>
      <li><a href="#"><span className="icon"><i><FaPaintBrush/></i></span>Edit Profile</a></li>
    </ul>
  </div>
</section>
</main>
  </div>
  )
}

export default FriendProfile