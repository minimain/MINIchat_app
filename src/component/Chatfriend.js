import React from 'react';
import { Link } from 'react-router-dom';


function Chatfriend({name, username, image}) {
  
  return (
    
    <>
    {/* 홈 친구리스트 */}
    <section className="main_section">
     <ul>
     <li>
       <Link to={'/chat'} state={{name, username, image}}>
         <span className="chats_img empty">
          <img src={image} alt='친구프로필사진'/></span>
         <span className="chats_cont">
           <span className="chats_name">{name}</span>
           <span className="chats_latest">{username}</span>
         </span>
         <span className="chats_time"><span>17</span>:<span>33</span></span>
         </Link>
     </li>
     </ul>
     </section>
    </>
  )
}

export default Chatfriend