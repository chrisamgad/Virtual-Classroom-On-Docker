import React,{useEffect, useState,useContext} from 'react'
import {Button} from 'react-bootstrap'
import Studentservice from '../../services/student-data-service'
import Course from './Course/Course'

import styles from './MyCourses.module.css'
import AuthenticatedContext from '../../Contexts/AuthenticatedContext'
import CourseContext from '../../Contexts/CourseContext'

const MyCourses =(props)=>{
    
    const [courses,setcourses]=useState([])
    const [copycoursesBeforeDelete,set_copycoursesBeforeDelete] =useState([])

    const [userdetails,setuserdetails]=useState({
        name:'',
        role:'',
        instructorname:'',
        studentslist:[]
    })

    
   const authenticateduserCtx= useContext(AuthenticatedContext)
   const courseCtx=useContext(CourseContext)

   const [deletecourseState,setdeletecourseState]= useState(false)

    useEffect(()=>{

        courseCtx.SetWentInsideCourse(false);
      // authenticateduserCtx.SetAuthenticatedUser()
        if(authenticateduserCtx.AuthenticatedUserRole==="student")
        {
            //console.log(authenticateduserCtx.AuthenticatedUser.student.fullname)
            setuserdetails({
                name:authenticateduserCtx.AuthenticatedUser.student.fullname,
                role:authenticateduserCtx.AuthenticatedUser.student.role
            })
            Studentservice.getCourses().then((response)=>{
                //console.log(response)
                setcourses(response.data)
                set_copycoursesBeforeDelete(response.data)
              }).catch((e)=>console.log(e))
        }
        else if (authenticateduserCtx.AuthenticatedUserRole==="teacher")
        {
            //console.log(authenticateduserCtx.AuthenticatedUser.teacher.fullname)
            setuserdetails({
                name:authenticateduserCtx.AuthenticatedUser.teacher.fullname,
                role:authenticateduserCtx.AuthenticatedUser.teacher.role
            })
            Studentservice.getCourses().then((response)=>{
               // console.log(response.data)
                setcourses(response.data)
                set_copycoursesBeforeDelete(response.data)
              }).catch((e)=>console.log(e))
        }
        else{
            setuserdetails({
                name:'',
                role:''
            })
        }
    
    
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[authenticateduserCtx,courseCtx.courses_changed])

    const getInstructorName =(course)=>{
        const instructorname=course.instructor.fullname
        //console.log(instructorname)
        return instructorname
    }

    const getTotalNumberOfCourese=()=>{
        return courses.length
    }

    const  HandleNewCourseClick = ()=>{
        props.setShowBackdrop(true)
    }

    const  setDeleteCourseState = (value)=>{
        setdeletecourseState(value)

    }

    const handleValidatingDeleteFromUser = (deleteBool)=>{
        if(deleteBool)
            {
                setdeletecourseState(false)
                //console.log(courses)
                Studentservice.DeleteCourses(courses)
                .then((res)=>console.log(res.data))
                .catch((e)=>console.log(e))
               // Studentservice
            }
        else
            {
                setcourses(copycoursesBeforeDelete)
                setdeletecourseState(false)
            }

    }
    
    const ReturnIfTeacher = ()=>{
        if(userdetails.role==='teacher')
            return <div>
                            <Button variant="success" className={styles.ADDcourse} onClick={HandleNewCourseClick}>Add Course</Button>
                            <Button variant="danger" className={styles.DELETEcourse} onClick={()=>setDeleteCourseState(true)}>Delete Course</Button>
            </div>
        else
            return null
    }
    

    //console.log(userdetails)
    return (
        <div>
            <div className={styles.Mycoursesheadercontainer}>
                <div className={styles.heading}>COURSES</div>
                
                    {
                        (deletecourseState) ? 
                        <div>
                            <Button variant="danger" className={styles.DELETEcourse} style={{right: '120px'}} onClick={()=>handleValidatingDeleteFromUser(true)}>Are you sure?</Button>
                            <Button variant="warning" className={styles.DELETEcourse} onClick={()=>handleValidatingDeleteFromUser(false)}>Cancel</Button>
                        </div>
                           :
                            ReturnIfTeacher()
                    }
                
            </div>
            <p className={styles.N_courses_paragraph}  >Total Number of courses you have is {getTotalNumberOfCourese()}</p>
            <div className={styles.coursescontainer} id={styles["scroll"]}> 
           {  
               courses.map((course,id)=>{
                    
                   return <Course key={id} courses={courses} setcourses={setcourses} course={course} Thiscoursename={course.name} ThiscourseID={course._id.toString()} 
                   instructor={getInstructorName(course)} role={userdetails.role} delete={deletecourseState}  setdeletecoursestate={setdeletecourseState}/>
               })
            
            }
            </div>
        </div>
    )
}

export default MyCourses;