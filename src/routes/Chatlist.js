import Chatfriend from 'component/Chatfriend';
import Navigation from 'component/Navigation';
import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import { CiChat2} from "react-icons/ci";
import { BiSearchAlt } from "react-icons/bi";
import profileimg from 'data/profileimg.json';
import axios from 'axios';
import Header from 'component/Header';
import'styles/chatlist.scss';

function Chatlist() {

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
    h1="Chat" a="Edit" className="header"></Header>

<main className='chatList'>

<form className="search_box">
       <fieldset className="search_inner">
         <legend className="blind">검색창</legend>
         <i><BiSearchAlt/></i>
         <input type="search" name="search" id="search" placeholder="친구 이름, 채팅방 이름을 입력하세요." />
       </fieldset>
     </form>
 
<div className='friends'>
      {friend.map((friends,index)=><Chatfriend
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

    <div className="chat_fa_btn">
     <span>
       <i><CiChat2/></i>
     </span>
     </div>

</main>


    {/* <div><Link to={'/profile'}>친구한명</Link></div> */}
    <Navigation/>
    </>
    
  )
}

export default Chatlist