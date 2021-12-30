import React,{useContext, useEffect, useState} from "react";
import {Nav} from "react-bootstrap";
import {Link} from 'react-router-dom'
import styles from './Sidebar.module.css'
import CourseContext from "../../Contexts/CourseContext";
import studentDataService from "../../services/student-data-service";
import axios from 'axios'
import Generic_profilepic from '../../pages/Profile/defaultavatar.png'
import authService from '../../services/auth.service'

const Sidebar = () => {
 
    const [componentstyles,setcomponentstyles]=useState({
        homeComp:false,
        coursesComp:false,
        announcmentsComp:false,
        gradesComp:false,
        profileComp:false,
        settingsComp:false,
        coursesummaryComp:false,
        assignmentsComp:false
    })

    const [userimage,setuserimage]=useState(undefined)
    const courseCtx= useContext(CourseContext)
    
    useEffect(()=>{

        var pathArray = window.location.pathname.split('/');
        if(window.location.pathname === '/dashboard/home')
            setcomponentstyles({
                ...componentstyles,
                homeComp:true
            });
        else if (window.location.pathname === '/dashboard/mycourses' )  
            setcomponentstyles({
                ...componentstyles,
                coursesComp:true
            });
        else if (window.location.pathname === '/dashboard/announcments')
            setcomponentstyles({
                ...componentstyles,
                announcmentsComp:true
            });
        else if (window.location.pathname === '/dashboard/myprofile')
            setcomponentstyles({
                ...componentstyles,
                profileComp:true
            });
        else if (pathArray[2]==="mycourses" && pathArray[4]==="coursesummary")
            setcomponentstyles({
                ...componentstyles,
                assignmentsComp:false,
                coursesummaryComp:true
            });
        else if (pathArray[2]==="mycourses" && pathArray[4]==="assignments")
            setcomponentstyles({
                ...componentstyles,
                coursesummaryComp:false,
                assignmentsComp:true
            });
        


            //console.log(window.location.pathname)
        // if(courseCtx.WentInsideCourse)
        //     setcomponentstyles({
        //         ...componentstyles,
        //         assignmentsComp:false,
        //         coursesummaryComp:true
        //     });

        const user=authService.getCurrentUser()
        if(user.role==='student') 
        {
            axios.get(`http://localhost:4000/getavatar/${user.user.student._id}`).then((response)=>{
                setuserimage(`http://localhost:4000/getavatar/${user.user.student._id}`)
            }).catch((e)=>{
                console.log(e)
                setuserimage(Generic_profilepic)
            })
            //setuserimage(studentDataService.getUserImage())
        }
           
        else if (user.role ==='teacher')
        {
            axios.get(`http://localhost:4000/getavatar/${user.user.teacher._id}`).then((response)=>{
                setuserimage(`http://localhost:4000/getavatar/${user.user.teacher._id}`)
            }).catch((e)=>{
                console.log(e)
                setuserimage(Generic_profilepic)
            })
            //setuserimage(studentDataService.getUserImage())
        }
            
              
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[courseCtx.WentInsideCourse])

    const setCurrentLink= (current_component)=>{

       if(current_component==='home')
            setcomponentstyles({
                coursesComp:false,
                announcmentsComp:false,
                gradesComp:false,
                profileComp:false,
                settingsComp:false,
                homeComp:true,
                coursesummaryComp:false,
                assignmentsComp:false

            });
        else if(current_component==='courses')
            setcomponentstyles({
                homeComp:false,
                announcmentsComp:false,
                gradesComp:false,
                profileComp:false,
                settingsComp:false,
                coursesummaryComp:false,
                assignmentsComp:false,
                coursesComp:true,

            });
        else if(current_component === 'announcments')
            setcomponentstyles({
                homeComp:false,
                gradesComp:false,
                profileComp:false,
                settingsComp:false,
                coursesComp:false,
                coursesummaryComp:false,
                assignmentsComp:false,
                announcmentsComp:true
    
            });
        else if (current_component === 'grades')
            setcomponentstyles({
                homeComp:false,
                coursesComp:false,
                announcmentsComp:false,
                profileComp:false,
                settingsComp:false,
                coursesummaryComp:false,
                assignmentsComp:false,
                gradesComp:true
            });
        else if (current_component === 'profile')
            setcomponentstyles({
                homeComp:false,
                coursesComp:false,
                announcmentsComp:false,
                gradesComp:false,
                settingsComp:false,
                coursesummaryComp:false,
                assignmentsComp:false,
                profileComp:true
            });
        else if (current_component === 'settings')
        setcomponentstyles({
            homeComp:false,
            coursesComp:false,
            announcmentsComp:false,
            gradesComp:false,
            profileComp:false,
            coursesummaryComp:false,
            assignmentsComp:false,
            settingsComp:true
        });
        else if (current_component === 'coursesummary')
            setcomponentstyles({
                homeComp:false,
                coursesComp:false,
                announcmentsComp:false,
                gradesComp:false,
                profileComp:false,
                settingsComp:false,
                assignmentsComp:false,
                coursesummaryComp:true
               
            });
        else if (current_component === 'assignments') 
            setcomponentstyles({
                homeComp:false,
                coursesComp:false,
                announcmentsComp:false,
                gradesComp:false,
                profileComp:false,
                settingsComp:false,
                coursesummaryComp:false,
                assignmentsComp:true,
            });

       
    }

    //console.log(courseCtx.WentInsideCourse)

    const ReturnInisdeCourseSidebar = ()=>{
        const teacherSidebar=
        <div>
            <Nav.Link className={`${styles.NavLink}  ${componentstyles.coursesummaryComp ? styles.onClickLinkStyle : null}` } as={Link} to={`/dashboard/mycourses/${JSON.parse(localStorage.getItem("current_course_chosen"))._id}/coursesummary/viewstudents` } onClick={()=>setCurrentLink('coursesummary')}><i style={{marginRight:'10px',fontSize:'18px'}} className="fas fa-clipboard-list"></i>Course Summary</Nav.Link>
            <Nav.Link className={`${styles.NavLink}  ${componentstyles.assignmentsComp ? styles.onClickLinkStyle : null}` } as={Link} to={`/dashboard/mycourses/${JSON.parse(localStorage.getItem("current_course_chosen"))._id}/assignments`} onClick={()=>setCurrentLink('assignments')}><i style={{marginRight:'9px',fontSize:'17px'}} className="fas fa-tasks"></i>Assignments</Nav.Link>
            <Nav.Link className={`${styles.NavLink}  ${componentstyles.back ? styles.onClickLinkStyle : null}` } as={Link} to="/dashboard/mycourses" onClick={()=>setCurrentLink('back')}><i style={{marginRight:'9px'}} className="fas fa-backward"></i>Back</Nav.Link>
        </div>

        const studentSidebar=
        <div>
        <Nav.Link className={`${styles.NavLink}  ${componentstyles.assignmentsComp ? styles.onClickLinkStyle : null}` } as={Link} to={`/dashboard/mycourses/${JSON.parse(localStorage.getItem("current_course_chosen"))._id}/assignments`} onClick={()=>setCurrentLink('assignments')}><i style={{marginRight:'9px',fontSize:'17px'}} className="fas fa-tasks"></i>Assignments</Nav.Link>
        <Nav.Link className={`${styles.NavLink}  ${componentstyles.back ? styles.onClickLinkStyle : null}` } as={Link} to="/dashboard/mycourses" onClick={()=>setCurrentLink('back')}><i style={{marginRight:'9px'}} className="fas fa-backward"></i>Back</Nav.Link>
        </div>

        const Role=JSON.parse(localStorage.getItem("role"))
        if(Role=== "teacher")
            return teacherSidebar
        
        else if(Role === 'student')
            return studentSidebar
        
    }
    
    return (
        <div>
    
        <Nav className={styles.NavContainer}>

            <img
                src={userimage}
                height="100"
                width="100"
                alt="Vimo Logo"

                className={styles.brand}
            /> 
            {
                courseCtx.WentInsideCourse ?
                    ReturnInisdeCourseSidebar()
                :
                <div>
                    <Nav.Link className={`${styles.NavLink}  ${componentstyles.homeComp ? styles.onClickLinkStyle : null}` } as={Link} to="/dashboard/home" onClick={()=>setCurrentLink('home')}><i style={{marginRight:'6px'}} className="fas fa-home"></i>Home</Nav.Link>
                    <Nav.Link className={`${styles.NavLink}  ${componentstyles.coursesComp ? styles.onClickLinkStyle : null}` } as={Link} to="/dashboard/mycourses" onClick={()=>setCurrentLink('courses')}><i style={{marginRight:'6px'}} className="fas fa-book"></i>Courses</Nav.Link>
                    <Nav.Link className={`${styles.NavLink}  ${componentstyles.announcmentsComp ? styles.onClickLinkStyle : null}` } as={Link} to="/dashboard/announcments" onClick={()=>setCurrentLink('announcments')}><i style={{marginRight:'6px'}} className="fas fa-bullhorn"></i>Announcments</Nav.Link>
                    <Nav.Link className={`${styles.NavLink}  ${componentstyles.gradesComp ? styles.onClickLinkStyle : null}` } as={Link} to="/dashboard/mygrades" onClick={()=>setCurrentLink('grades')} ><i style={{marginRight:'6px'}} className="fas fa-star-half-alt"></i>Grades</Nav.Link>
                    <Nav.Link className={`${styles.NavLink}  ${componentstyles.profileComp ? styles.onClickLinkStyle : null}` } as={Link} to="/dashboard/myprofile" onClick={()=>setCurrentLink('profile')} ><i style={{marginRight:'6px', fontSize:'20px'}} className="fas fa-male"></i>My Profile</Nav.Link>
                    <Nav.Link className={`${styles.NavLink}  ${componentstyles.settingsComp ? styles.onClickLinkStyle : null}` }  as={Link} to="/dashboard/settings" onClick={()=>setCurrentLink('settings')} ><i style={{marginRight:'8px'}} className="fas fa-cogs"></i>Settings</Nav.Link>  
                </div>
            }
            
      
        </Nav>
        
        </div>
        );
  };
  export default Sidebar