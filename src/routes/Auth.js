import React, { useState } from 'react'
import { authService } from 'fbase';
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import'styles/auth.scss';

function Auth() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  const onChange = (e) => {
    console.log('e.target.name->',e.target.name);
    console.log('e->',e);
    const {target:{name, value}} = e;
    if(name === 'email'){
      setEmail(value);
    }else if(name === 'password'){
      setPassword(value);
    }
  };


  const onSubmit = async (e) => {
   e.preventDefault();
   try{
    let data;
    if(newAccount){
      data = await createUserWithEmailAndPassword(authService, email, password);
    }else{
      data = await signInWithEmailAndPassword(authService, email, password);
    }
    console.log('data->',data);
   }catch ( error ) {
    console.log('error->',error);
    setError(error.message);
   }
  };

  const toggleAccount = () => setNewAccount(prev => !prev);

  const onSocialClick = async (e) => {
    console.log('e.target.name->',e.target.name);
    const {target:{name}} =e;
    let provider;
    if(name === 'google') {
      provider = new GoogleAuthProvider();
    }else if(name === 'github') {
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(authService,provider);
    console.log('data->',data);
  };

  
  return (
    <>
    <div className='auth_container'>
      <form onSubmit={onSubmit} className='auth_form'>
        <p className='auth_title'>MINI Chat</p>
        <div className='auth_btns'>
        <input name='email' type='email' placeholder='Email' required value={email} onChange={onChange} className='auth_btn'/>

        <input name= "password" type='password' placeholder='Password' required value={password} onChange={onChange} className='auth_btn'/>
        </div>

        <input type='submit' value={newAccount ? "회원가입" : "로그인"} 
        className='auth_btn log_btn'/>

      </form>

      <span onClick={toggleAccount} className='toggle_btn'>
        {newAccount ? "회원가입 완료 사용자" : "email|password 입력 완료"}
      </span>

      <div className='social_log'>
        <button onClick={onSocialClick} name="google">
        <FontAwesomeIcon icon="fa-brands fa-google" />
        </button>
        
        <button onClick={onSocialClick} name="github"> <FontAwesomeIcon icon="fa-brands fa-github" /></button>
        
      </div>
    </div>
    </>
  )
}

export default Auth