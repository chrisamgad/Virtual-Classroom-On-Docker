
import React,{useState,useContext, useEffect} from 'react'
import {Form,Button,Alert} from 'react-bootstrap'
import styles from './CreateAssignment.module.css'
import TimePicker from 'react-time-picker'
import DatePicker from 'react-date-picker'
import {useParams} from 'react-router-dom'
import studentDataService from '../../services/student-data-service'
import validator from 'validator'

const CreateAssignment = (props)=>{

    const {courseid} =useParams()

    //console.log(error)
    const [dayvalue, setdayvalue] = useState(new Date());
    const [timevalue, settimevalue] = useState('10:00');
    const [assignmentdetails,setassignmentdetails]=useState({
        name:'',
        description:''
    })
    const [selectedfile,setselectedfile]=useState(null)
    const [validated,setvalidated]=useState({
        isvalidated:true,
        error:undefined
    })

        
    useEffect(()=>{
        if(props.show===false)
            props.setCreateMode(false)
    

    },[props.show])


    const UpdatedSelectedFileState = (e)=>{

        setselectedfile(e.target.files[0])
        
    }
    const UpdateAssignmentName =(e)=>{
        setvalidated({
            isvalidated:true,
            error:undefined
        })
        setassignmentdetails({
            ...assignmentdetails,
            name:e.target.value
            })
    }
    
    const ConvertDateInputIntoDateJSObject =()=>{
        const date= new Date(dayvalue)
        const year= date.getFullYear()
        const month=date.getMonth()+1
        const day=date.getDate()
        
        // console.log(year)
        // console.log(month)
        // console.log(day)

        const timeArr=timevalue.split(':')
        return new Date(year,month,day,timeArr[0],timeArr[1])
    }

    const Cancel = ()=>{
        props.setshowBackdrop(false)
        props.setCreateMode(false)
    }

    const uploadAssignment = ()=>{
        const deadline=ConvertDateInputIntoDateJSObject()
        //console.log(deadline)
        //console.log(assignmentdetails)
        if(validator.isEmpty(assignmentdetails.name,{ignore_whitespace:true}))
        {
            console.log('hena')
            return setvalidated({
                isvalidated:false,
                error:'Assignment must have a name'
            })
           
        }

        if(selectedfile ===null)
            return setvalidated({
                isvalidated:false,
                error:'Assignment paper must be uploaded'
            })

         const filedata = new FormData() 
         //Form data to be sent
         filedata.append('name', assignmentdetails.name)
         filedata.append('duedate', deadline)
         filedata.append('description', assignmentdetails.description)
         filedata.append('myFile', selectedfile) //includes the selected file

         
        studentDataService.CreateAndUploadAssignment(courseid,filedata).then((res)=>{
            let newassigmentsArr=props.assignments
            newassigmentsArr.push(res.data)
            props.setassignments(newassigmentsArr)
            props.setCreateMode(false)
            props.setshowBackdrop(false)
        }).catch((e)=>console.log(e))
        
        setvalidated({
                isvalidated:true,
                error:'undefined'
        })

        setassignmentdetails({
            name:'',
            description:''
        })
    }

    
   
    console.log(validated)
    console.log(assignmentdetails)
    
    return(
        <div>
        { props.CreateMode ? 
            <div>
                <Form className={styles.FormContainer}>
                    <i className={`fas fa-times-circle ${styles.windowclose}`} ></i>
                    <p className={styles.CREATE_AN_ASSIGNMENT_p} >ADD A NEW ASSIGNMENT</p>
                    <Form.Group className="mb-3"controlId="formBasicCourseName">
                        <p>Enter the Assignment Name</p> 
                        <Form.Control  type="text" placeholder="Enter Assignment Name" 
                        onChange={(e)=>UpdateAssignmentName(e)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicDescription">
                        <p >Enter the Assignment Description (optional)</p>
                        <Form.Control type="text" placeholder="Description"
                        onChange={(e)=>{
                            setassignmentdetails({
                                ...assignmentdetails,
                                description:e.target.value
                            })
                            }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicFile">
                        <p >Upload the Assignment file</p>
                        <Form.Control type="file" name="myFile" onChange={(e)=>UpdatedSelectedFileState(e)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDeadline">
                        <p style={{marginBottom: '3px'}}>When would you like the deadline to be?</p>
                        
                        <div style={{marginBottom:'10px'}}>
                            <p style={{marginBottom: '7px'}}>Day: </p>
                            <DatePicker                         
                            onChange={setdayvalue}
                            value={dayvalue}
                            clearIcon={null} />
                        </div>
                        <div>
                            <p style={{marginBottom: '7px'}}>Time: </p>
                            <TimePicker         
                            onChange={settimevalue}
                            value={timevalue} 
                            disableClock={true} 
                            clearIcon={null}/>
                        </div>

                    </Form.Group>
                    <div className={styles.buttonscontainer} >
                            <Button variant="success" className={styles.buttonstyle} onClick={uploadAssignment}>
                                Create the Assginment!
                            </Button>  
                            <Button variant="warning" className={styles.buttonstyle} onClick={Cancel}>
                                Cancel
                            </Button>  
                    </div>
                    {validated.isvalidated ? null : <Alert variant='danger' className={styles.alertStyle}>{validated.error}</Alert>}   
                </Form>
            </div>
        : null
            }
        </div>
    )
}

export default CreateAssignment;