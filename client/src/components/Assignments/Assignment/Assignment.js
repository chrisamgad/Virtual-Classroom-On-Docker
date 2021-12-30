import React  from 'react'
import {Card,Button} from 'react-bootstrap'
import moment from 'moment'
import styles from './Assignment.module.css'
import { Link,useParams,useHistory } from 'react-router-dom'



const  Assignment= (props) => {

    const {courseid}=useParams()
    let history=useHistory()


    const return_bg = ()=>{
        if(props.assignment.SubmissionStatus=== 'In-Progress')
            return ` ${styles.In_Progress}`
        else if(props.assignment.SubmissionStatus=== 'Submitted ')
            return `  ${styles.Submitted}`
        else if (props.assignment.SubmissionStatus=== 'Deadline-Passed')
            return `  ${styles.Deadline_Passed}`
        
    }

    const handleRemoveAssignment = ()=>{
        props.setshowBackdrop(true)
        props.setDeleteMode(true)
        props.setassignemnttoberemoved(props.assignment._id)
    }
    //#413f3b

    const RedirectToAssignmentDetails = ()=>{
        return `/dashboard/mycourses/${courseid}/assignments/${props.assignment._id}`
    }

    const DownloadAssignment =()=>{
        window.location.assign(`http://localhost:4000/teacher/${courseid}/assignments/${props.assignment._id}`);
        
    }
    return (
    <div>
       
         <Card style={{marginBottom:'10px', minWidth:'315px'}}>
            <Link to={RedirectToAssignmentDetails()} style={{textDecoration:'none'}}>
                <Card.Body className={`${styles.Card}` }>
            
                    <Card.Title  className="mb-3"> {props.index +1}.  {props.assignment.name}</Card.Title>
                    <Card.Subtitle >Due: <span>{moment(props.assignment.DueDate).format("MMMM Do YYYY, h:mm a")}  </span></Card.Subtitle>
                    <Card.Text> Status:<span> {props.assignment.status}</span></Card.Text>
                    
                    {props.ShowDeleteButton ? <Button variant='danger' onClick={handleRemoveAssignment}>Remove Assignment</Button> : null}
                </Card.Body>
            </Link>
            <Card.Footer className={styles.assignmentdownloadlink} onClick={DownloadAssignment}>
                Download Assignment
            </Card.Footer>
        </Card>

        
    </div>  
    );
}
 
export default Assignment;