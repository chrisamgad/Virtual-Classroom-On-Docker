
import React,{useEffect,useState} from "react"
import StudentService from '../../services/student-data-service'
import styles from './Profile.module.css'
import axios from 'axios'
import Generic_profilepic from './defaultavatar.png'
const Profile =()=>{

    const [userimage,setuserimage]=useState(undefined)
    const [userdetails,setuserdetails]=useState()
    useEffect(()=>{
        StudentService.getProfile().then((res)=>{
            //console.log(res)
            if(res.data.role==='student')
            {
                setuserdetails(res.data.student)
                axios.get(`http://localhost:4000/getavatar/${res.data.student._id}`).then((response)=>{
                    setuserimage(`http://localhost:4000/getavatar/${res.data.student._id}`)
                }).catch((e)=>{
                    console.log(e)
                    setuserimage(Generic_profilepic)
                })
                
            }
                
            else if(res.data.role==='teacher')
            {
                setuserdetails(res.data.teacher)
                axios.get(`http://localhost:4000/getavatar/${res.data.teacher._id}`).then((response)=>{
                    setuserimage(`http://localhost:4000/getavatar/${res.data.teacher._id}`)
                }).catch((e)=>{
                    console.log(e)
                    setuserimage(Generic_profilepic)
                })

            }
                
            
        }).catch((e)=>console.log(e.message))
    }, []) //empty array means this useeffect will only get triggered once only after page mounts
    console.log(userdetails)
    return(
        <div>
            { userdetails ? 
            <div>
                <div className={styles.heading}>My Profile</div>
                <div className={styles.bodyContainer}>
                    <img height="175" width="175" alt="Profile" src={userimage} className={styles.profilepicture}/>
                    <div className={styles.pieceofinfo}><span className={styles.key}>Full Name:</span> {userdetails.fullname}</div>  
                    <div className={styles.pieceofinfo}><span className={styles.key}>Email:</span> {userdetails.email}</div>
                    <div className={styles.pieceofinfo}><span className={styles.key}>Role:</span> {userdetails.role}</div>
                    <div className={styles.pieceofinfo}><span className={styles.key}>Mobile Number:</span> {userdetails.mobilenumber}</div>
                </div>
            </div>
            :
            null
            }
        </div>
    )
}

export default Profile;