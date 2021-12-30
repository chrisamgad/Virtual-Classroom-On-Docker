import React,{useEffect, useState,useContext} from 'react'
import {useParams} from 'react-router-dom'
import Assignment from './Assignment/Assignment'
import studentDataService from '../../services/student-data-service'
import { Button } from 'react-bootstrap'
import styles from './Assignments.module.css'
import CourseContext from '../../Contexts/CourseContext'
import Backdrop from '../Backdrop/Backdrop'
import CreateAssignment from '../../components/CreateAssignment/CreateAssignment'
import DeleteAssignment from '../DeleteAssignment/DeleteAssignmentValidation'

const  Assignments= () => {
    const [assignments,setassignments]=useState([])
    const courseCtx=useContext(CourseContext)
    const {courseid}=useParams()

    const [showBackdrop,setshowBackdrop]=useState(false)
    const [ShowDeleteButton,setShowDeleteButton]=useState(false)
    const [DeleteMode,setDeleteMode]=useState(false)
    const [assignemnttoberemoved,setassignemnttoberemoved]=useState(null)
    const [CreateMode,setCreateMode]=useState(false)
    const [ShowCancelButton,setShowCancelButton]=useState(false)
    
    useEffect(()=>{

        if(assignments.length===0)
            {
                setDeleteMode(false)
                setShowDeleteButton(false)
            }
        studentDataService.GetAssignments(courseid).then((res)=>{
            console.log(res)
            setassignments(res.data)
        }).catch(e=>console.log(e))

        courseCtx.SetWentInsideCourse(true)

    },[])

    const returnDisplayedButtons = ()=>{
        if(assignments.length===0)
            return  ( <Button variant='success' style={{right:'35px'}} className={styles.AddAssignmentButton} 
            onClick={()=>{  
                setCreateMode(true)
                setshowBackdrop(true);
            }}> Create a new Assignment</Button>)

        else if (ShowCancelButton)
            return ( <Button variant='warning' className={styles.DeleteAssignmentButton} 
            onClick={()=>{
                setShowDeleteButton(false)
                setDeleteMode(false)
                setShowCancelButton(false)
            }}>Cancel</Button> )
        else if (!ShowCancelButton)
            return(                
            <div>
                <Button variant='success' className={styles.AddAssignmentButton} 
                            onClick={()=>{
                                
                                setCreateMode(true)
                                setshowBackdrop(true);
                            }}>
                    Create a new Assignment</Button>
                <Button variant='danger' className={styles.DeleteAssignmentButton} onClick={()=>{
                    setShowDeleteButton(true)
                    setShowCancelButton(true)
                }}>Delete an Assignment</Button>
            </div>
            )    
    }

    console.log(assignments)
    return (
    
    <div>
        <Backdrop show={showBackdrop} setShowBackdrop={setshowBackdrop}/>
        <CreateAssignment show={showBackdrop} setshowBackdrop={setshowBackdrop} CreateMode={CreateMode} setCreateMode={setCreateMode} setassignments={setassignments} assignments={assignments} />
        <DeleteAssignment show={showBackdrop} setshowBackdrop={setshowBackdrop} DeleteMode={DeleteMode} setDeleteMode={setDeleteMode} setassignments={setassignments} assignments={assignments}
        ShowDeleteButton={ShowDeleteButton} setShowDeleteButton={setShowDeleteButton} setShowCancelButton={setShowCancelButton} assignemnttoberemoved={assignemnttoberemoved} />

        <div className={styles.header}>
        <div className={styles.heading}>Assignments</div>
            {
                returnDisplayedButtons()
            }
            
           
        </div>
        <div className={styles.assignmentscontainer}>
            {
            assignments.map((assignment,index)=>{
                return <Assignment key={index} index={index} assignment={assignment} DeleteMode={DeleteMode} setshowBackdrop={setshowBackdrop} 
                ShowDeleteButton={ShowDeleteButton} setShowDeleteButton={setShowDeleteButton} setDeleteMode={setDeleteMode} setassignemnttoberemoved={setassignemnttoberemoved} />
            })
            } 
        </div>
    </div>  
    );
}
 
export default Assignments;