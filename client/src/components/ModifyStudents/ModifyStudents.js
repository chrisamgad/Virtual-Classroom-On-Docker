import React from 'react';
import {useContext,useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import CourseContext from '../../Contexts/CourseContext';
import styles from './ModifyStudents.module.css'
import studentDataService from '../../services/student-data-service';
import Student from './Student/Student'
import Backdrop from '../Backdrop/Backdrop';
import ValidateRemoveUser from './ValidateRemoveUser/ValidateRemoveUser'
import AddStudentToCourse from './AddStudentToCourse/AddStudentToCourse';

const ModifyStudents = ()=>{

    const courseCtx=useContext(CourseContext)
    const {courseid}=useParams()
    const [studentsincourse,setstudentsincourse]=useState([])
    const [ShowBackdrop,setShowBackdrop]=useState(false)
    const [RemoveStudentFlag,setRemoveStudentFlag]=useState(false)
    const [studenttoberemoved,setstudenttoberemoved]=useState(undefined)
    const [AddStudentFlag,setAddStudentFlag]=useState(false)

    useEffect(()=>{
        courseCtx.SetWentInsideCourse(true)
        studentDataService.getCurrentStudents(courseid,0,0)
            .then((res)=>{
                //console.log(res.body)
                const students=res.data.studentsList;
                console.log(students)
                setstudentsincourse(students)
            })
            .catch((e)=>console.log(e))
        
    },[])

    const SetAddStudentStates = ()=>{
        setAddStudentFlag(true)
        setShowBackdrop(true)
    }
    console.log(RemoveStudentFlag)
    return(
        <div>
            <Backdrop show={ShowBackdrop} setShowBackdrop={setShowBackdrop}/>
           
            <ValidateRemoveUser show={ShowBackdrop} setShowBackdrop={setShowBackdrop} RemoveStudentFlag={RemoveStudentFlag} 
            setRemoveStudentFlag={setRemoveStudentFlag} studenttoberemoved={studenttoberemoved} setstudenttoberemoved={setstudenttoberemoved}
            studentsincourse={studentsincourse} setstudentsincourse={setstudentsincourse} courseid={courseid}  
            />

            <AddStudentToCourse  show={ShowBackdrop} setShowBackdrop={setShowBackdrop} AddStudentFlag={AddStudentFlag}
            setAddStudentFlag={setAddStudentFlag}  studentsincourse={studentsincourse} setstudentsincourse={setstudentsincourse}
            courseid={courseid}
            />
            <p className={styles.heading}>Add/Remove Students</p> 
            <Button variant="success" className={styles.AddStudentButton} onClick={SetAddStudentStates}> Add Student</Button>
            <div className={styles.StudentsContainer}>
                {studentsincourse.map((student,index)=>{
                    return(
                        <Student key={index} student={student} setShowBackdrop={setShowBackdrop} setRemoveStudentFlag={setRemoveStudentFlag} setstudenttoberemoved={setstudenttoberemoved}/>
                    )
                })}
            </div>
        </div>
    )
}

export default ModifyStudents;