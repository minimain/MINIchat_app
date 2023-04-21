import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { db, storage } from 'fbase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function Chatinsert({userObj}) {
  const [chat, setChat] = useState("");
  const [attachment, setAttachment] = useState("");

  const onChange = e => {
    e.preventDefault();
    const {target: {value}} = e;
    // console.log('e.->',e);
    setChat(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try{
     let attachmentUrl = "";
     if(attachment !== ""){
       const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
       const response = await uploadString(storageRef, attachment, 'data_url');
       console.log('responser->',response);
       attachmentUrl = await getDownloadURL(ref(storage, response.ref)); //http://
     }
     const docRef = await addDoc(collection(db, "chats"), {
       text: chat,
       createdAt: Date.now(),
       creatorId: userObj.uid,
       attachmentUrl
      });
      console.log("Document written with ID: ", docRef.id);
    }catch (e) {
     console.error("Error adding document: ", e);
    }
    setChat("");
    setAttachment("");
   };

   
  const onFilechange = (e) => {
    console.log('fileE ->',e);
    const {target:{files}} = e;
    const theFile = files[0];
    console.log('theFile->',theFile); //jpg

    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      console.log('finishedEvent->',finishedEvent);
      const {currentTarget:{result}} = finishedEvent; //data:image
      setAttachment(result);
    }
    reader.readAsDataURL(theFile);
  }

  const onclearAttachment = () => {
   setAttachment("");
  }


  return (
    <>
    {/* 글작성 */}
    <form onSubmit={onSubmit} className='chat_insert'>

    <input type='text' value={chat} placeholder='채팅을 입력해주세요' onChange={onChange} className='chat_input'/>

    <input type='file' accept='image/*' onChange={onFilechange} style={{display:"none"}}/>

    <input type='submit' name='submit' value='전송' className='chat_input_value'>
    </input>

    <label htmlFor="attach-file" className='chat_insert_plus'>  
    <span><FontAwesomeIcon icon="fa-solid fa-plus" /></span>
    </label>
    <input type='file' accept='image/*' onChange={onFilechange} id='attach-file' style={{display:"none"}} />

    {/* 이미지 미리보기 */}
    {attachment && (
      <div className='ex_img'>
        <img src={attachment} width="90"  alt=''/>
        <button onClick={onclearAttachment}><FontAwesomeIcon icon="fa-solid fa-xmark"/></button>
      </div>
    )}
   </form>
    </>
  )
}

export default Chatinsert