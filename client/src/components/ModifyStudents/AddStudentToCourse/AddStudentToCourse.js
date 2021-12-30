import React, { useState, useEffect } from 'react';
import {Form,Button} from 'react-bootstrap'
import styles from './AddStudentToCourse.module.css'
import studentDataService from '../../../services/student-data-service';
const  AddStudentToCourse= (props) => {

    useEffect(()=>{
        if(props.show===false)
            props.setAddStudentFlag(false)
        

    },[props.AddStudentFlag,props.show])

    const [studentemail,setstudentemail]=useState('')

    const AddStudentFinal = ()=>{
        studentDataService.AddStudent(studentemail,props.courseid)
            .then((res)=>{
                console.log(res.data)
                let newstudentsArr=props.studentsincourse
                newstudentsArr.push(res.data.student)
                props.setstudentsincourse(newstudentsArr)
                props.setShowBackdrop(false)
                props.setAddStudentFlag(false)
            }).catch((e)=>console.log(e))
    }
    const Cancel= ()=>{
        props.setAddStudentFlag(false)
        props.setShowBackdrop(false)
    }

    return ( 
        <div>
        { props.AddStudentFlag ?
        <div>
            <Form className={styles.FormContainer}>
                    <i className={`fas fa-times-circle ${styles.windowclose}`} onClick={Cancel}></i>
                    <p className={styles.ADD_A_NEW_STUDENT} >ADD A NEW STUDENT</p>
                    <Form.Group className="mb-3"controlId="formBasicStudentEmail">
                        <p className={styles.form_labels}>Enter the student Email</p> 
                        <Form.Control className={styles.form_labels} type="text" placeholder="Enter Student email" onChange={(e)=>setstudentemail(e.target.value)}/>
                    </Form.Group>

                    <div className={styles.buttonscontainer}>
                        <Button variant="success" className={styles.buttonstyle} onClick={AddStudentFinal}>
                            Add Student
                        </Button>
                        <Button variant="warning" className={styles.buttonstyle} onClick={Cancel}>
                            Cancel
                        </Button> 
                    </div>         
                   
                </Form>
            </div> 
            : null
        }
        </div>
     );
}
 
export default AddStudentToCourse;