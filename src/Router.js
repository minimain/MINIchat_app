import Chatfriend from 'component/Chatfriend'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Auth from 'routes/Auth'
import Chat from 'routes/Chat'
import Chatlist from 'routes/Chatlist'
import Find from 'routes/Find'
import FriendProfile from 'routes/FriendProfile'
import Home from 'routes/Home'
import Loading from 'routes/Loading'
import More from 'routes/More'
import Profile from 'routes/Profile'

function AppRouter({isLoggeIn, userObj}) {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
      {isLoggeIn ? (
        <>
        <Route path='/' element={<Home userObj={userObj}/>} />
        <Route path='/chat' element={<Chat userObj={userObj}/>} />
        <Route path='/more' element={<More userObj={userObj}/>} />
        <Route path='/find' element={<Find />} />
        <Route path='/chatlist' element={<Chatlist />} />
        <Route path='/profile' element={<Profile userObj={userObj}/>}/>
        <Route path='/chatfriend' element={<Chatfriend />}/>
        <Route path='/friendprofile' element={<FriendProfile />} />
        {/* <Route path='/loading' element={<Loading />} /> */}
        </>
      ) : (
        <Route path='/' element={<Auth />}/>
      )}
    </Routes>
    </BrowserRouter>
  )
}

export default AppRouter