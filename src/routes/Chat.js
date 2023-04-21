import React, { useEffect, useState } from 'react'
import { collection, addDoc, query, orderBy, onSnapshot, where } from "firebase/firestore";
import { db } from 'fbase';
import {BsChevronLeft} from "react-icons/bs";
// import profileimg from 'data/profileimg.json';
import'styles/chat.scss';
import Chatbox from 'component/Chatbox';
import Chatinsert from 'component/Chatinsert';
import Header from 'component/Header';
import { useLocation } from 'react-router-dom';

function Chat({userObj}) {
  console.log('userObj->',userObj);
  
  

  const locations = useLocation();
  console.log('locations->',locations);
  const {name, username, image} = locations.state;
// 보낸거 다 가져와야하네...

  const [chats, setChats] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "chats"),
                     where("creatorId", "==", userObj.uid),
                     orderBy("createdAt", "asc")
                     );

     const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => {
        newArray.push({...doc.data(), id:doc.id});
        console.log(newArray);
      });
      setChats(newArray);
    });
  },[]);

  return (
   <>
   <Header className="chat_boxs" iconback = <BsChevronLeft/> h1="Chatting"/>

   <div className='main'>
  <span className="date_info">Thursday, March 23, 2023</span>
  <div className="chat_box other">
  <div className="other_info">
    <span className="profile_img empty"><img src={image}/></span>
    <span className="profile_name">{name}</span>
  </div>
  <span className="chat">안녕하세요.</span>
  <span className="chat">MINI Chat에 오신것을</span>
  <span className="chat">환영합니다.</span>
  <span className="chat_time"><span>11</span>:<span>15</span></span>
  </div>

{/* 내 채팅 */}
<div className='chat_box my'>
   <div>
    {chats.map(chat => (
      <span className='chatmy'>
      <Chatbox key={chat.id} chatObj={chat} userObj={userObj}
      isOwner={chat.creatorId === userObj.uid} />
      </span>
    ))}
   </div>
   </div>
  </div>
<footer>
<Chatinsert userObj={userObj}/>
</footer>










   </>
  )
}

export default Chat