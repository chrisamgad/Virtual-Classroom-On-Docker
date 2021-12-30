import React, { useContext } from 'react'

import {useState,useEffect} from 'react'
//import {useParams} from 'react-router-dom'
import {Button,Form,Container,Alert} from 'react-bootstrap'
import StudentService from '../../services/student-data-service.js'
import styles from './SetAvatar.module.css'
import {withRouter} from 'react-router'
import AuthenticatedContext from '../../Contexts/AuthenticatedContext.js'

const SetAvatar =(props)=>{

   // const[clicked,setButton]=useState(false)
    const [selectedFile, setselectedFile] = useState(undefined)
    const [imgLink,setimgLink]=useState("https://www.seekpng.com/png/full/110-1100707_person-avatar-placeholder.png")
    const [validated_extension,setvalidated_extenstion]=useState(true)//initially true
    
    const authenticateduserCtx=useContext(AuthenticatedContext)

    useEffect(()=>{
        if(!validated_extension)
            {   
                setimgLink("https://www.seekpng.com/png/full/110-1100707_person-avatar-placeholder.png");
                setvalidated_extenstion(true)
            }
    },[validated_extension])
    
    const onClickHandler = () => {
        
        const data = new FormData()
        data.append('upload', selectedFile)
        console.log(data.file)
        StudentService.uploadAvatar(data)
        .then(res=>{
            console.log(res)
            authenticateduserCtx.SetAuthenticatedUser()
            props.history.push(`/dashboard/home`)
        })
        .catch((e)=>console.log(e))
    }
    
    const checkfileExtenstion=(event)=>{
        var file = document.getElementById('avatarIDInput');
        //eslint-disable-next-line
        var ext = file.value.match(/\.([^\.]+)$/)[1];
        switch (ext) {
            case 'jpg':
            case 'bmp':
            case 'png':
            case 'tif':
                //alert('allowed')
                setvalidated_extenstion(true)
                return true
            default:
                //alert('not allowed')
                file.value = '';
                setvalidated_extenstion(false)
                return false
            }
    }
    const onChangeHandler=event=>{
        checkfileExtenstion(event)
        console.log(event.target.files[0])
        //The next 3 lines just updates the image link with the new chosen image 
       
        if(validated_extension)
            {   var binaryData = [];
                binaryData.push(event.target.files[0]);
                setimgLink(window.URL.createObjectURL(new Blob(binaryData, {type: "application/zip"})))
            }
        else
            setimgLink("https://www.seekpng.com/png/full/110-1100707_person-avatar-placeholder.png");

        

        setselectedFile(event.target.files[0])

        //setimgLink(URL.createObjectURL(event.target.files[0]))
    }
    
    //let { id } = useParams();
    return(
        <div>
            <Container>
                <div className={styles.form_container}> 
                    <Form className={styles.form_styles}>
                        <Form.Group>
                            <Form.Label>Upload Your avatar</Form.Label>
                            <Form.Control style={{marginTop:'15px', marginBottom:'25px'}} type="file" name="upload" accept=".jpg,.png,.jpeg" id="avatarIDInput" onChange={(e)=>onChangeHandler(e)}/>
                            <img className={styles.avatarstyle} alt="avatar" src={imgLink}/>
                            <Button className={styles.Buttonstyle} onClick={onClickHandler}>Submit</Button>      
                            {validated_extension? null : <Alert variant='danger' className={styles.alertStyle}>Incorrect image file format...Re-upload a correct one</Alert>}         
                        </Form.Group>
                    </Form>
                </div>
            </Container>

        
        </div>
    )

}

export default withRouter(SetAvatar)