import { Form,Button,Container,Alert} from "react-bootstrap"
import {Link} from 'react-router-dom'
import { withRouter } from "react-router";
import styles from './Login.module.css'
import { useContext, useState } from "react"
import validator from 'validator'
import AuthService from '../../services/auth.service'
import AuthenticatedContext from "../../Contexts/AuthenticatedContext";
import CourseContext from "../../Contexts/CourseContext";
const Login = (props)=>{

    const authenticateduserCtx=useContext(AuthenticatedContext)
    const courseCtx=useContext(CourseContext)

    const [CredentialDetails,setCredentialDetails]= useState({
        email:'',
        passsword:''
    })

    const [CredentialValidation, setCredentialValidation]=useState({
        validated:true,//initially true
        error: undefined
    }) 

    const setEmail = (e)=>{
        setCredentialDetails({
            ...CredentialDetails,
            email:e.target.value
        })
    }

    const setPassword = (e)=>{
        setCredentialDetails({
            ...CredentialDetails,
            password:e.target.value
        })
    }

    const handlesubmit = (e)=>{
        e.preventDefault(); //prevents refresh on submit

        if(!validator.isEmail(CredentialDetails.email))
        {
           return setCredentialValidation({
               validated:false,
               error:'Invalid Email'
           })
        }
        AuthService.login(CredentialDetails.email, CredentialDetails.password).then((response)=>{
            //console.log(response.data)
            if(response.data.token)
                {
                    props.history.push('/dashboard/home')// redirect to /myprofile if logged in successfully
                    courseCtx.SetWentInsideCourse(false)
                    authenticateduserCtx.SetAuthenticatedUser()
                    
                    
                }
            else if(response.data.error)
                console.log(response.data.error) // if insuccessfully logged in, console.log the error message
        })

        
    }

    //console.log(CredentialDetails)
    return(
        <div>
            <Container>
            <div className={styles.form_container}> 
                <Form className={styles.form_styles}>
                    <p>LOG IN</p>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e)} />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e)} />
                    </Form.Group>
                    <Button variant="primary" onClick={(e)=>handlesubmit(e)}>
                        Submit
                    </Button>
                    {CredentialValidation.validated ? null : <Alert variant='danger' className={styles.alertStyle}>{CredentialValidation.error}</Alert>}
                   <p> <Link to="/createaccount" className={styles.create_account}>Create Account for Students</Link></p>
                </Form>
            </div>
            </Container>
        </div>
    )
}

export default withRouter(Login)