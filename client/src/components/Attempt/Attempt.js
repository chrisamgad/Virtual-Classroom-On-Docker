import React,{useState} from 'react'
import {Card,Form,InputGroup,FormControl,Button} from 'react-bootstrap'
import styles from './Attempt.module.css'
import moment from 'moment'

const Attempt = (props) => {

    const [hidden,sethidden]=useState(true)
    
    const ShowDetails = ()=>{
        sethidden(false)
    }

    const circleheader = ()=>{
       
        if(props.attempted)
            {
            if(props.attempt.status==='Submitted-On-Time')   
                return `fas fa-circle ${styles.circleiconheader} ${styles.green}`
            
            else if (props.attempt.status==='Submitted-Late')
                return `fas fa-circle ${styles.circleiconheader}  ${styles.yellow}`
            }
        else
            return `fas fa-circle ${styles.circleiconheader}  ${styles.red}`
    }

    
    const circletitle = ()=>{
        console.log(props.attempted)
        if(props.attempted)
           { 
            if(props.attempt.status==='Submitted-On-Time')   
                return `fas fa-circle ${styles.circleicontitle} ${styles.green}`
            
            else if (props.attempt.status==='Submitted-Late')
                return `fas fa-circle ${styles.circleicontitle}  ${styles.yellow}`
            }
        else
            return `fas fa-circle ${styles.circleicontitle}  ${styles.red}`
    }

    const returnHTML =()=>{
        if(props.attempted)
            return(
                <div>
                <Card className={styles.CardContainer}>
                    <Card.Header className={styles.cardheader} style={{position:'relative'}} onClick={()=>sethidden((prev)=>!prev)}>{props.attempt.student.email} <i className={circleheader()} ></i><i className={`fas fa-angle-double-right ${styles.arrowsicon}`}></i></Card.Header>
                    <Card.Body className={hidden ? styles.hidden: null} >
                        {props.attempt.status ==='Submitted-Late' ?  <p className={styles.late_heading}>LATE!</p> : null}
                        <Card.Title><i className={circletitle()} ></i>{props.attempt.student.fullname} </Card.Title>
                        <Card.Text style={{marginBottom:'3px'}}>
                        <span style={{fontWeight:'400'}}>Submit Time:</span> <span style={{color: '#0088ff', fontWeight:'400'}}>{moment(props.attempt.createdAt).format('LLL')}</span>
                        </Card.Text>
                        <Card.Text className={styles.DownloadAttempt}>
                        Download Student Attempt
                        </Card.Text>
                        <div className={styles.linebreak}></div>
                        <Form>
                            <Form.Label className={styles.setgradelabel}>Set Grade</Form.Label>
                            <InputGroup  className={`mb-2 ${styles.gradeinput}`}>
                                <FormControl id="inlineFormInputGroup" placeholder="Grade" />
                                <InputGroup.Text>/100</InputGroup.Text>
                            </InputGroup>
                            <Form.Label className={styles.writecomment}>Comment <span style={{fontWeight:300}}>(Optional)</span></Form.Label>
                            <Form.Control type="text" placeholder="Enter comment" />
                            <Button className={styles.submitgrade}>Submit Grade</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div> 
            )
        else if(!props.attempted)
            return(
                <div>
                <Card className={styles.CardContainer}>
                    <Card.Header className={styles.cardheader} style={{position:'relative'}} onClick={()=>sethidden((prev)=>!prev)}>{props.student.email} <i className={circleheader()} ></i><i className={`fas fa-angle-double-right ${styles.arrowsicon}`}></i></Card.Header>
                    <Card.Body className={hidden ? styles.hidden: null} >
                        <Card.Title><i className={circletitle()} ></i>{props.student.fullname} </Card.Title>
                        <Card.Text style={{marginBottom:'3px' , color: '#dc3545'}}>
                        Not Attempted
                        </Card.Text>
                        <div className={styles.linebreak}></div>
                        <Form>
                            <Form.Label className={styles.setgradelabel}>Set Grade</Form.Label>
                            <InputGroup  className={`mb-2 ${styles.gradeinput}`}>
                                <FormControl id="inlineFormInputGroup" placeholder="Grade" />
                                <InputGroup.Text>/100</InputGroup.Text>
                            </InputGroup>
                            <Form.Label className={styles.writecomment}>Comment <span style={{fontWeight:300}}>(Optional)</span></Form.Label>
                            <Form.Control type="text" placeholder="Enter comment" />
                            <Button className={styles.submitgrade}>Submit Grade</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div> 
            )
    }
    console.log(props.attempt)
    return ( 
        <div>
           { returnHTML()}
        </div>

    );
}

export default Attempt;