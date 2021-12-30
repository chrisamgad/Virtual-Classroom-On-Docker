import React from 'react';
import {useEffect} from 'react'
import {Card,Button} from 'react-bootstrap'
import styles from './Student.module.css'
import studentDataService from '../../../services/student-data-service';

const Student = (props)=>{

    
    useEffect(()=>{
        
    },[])

    const RemoveStudent = ()=>{
        props.setstudenttoberemoved(props.student)
        props.setRemoveStudentFlag(true)
        props.setShowBackdrop(true)
        console.log('test')
    }

    return(
        <div className={styles.cardcontainer}>
           <Card className={styles.cardsubcontainer}>
            <Card.Body >
                <Card.Title>{props.student.fullname}</Card.Title>
                <Card.Text className={styles.email}>
                    Email: {props.student.email}
                </Card.Text>

                <Button variant="danger" onClick={RemoveStudent}>Remove Student from Course</Button>
            </Card.Body>
        </Card>
        </div>
    )
}

export default Student;