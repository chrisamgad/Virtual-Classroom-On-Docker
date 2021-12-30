import {Navbar,Nav,Container} from 'react-bootstrap'
import styles from'./MainNavigation.module.css'
import './MainNavigation.css'
import {Link} from 'react-router-dom'
import React,{useEffect, useState,useContext} from 'react'
import AuthenticatedContext from '../../Contexts/AuthenticatedContext'
import CourseContext from '../../Contexts/CourseContext'
import authService from '../../services/auth.service'


const MainNavigation = () =>{
  
  var pathArray = window.location.pathname.split('/');
  const authenticateduserCtx = useContext(AuthenticatedContext)
  const coursectx = useContext(CourseContext)
  const [userdetails,setuserdetails]=useState({
    name:''
  })
  const [activelink,setactivelink]=useState({
    home:false,
    our_story:false,
    contact_us:false,
    dashboard:false
  })

  useEffect(()=>{
    //console.log('test')
    // authenticateduserCtx.SetAuthenticatedUser()
    if(authenticateduserCtx.AuthenticatedUser)
    {
      
      if(authenticateduserCtx.AuthenticatedUserRole ==='teacher')
        {
          setuserdetails({
          name:authenticateduserCtx.AuthenticatedUser.teacher.fullname
          })
        }
      else if(authenticateduserCtx.AuthenticatedUserRole ==='student')
        {
          setuserdetails({
          name:authenticateduserCtx.AuthenticatedUser.student.fullname
        })
      }
    }
    else{
      setuserdetails({
        name:''
      })
    }


    if(pathArray[1]==='dashboard')
    {
      setactivelink({
        home:false,
        our_story:false,
        contact_us:false,
        dashboard:true
      })
    }
    else if(pathArray[1]==='')
    {
      setactivelink({
        home:true,
        our_story:false,
        contact_us:false,
        dashboard:false
      })
    }
    else if(pathArray[1]==='ourstory')
    {
      setactivelink({
        home:false,
        our_story:true,
        contact_us:false,
        dashboard:false
      })
    }
    else if(pathArray[1]==='contactus')
    {
      setactivelink({
        home:false,
        our_story:false,
        contact_us:true,
        dashboard:false
      })
    }
    
  console.log(pathArray)
  },[ authenticateduserCtx])

  const LogoutHandler =()=>{
    authService.logout().then((res)=>{
      authenticateduserCtx.SetAuthenticatedUser()
    }).catch((e)=>console.log(e))
  }

  // console.log(userdetails)
    // console.log(authenticateduserCtx.AuthenticatedUser)
    return(
    <div>
      <Navbar className={styles.colornav} variant="light">
        <Container>
        <Navbar.Brand href="#home">
      <img
        src="/images/logo.png"
        height="100"
        width="100"
        alt="Vimo Logo"
      />
      </Navbar.Brand>
        <Nav className="me-auto">
            <Nav.Item>
                <Link className={ activelink.home ? styles.active :styles.navlinkstyle} onClick={()=>
                  setactivelink({        
                    home:true,
                    our_story:false,
                    contact_us:false,
                    dashboard:false })}
                to="/" >HOME</Link>
            </Nav.Item>
            <Nav.Item>
                <Link className={activelink.our_story ? styles.active :styles.navlinkstyle}  onClick={()=>
                  setactivelink({        
                    home:false,
                    our_story:true,
                    contact_us:false,
                    dashboard:false })}
                to="/ourstory">OUR STORY</Link>
            </Nav.Item>
            <Nav.Item>
                <Link className={activelink.contact_us ? styles.active :styles.navlinkstyle}   onClick={()=>
                  setactivelink({        
                    home:false,
                    our_story:false,
                    contact_us:true,
                    dashboard:false })}
                to="/contactus">CONTACT US</Link>
            </Nav.Item>
            {
              (authenticateduserCtx.AuthenticatedUser) ?               
              <div>
                <Nav.Item>
                  <Link className={activelink.dashboard ? styles.active :styles.navlinkstyle}  
                      onClick={()=>{
                      setactivelink({        
                        home:false,
                        our_story:false,
                        contact_us:false,
                        dashboard:true })
                        
                        coursectx.SetWentInsideCourse(false) //when user chooses another nav link, then returns back to dashboard, the sidebar of dashboard will shop the home options
                        }      
                      }
                  to="/dashboard/home">DASHBOARD </Link>
                </Nav.Item>
            </div> 
            : 
            null
            }
        </Nav>

        
        { (!authenticateduserCtx.AuthenticatedUser) ? <Link className={styles.LoginLink} to="/login">LOG IN </Link> 
         : 
         <div className={styles.containerWelcomeMessage}>
          <div className={styles.WelcomeMessage}>Welcome, {userdetails.name}</div>
          <Link className={styles.LogoutLink} to="/" onClick={LogoutHandler}>LOG OUT </Link> 
         </div>
         }
        
        
        </Container>
      </Navbar>
    </div>
    
    )
}

export default MainNavigation