import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from 'component/Header';
import Navigation from 'component/Navigation';
import Friend from 'component/Friend';
import { BiSearchAlt } from "react-icons/bi";
import profileimg from 'data/profileimg.json';
import'styles/home.scss';
import { Link } from 'react-router-dom';


function Home({userObj}) {
  console.log('userObj->', userObj);
  // 친구 외부 데이터
  const [friend, setFriends] = useState([]);
  const getFriends = async () => {
    const
        {
          data: friend
        }= await axios.get('https://jsonplaceholder.typicode.com/users');
    console.log(friend);
    setFriends(friend); 
  };

useEffect(() =>{
  getFriends();
}, []);

  return (
    <>
    <Header 
     h1="Friend" span="1" 
     iconback="Manage" className = "header"/>

    <main className='home'>
    <div className='friends'>  
    <form className="search_box">
      <fieldset className="search_inner">
        <legend className="blind">검색창</legend>
        <i><BiSearchAlt/></i>
        <input type="search" name="search" id="search" placeholder="친구 이름과 채팅방이름으로 검색하세요." className='home_input_search'/>
      </fieldset>
    </form>
    </div>
   
   <section className="main_section">
      <header><h2>MY PROFILE</h2></header>
      
      <ul className='home_profile_list'>
        <li>
        <Link to={'/profile'} userObj={userObj}>
          <span className="home_profile_img">
            <img src={userObj.photoURL} alt='' className='home_profile_up'/>
          </span>
          <span className="home_profile_name">{userObj.displayName}</span>
        </Link>
        </li>
      </ul>
      
      <header><h2>FRIEND LIST</h2></header>
    </section>
   
    </main>

    <div className='friend_list_home'>
      {friend.map((friends,index)=><Friend
                                     key={index}
                                     id={friends.id}
                                     name={friends.name}
                                     username={friends.username}
                                     email={friends.email}
                                     image = {profileimg[index].image}
                                     background = {profileimg[index].background}
                                     />

      )}
      
    </div>

    <Navigation/>
    </>
    
  )
}

export default Home