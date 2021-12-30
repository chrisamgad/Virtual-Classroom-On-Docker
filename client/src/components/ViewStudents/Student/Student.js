import React from 'react'
import {Card} from 'react-bootstrap'
import styles from './Student.module.css'
const Student = (props)=>{
    return(
       
            <Card className={styles.Cardcontainer}>
                <Card.Header>Student {props.index} </Card.Header>
                <Card.Body>
                    <Card.Title>{props.student.fullname}</Card.Title>
                    <Card.Text className={styles.cardtext}>
                        <span style={{color:'darkorange',fontWeight:'400'}} > email:</span> {props.student.email}
                    </Card.Text>
                    <Card.Text className={styles.cardtext}>
                        <span style={{color:'dodgerblue',fontWeight:'400'}} >mobile number:</span> {props.student.mobilenumber}
                    </Card.Text>
                    
                </Card.Body>
            </Card>
       
    )
}

export default Student