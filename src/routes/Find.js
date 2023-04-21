import Header from 'component/Header';
import Navigation from 'component/Navigation'
import React from 'react';
import { BsQrCode, BsFillJournalBookmarkFill, BsPhone, BsFillEnvelopeFill } from "react-icons/bs";
import'styles/find.scss';

function Find() {
  return (
    <>
    <Header
      h1="Find" a="Edit" className="header"
      ></Header>
    
    <main className='outher_main'>
       <ul className="find_method">
         <li><span><i><BsFillJournalBookmarkFill/></i>Find</span></li>
         <li><span><i><BsQrCode/></i>QR Code</span></li>
         <li><span><i><BsPhone/></i>Shake</span></li>
         <li><span><i><BsFillEnvelopeFill/></i>Invite via SNS</span></li>
       </ul>
       <section className="recommend_section">
         <header><h2>Recommend Friends</h2></header>
         <ul>
           <li>You Have no recommend friends.</li>
         </ul>
       </section>
      </main>
    <Navigation/>
    </>
  )
}

export default Find