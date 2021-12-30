import React, { useEffect, useState } from 'react';
import {Form,Button} from 'react-bootstrap'
import styles from './ValidateRemoveUser.module.css'
import studentDataService from '../../../services/student-data-service';

const  ValidateRemoveUser = (props) => {
    console.log(props.show)

    useEffect(()=>{
        
        if(props.show===false)
           {
            props.setRemoveStudentFlag(false)
            props.setstudenttoberemoved(undefined)
           }
        
    },[props.RemoveStudentFlag, props.show])
    const RemoveStudentFinal =()=>{
        studentDataService.RemoveStudent(props.studenttoberemoved,props.courseid).then((res)=>{
            console.log(res)
            const studentsincourseAfterRemove=props.studentsincourse.filter((Student)=>{
                return(Student._id !== props.studenttoberemoved._id)
            })
            console.log(studentsincourseAfterRemove)
            props.setstudentsincourse(studentsincourseAfterRemove)
            props.setShowBackdrop(false)
            props.setRemoveStudentFlag(false)
            props.setstudenttoberemoved(undefined)
        }).catch((e)=>console.log(e))
    }

    const Cancel =()=>{
        props.setShowBackdrop(false) 
        props.setRemoveStudentFlag(false)
        props.setstudenttoberemoved(undefined)
    }

    return ( 
    <div>
    { props.RemoveStudentFlag ?
        <div>
            <Form className={styles.Formcontainer}>
                        
                <Button variant="success" onClick={RemoveStudentFinal} >
                    Are You Sure?
                </Button>     
                <Button variant="warning" onClick={Cancel}>
                    Cancel
                </Button> 
            </Form>
        </div>
        : null
    }
    </div> 
    );
}
 
export default ValidateRemoveUser ;