import { useEffect, useState } from "react";
import AppRouter from "Router";
import { authService } from "fbase";
import { onAuthStateChanged } from "firebase/auth";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons'
import Loading from "routes/Loading";
library.add(fas, faGoogle, faGithub)




function App() {
  const [init, setInit] = useState(false);
  const [isLoggeIn, setIsLoggedIn] = useState(authService.currentUser);
  console.log('authService->',authService.currentUser);

  const [userObj, setuserObj] = useState(null);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      console.log('user->',user);
      if(user){
        setIsLoggedIn(user);
        setuserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  },[]);
  
  
  return (
    <>
    {init ? (
 <AppRouter isLoggeIn={isLoggeIn} userObj={userObj} />
    ) : (
      <Loading/>
    )}
    </>
  );
}

export default App;
