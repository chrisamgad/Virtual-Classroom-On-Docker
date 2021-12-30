import React,{useState,useContext, useEffect} from 'react'
import CourseContext from '../../../../Contexts/CourseContext';
import styles from './CourseSummary.module.css'
import {Nav} from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import ViewStudents from '../../../ViewStudents/ViewStudents'
import ModifyStudents from '../../../ModifyStudents/ModifyStudents'

const CourseSummary = ()=>{

    const courseCtx=useContext(CourseContext)
    const [navitems,setnavitems]=useState({
        viewstudentsComp:false,
        modifystudentsComp:false
    })

    useEffect(()=>{
        var pathArray = window.location.pathname.split('/');
        
        if(pathArray[5]==='viewstudents')
            setnavitems({
                viewstudentsComp:true,
                modifystudentsComp:false
            })
        else if(pathArray[5]==='modifystudents')
            setnavitems({
                viewstudentsComp:false,
                modifystudentsComp:true
            })
        // courseCtx.SetCurrentCourseChosen()
        //console.log(courseCtx.SetInsideCourseBool)
        courseCtx.SetWentInsideCourse(true)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    //console.log(courseCtx)
    return(
        <Router>
            <div>
                <div className={styles.nav}>
                    <div className={styles.border}></div>
                    <Nav.Item>
                        <Nav.Link className={ navitems.viewstudentsComp ? styles.nav_link_active : styles.nav_link }  
                        onClick={()=>setnavitems({
                            viewstudentsComp:true,
                            modifystudentsComp:false
                        })}
                        as={Link} 
                        to={`/dashboard/mycourses/${JSON.parse(localStorage.getItem("current_course_chosen"))._id}/coursesummary/viewstudents`}>View Students Enrolled</Nav.Link>
                    </Nav.Item>
                    <div className={styles.border}></div>
                    <Nav.Item>
                        <Nav.Link className={navitems.modifystudentsComp ? styles.nav_link_active : styles.nav_link} onClick={()=>setnavitems({
                            viewstudentsComp:false,
                            modifystudentsComp:true
                        })}
                        as={Link}
                         to={`/dashboard/mycourses/${JSON.parse(localStorage.getItem("current_course_chosen"))._id}/coursesummary/modifystudents`} >Modify Students Access</Nav.Link>
                    </Nav.Item>
                    <div className={styles.border}></div>
                </div>

                <Switch>
                    <Route exact path={`/dashboard/mycourses/:courseid/coursesummary/viewstudents`}>
                        <ViewStudents />
                    </Route>
                    <Route exact path={`/dashboard/mycourses/:courseid/coursesummary/modifystudents`}>
                        <ModifyStudents />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default CourseSummary;