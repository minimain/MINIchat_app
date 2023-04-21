import React, { useEffect, useState } from 'react'
import { doc, deleteDoc, updateDoc} from "firebase/firestore";
import { db, storage } from 'fbase';
import {  ref, deleteObject } from "firebase/storage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Chatbox(props) {
  console.log('props->',props);


  const {chatObj:{createdAt, creatorId, text, id, attachmentUrl}, isOwner, userObj} = props;

  const [editing, setEditing] = useState(false);
  const [newChat, setNewChat] = useState(text);
  const [nowDate, setNowDate] = useState(createdAt);
  // const [newattachment, setNewattachment] = useState(attachmentUrl);

  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    if(ok) {
      const data = await deleteDoc(doc(db, "chats", `/${id}`));
      if(attachmentUrl !== ""){
        const desertRef = ref(storage, attachmentUrl);
        await deleteObject(desertRef);
      }
    }
  }

  const toggleEditing = () => setEditing((prev) => !prev); 


  const onChange = (e) => {
   const {target:{value}} = e;
   setNewChat(value);
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    const newChatRef = doc(db, "chats", `/${id}`);

    await updateDoc(newChatRef, {
      text: newChat,
      createdAt: Date.now(),
    });
    setEditing(false);
  }

  useEffect(() => {
    let timeStamp = createdAt;
    const now = new Date(timeStamp);
    setNowDate(now.toDateString());
  },[]);

  return (
   <>
   <div>
   {editing ? (
     <>
     {/* 편집 클릭 */}
     <form onSubmit={onSubmit}>
      <input type='text' onChange={onChange} value={newChat} required />

      <input type='submit' value='Update Chat' />
     </form>
     <button onClick={toggleEditing}>취소하기</button>
     </>
     ) : (
      <>
      {/* props */}
       
      {attachmentUrl && (
        <img src={attachmentUrl} width="50" height="50" alt="" />
      )}
      <p className='my_box'>{text}</p>
       <span>{nowDate}</span>
        {isOwner && (
        
        <button onClick={onDeleteClick} className='trash_icon'><FontAwesomeIcon icon="fa-solid fa-trash-can" /></button>
        )}
      </>
     )}
   </div>
   </>
  )
}

export default Chatbox