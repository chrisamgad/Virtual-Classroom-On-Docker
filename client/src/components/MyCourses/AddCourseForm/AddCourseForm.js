
import React,{useState,useContext} from 'react'
import {Form,Button,Alert} from 'react-bootstrap'
import styles from'./AddCourseForm.module.css'
import validator from 'validator'
import studentDataService from '../../../services/student-data-service'
import CourseContext from '../../../Contexts/CourseContext'

const AddCourseForm = (props)=>{

    const coursesCtx = useContext(CourseContext)

    const [error,seterror]=useState(undefined)

    const [newcoursedetails,setnewcoursedetails]=useState({
        coursename:'',
        description:''
    })
    
    const UpdateCourseName= (e)=>{
        seterror(undefined)
        setnewcoursedetails({...newcoursedetails,coursename:e.target.value})
        
    }

    const UpdateCourseDescription= (e)=>{
        seterror(undefined)
        setnewcoursedetails({...newcoursedetails,description:e.target.value})
        

    }
    
    const  HandleClick = ()=>{
        props.setShowBackdrop(false)
    }

    const AddNewCourse = ()=>{
        
        if(validator.isEmpty(newcoursedetails.coursename,{ ignore_whitespace:true }))
            return seterror('Course Name field must not be empty!')
        
            
        if (validator.isEmpty(newcoursedetails.description,{ ignore_whitespace:true }))   
            return seterror('Course Description field must not be empty!')  
        
            
        //console.log(newcoursedetails)
        studentDataService.AddCourse(newcoursedetails.coursename,newcoursedetails.description).then().catch((e)=>console.log(e))
        coursesCtx.Toggle_courses_changed(true)
        props.setShowBackdrop(false)
        setnewcoursedetails({
            coursename:'',
            description:''
        })
        seterror(undefined)
        
    }

    //console.log(error)

    return(
        <div>
        { props.show ? 
            <div>
                <Form className={styles.FormContainer}>
                    <i className={`fas fa-times-circle ${styles.windowclose}`} onClick={(e)=>HandleClick(e)}></i>
                    <p className={styles.ADD_A_NEW_COURSE} >ADD A NEW COURSE</p>
                    <Form.Group className="mb-2"controlId="formBasicCourseName">
                        <p className={styles.form_labels}>Enter the Course Name</p> 
                        <Form.Control className={styles.form_labels} type="text" placeholder="Enter Course Name" onChange={(e)=>UpdateCourseName(e) }/>
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formBasicDescription">
                        <p className={styles.form_labels}>Enter the Course Description</p>
                        <Form.Control className={styles.form_labels} type="text" placeholder="Description" onChange={(e)=>UpdateCourseDescription(e)}/>
                    </Form.Group>
                    {error ? <Alert variant='danger' className={styles.alertstyle} >{error}</Alert> : null}
                    <Button variant="success" className={styles.buttonstyle} onClick={AddNewCourse} >
                        Create the Course !
                    </Button>     
                   
                </Form>
            </div>
        : null
            }
        </div>
    )
}

export default AddCourseForm;