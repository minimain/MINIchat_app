import Navigation from 'component/Navigation'
import React from 'react';
import { CiChat2, CiFaceSmile } from "react-icons/ci";
import { FaPaintBrush, FaHandPeace, FaUserAlt, FaInfoCircle, FaUtensils, FaStore, FaTv, FaPencilAlt, FaGraduationCap, FaLandmark, FaWonSign, FaVideo } from "react-icons/fa";
import { BsGearFill } from "react-icons/bs";
import { authService } from 'fbase';
import { useNavigate } from 'react-router-dom';
import Header from 'component/Header';
import'styles/more.scss';

function More() {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate('/'); //첫화면으로 이동 즉 리다이렉트 기능이다.
  }
  return (
   <>
    <Header 
     h1="More" span="" 
     iconback="Home" i = <BsGearFill/> className = "header"/>

<main className='outher_main'>
    <section className="user_info">
      <h2 className="blind">사용자 정보</h2>
      <span className="profile_img empty"></span>
      <span className="profile_info">
        <span className="profile_name">My Name</span>
        <span className="profile_email">Userid@gmail.com</span>
      </span>
      <span className="chat_img"><span><i><CiChat2/></i></span></span>
    </section>
    <section className="user_menu">
      <h2 className="blind">사용자 메뉴</h2>
      <ul>
        <li><span><i><CiFaceSmile/></i>Emoticons</span></li>
        <li><span><i><FaPaintBrush/></i>Themes</span></li>
        <li><span><i><FaHandPeace/></i>Plus Friend</span></li>
        <li><span><i><FaUserAlt/></i>Account</span></li>
      </ul>
    </section>
    <section className="plus_friends">
      <header>
        <h2>Plus Friends</h2>
        <span><span><i><FaInfoCircle/></i>Learn More</span></span>
      </header>
      <ul className="plus_list">
        <li><span><i><FaUtensils/></i>Order</span></li>
        <li><span><i><FaStore/></i>Store</span></li>
        <li><span><i><FaTv/></i>Tv Channnel/Radio</span></li>
        <li><span><i><FaPencilAlt/></i>Creation</span></li>
        <li><span><i><FaGraduationCap/></i>Education</span></li>
        <li><span><i><FaLandmark/></i>Politics/society</span></li>
        <li><span><i><FaWonSign/></i>Finanse</span></li>
        <li><span><i><FaVideo/></i>Movies/Music</span></li>
      </ul>
    </section>
    <section className="more_app">
      <h2 className="blind">앱 더보기</h2>
      <ul>
        <li><span className="app_icon"></span>Kakao Story</li>
        <li><span className="app_icon"></span>Path</li>
        <li><span className="app_icon"></span>Kakao friends</li>
      </ul>
    </section>
    </main>

    <span onClick={onLogOutClick} className='formBtn cancelBtn logOut'>Log Out</span>
    <Navigation/>
   </>
  )
}

export default More