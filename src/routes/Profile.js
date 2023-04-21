import Header from 'component/Header';
import React, { useEffect, useState } from 'react'
import'styles/profile.scss';
import { FaPaintBrush } from "react-icons/fa";
import { IoChatbubbleSharp } from "react-icons/io5";
import {BsChevronLeft} from "react-icons/bs";
import { addDoc, collection, doc, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db, storage } from 'fbase';
import { updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function Profile({userObj}) {


 const [newDisplayName,setnewDisplayName] = useState(userObj.displayName);

//  const [chats, setChats] = useState([]);

 const [newImage, setNewImage] = useState("");
// // 배경이미지
 const [newattachment, setnewAttachment] = useState(userObj.photoURL);
//  프로필 이미지


// 배경이미지
  useEffect(() => {
    const a = query(collection(db, "profile"),
    where("creatorId", "==", userObj.uid),
    orderBy("createdAt", "desc")
    );

  const unsubcribe = onSnapshot(a, (querySnapshot) => {
    const newArray = [];
    querySnapshot.forEach((doc) => {
      newArray.push({...doc.data(),id:doc.id});
      console.log("newArray->",newArray);
      console.log(unsubcribe);
    });
    
    setNewImage(newArray[0]?.attachmentUr);
    // 이거 계속 오류 떴는데 값이 없다고 옵셔널 연산자 사용
    // setChats(newArray);
    console.log('opp->',newArray);
    })
  },[]);

  const onbackSubmit = async (e) => {
    e.preventDefault();
    try {
      let attachmentUr = "";
      if(newImage !== ""){
       const storageRef = 
       ref(storage, `${userObj.uid}/${uuidv4()}`);
       const response = await uploadString(storageRef, newImage, 'data_url');
       console.log('responser->',response);
       attachmentUr = await getDownloadURL(ref(storage, response.ref)); //http://
      }
      const docRef = await addDoc(collection(db,"profile"),{
        creatorId: userObj.uid,
        createdAt:Date.now(),
        attachmentUr,
      });
      console.log("Document written with ID: ", docRef.id);
      console.log(attachmentUr);
    }catch{

    }
    
    };

  // 배경이미지
  const onBackchange = (e) => {
   console.log('ee->',e);
   const {target:{files}} =e;
   const backFile = files[0];
   console.log('backFile=>', backFile);

   const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      console.log(finishedEvent);
      const {currentTarget:{result}} = finishedEvent; //data:image
      setNewImage(result);
    }
    reader.readAsDataURL(backFile);
  };


  // 프로필 이미지
  const onSubmit = async (e) => {
  e.preventDefault();
  try{
    let attachmentUrl ="";
    if(newattachment !== ""){
      const storageRef =
      ref(storage, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(storageRef, newattachment, 'data_url');
      console.log('responser->',response);
      attachmentUrl = await getDownloadURL(ref(storage, response.ref)); //http://
      await updateProfile(userObj,{
        displayName: newDisplayName,
        photoURL:attachmentUrl
      });
     }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const onFilechange = (e) => {
  console.log(e);
  const {target:{files}} = e;
  const theFile = files[0];
  console.log(theFile); //jpg

  const reader = new FileReader();
  reader.onloadend = (finishedEvent) => {
    console.log(finishedEvent);
    const {currentTarget:{result}} = finishedEvent; //data:image
    setnewAttachment(result);
  }
  reader.readAsDataURL(theFile);
}

/*      if(userObj.displayName !== newDisplayName) {
        await updateProfile(userObj,{displayName:newDisplayName
         });
      } */


// 프로필 이름
const onSubmitName = async(e) =>{
  e.preventDefault();
  await updateProfile(userObj, {
    displayName: newDisplayName,
  });
}

  const onChange = (e) => {
  const {target: {value}} = e;
  console.log('proE->', e);
  setnewDisplayName(value);
  };

  
  





  return (
  <div>
    <Header iconback = {<BsChevronLeft/>} className="chatting"></Header>

  <main className='profile_main_my'>

  {/* 배경이미지 */}
  <form onSubmit={onbackSubmit} className='profile_form_my'>
    <div className='background_first'>
    {newImage && (
      <img src={newImage} alt='프로필 배경이미지' className='backgroundImg'/>
    )}
    </div>
    
    <div className='background'>
    <label htmlFor="background-file" > 
    <span className='img_edit_back'><FontAwesomeIcon icon="fa-solid fa-pencil" />
    <span>배경이미지 편집</span></span>
    {/* <span>배경이미지 편집</span> */}
    </label>

    <input type='file' accept='image/*' onChange={onBackchange} id='background-file' style={{display:"none"}} />

    <button type='submit' value='수정완료' id='backimg_ok' className='back_ok'>
    <FontAwesomeIcon icon="fa-solid fa-arrow-up-from-bracket" />
    <span>저장</span>
    </button>
    
    </div>
</form>

{/* 프로필 사진 */}
<form onSubmit={onSubmit} className='profile_form_img'>
  <section className="profile_img">

  <div className='profile_imges'>
    {newattachment && (
      <img src={newattachment} alt='' className='profile_img_my'/>
    )}
  </div>
    <input type='file' accept='image/*' onChange={onFilechange} id='attach-file' style={{display:'none'}} />
    <label htmlFor='attach-file'>
      <span className='profile_img_file'>파일</span>
    </label>

  <button type='submit' value='프로필편집 완료' className='profile_img_btn'>프로필사진</button>
  </section>
</form>

{/* 프로필 이름 */}
<form onSubmit={onSubmitName} className='profile_form_name'>
<input type='text' onChange={onChange} value={newDisplayName} placeholder='이름을 입력해주세요' className="profile_name"/>

<button type='submit' value='프로필이름 완료' className='profile_name_edit'>프로필이름</button>
</form>

<p className='profile_email_user'>{userObj.email}</p>

  </main>
    </div>
    )
}

export default Profile

