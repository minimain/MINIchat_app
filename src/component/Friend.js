import React from 'react'
import { Link } from 'react-router-dom';
import'styles/home.scss';

function Friend({name, username, image, email, background}) {
  return (
    <>  
     {/*홈 친구리스트  */}
    <section className="main_section">
      <ul className='home_profile_list'>
        <li>
          <Link to={'/friendprofile'} state={{name, username, image, email, background}}>
          <span className="home_profile_img"><img src={image} alt='친구프로필사진' className='home_profile_up'/></span>
          <span className="profile_name">{name}</span>
          <span className="profile_messages">{username}</span>
          </Link>
        </li>
      </ul>
    </section>
</>
  )
}

export default Friend