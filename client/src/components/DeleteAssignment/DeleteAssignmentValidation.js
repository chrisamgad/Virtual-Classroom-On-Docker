import React, { useEffect } from 'react'
import {Button,Form} from 'react-bootstrap'
import {useParams} from 'react-router-dom'
import studentDataService from '../../services/student-data-service'
import styles from './DeleteAssignmentValidation.module.css'

const DeleteAssignmentValidation = (props) => {

    const {courseid}=useParams()
    useEffect(()=>{
        if(props.show===false)
            {
                props.setDeleteMode(false)
            }
    },[props.show])


    const RemoveAssignment= ()=>{
        studentDataService.DeleteAssignment(courseid,props.assignemnttoberemoved).then((res)=>{
            props.setassignments(res.data)
            props.setshowBackdrop(false)
            props.setassignemnttoberemoved(undefined)
        }).catch((e)=>console.log(e))
    }
    const Cancel=()=>{
        props.setshowBackdrop(false)
        props.setDeleteMode(false)
    }

    //console.log(courseid,props.assignemnttoberemoved)
    return ( 
    <div>
        {
         props.DeleteMode ?
                <Form className={styles.FormContainer}>
                    <Button variant={'danger'} className={styles.buttonstyles} onClick={RemoveAssignment}>Are you Sure?</Button>
                    <Button variant={'warning'} className={styles.buttonstyles} onClick={Cancel}>Nah, I changed my mind</Button>
                </Form>
        :
            null
                   
        }
    </div> );
}
 
export default DeleteAssignmentValidation;