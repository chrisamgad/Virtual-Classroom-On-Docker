import React, { useEffect,useContext } from "react";
import MainNavigation from './components/MainNavigation/MainNavigation'
import {Switch,Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import OurStory from './pages/OurStory/OurStory'
import ContactUs from './pages/ContactUs/ContactUs'
import Login from './pages/Login/Login'
import SignUp from "./pages/SignUp/SignUp";
import Profile from './pages/Profile/Profile'
import SetAvatar from "./pages/SetAvatar/SetAvatar";
import './App.css';
import Dashboard from "./pages/Dashboard/Dashboard";
import AuthenticatedContext from './Contexts/AuthenticatedContext'


function App() {
 // const [test,settest]=useState('true')
  const authenticateduserCtx= useContext(AuthenticatedContext)

  useEffect(()=>{
    
    // 1. rendring occurs first time 3shan elpage btefta7 3ady w useEffect is detected, and after page finishes rending, useEffect will run 
    //2. After page finished rendering, useEffect runs, settest('false') is detected and gets executed AFTER useEffect finishes running (test is still true gowa eluseEffect)
    //3. After useEffect finishes running, test becomes true and since state changing,  elpage re-renders tany(useEffect won't re-render again beacuse the array of dependencies fadya
    //which means en useEffect hatrun only 3and awel page render w ba3diha msh hatrun tany so on the 2nd page re-render useEffect will be skipped w elcode elba3d useEffect hayrun 3ady)
    
    //settest('false')
    //console.log(test + ' 1inside UseEffect')
    authenticateduserCtx.SetAuthenticatedUser()
    //console.log(test + ' 2inside UseEffect')


    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

 // console.log(test + 'outside useEffect')
  
  //console.log(authenticateduserCtx.AuthenticatedUser) 
  return (
    <div>
        <MainNavigation/>
        <Switch>
        <Route path="/" exact>
              <Home />
            </Route> 
            <Route path="/ourstory">
              <OurStory />
            </Route>
            <Route path="/contactus">
              <ContactUs />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/createaccount">
              <SignUp />
            </Route>
            <Route path="/myprofile">
              <Profile />
            </Route>
            <Route path="/setavatar">
              <SetAvatar />
            </Route>
            <Route path="/dashboard" >
              <Dashboard />
            </Route>
          </Switch>
        
    </div>
  );
}

export default App;
