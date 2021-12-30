import React from 'react';
import {useContext,useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import CourseContext from '../../Contexts/CourseContext';
import Student from './Student/Student'
import styles from './ViewStudents.module.css'
import studentDataService from '../../services/student-data-service';
const ViewStudents = ()=>{

    const {courseid}=useParams()
    const courseCtx=useContext(CourseContext)
    const [studentsincourse,setstudentsincourse]=useState({
        CurrentstudentsDisplayed:[],
        ActualTotalStudentsArrLength:-1
    })

    const [skip,setskip]=useState(0)
    const [limit,setlimit]=useState(3)
    const [NoMoreStudents,setNoMoreStudents]=useState(false)
    useEffect(()=>{
        //console.log(courseid)
        studentDataService.getCurrentStudents(courseid,limit,skip)
            .then((res)=>{
                //console.log(res.body)
                const students=res.data.studentsList;
                setstudentsincourse({
                    CurrentstudentsDisplayed:students,
                    ActualTotalStudentsArrLength:res.data.TotalStudentsArrLength
                })
                //setTotalStudentsArrLength(res.data.TotalStudentsArrLength)
                //console.log(TotalStudentsArrLength)

                courseCtx.SetWentInsideCourse(true)
            })
            .catch((e)=>console.log(e))
       

            if(studentsincourse.CurrentstudentsDisplayed.length >=studentsincourse.ActualTotalStudentsArrLength)
                setNoMoreStudents(true)
            else
                setNoMoreStudents(false)


            
            // console.log("studentsincourse" +studentsincourse.length)
            // console.log("Totalstudentsarrlength" +TotalStudentsArrLength)
    },[studentsincourse.CurrentstudentsDisplayed.length, studentsincourse.ActualTotalStudentsArrLength])
    
    
    const showmorestudents =()=>{   
        setlimit(prev => {
            if(studentsincourse.CurrentstudentsDisplayed.length<studentsincourse.ActualTotalStudentsArrLength)
            {
                const newlimit=prev+3;
                studentDataService.getCurrentStudents(courseid,newlimit,skip)
                    .then((res)=>{
                        const students=res.data.studentsList;
                        // setTotalStudentsArrLength(res.data.TotalStudentsArrLength)
                        setstudentsincourse({
                            CurrentstudentsDisplayed:students,
                            ActualTotalStudentsArrLength:res.data.TotalStudentsArrLength
                        })
                        courseCtx.SetWentInsideCourse(true)
                    })
                    .catch((e)=>console.log(e))

                return newlimit
            }
            else
                return prev   
        })
            
        
    }
    //console.log(NoMoreStudents)
    //console.log("newstudentsincourse = "+ studentsincourse.CurrentstudentsDisplayed.length + "and Totalsarrlength = " + studentsincourse.ActualTotalStudentsArrLength)
    return(
        <div>
            <p className={styles.heading}>Students Enrolled in the Course</p>
            <p className={styles.totalNStudents}>Total Number of Students Enrolled in this course is {studentsincourse.ActualTotalStudentsArrLength}</p>
            <div className={styles.StudentsContainer}>
                {studentsincourse.CurrentstudentsDisplayed.map((student,index)=><Student key={index} index={index+1} student={student}/>) }
           </div>
           
            <div className={styles.showmorecontainer} style={NoMoreStudents? {display:'none'} : null} onClick={showmorestudents}>
                <div>Show More</div>
                {/* <i className={`fas fa-caret-square-down ${styles.showmore}`} style={NoMoreStudents? {display:'none'} : null} onClick={showmorestudents}></i> */}
            </div>
           
        </div>
    )
}

export default ViewStudents;