import axios from 'axios'
import authHeader from './auth-header'
import AuthService from './auth.service'

const API_URL = "http://localhost:4000";
class StudentService {
    // getPublicContent() {
    //   return axios.get(API_URL + 'all');
    // }
  
    // getUserBoard() {
    //   return axios.get(API_URL + 'user', { headers: authHeader() });
    // }
  
    // getModeratorBoard() {
    //   return axios.get(API_URL + 'mod', { headers: authHeader() });
    // }
  
    // getAdminBoard() {
    //   return axios.get(API_URL + 'admin', { headers: authHeader() });
    // }

    getProfile(){
      
      return axios.get(
        process.env.REACT_APP_BACKEND_DOMAIN+'/myprofile',
        {
          headers: authHeader()
        }
      ).then((response)=> {
        //console.log(response.body)
        return response
      })
        .catch((e) =>{
          throw new Error (e.response.data.message) //e is an error message object in axios
        }) //malhash lazma w msh shaghala
    }
 
    async getCourses(role){
      if(AuthService.getCurrentUser().role==='student')
      {
        const response=await axios.get(
          process.env.REACT_APP_BACKEND_DOMAIN +'/student/getmycourses',
          {
            headers: authHeader()
          }
        )
        return response

      }
      else if (AuthService.getCurrentUser().role==='teacher')
      {
        const response= await axios.get(
          process.env.REACT_APP_BACKEND_DOMAIN +'/teacher/getmycourses',           
          {
            headers: authHeader()
          }
        )

        return response
      }

    }

    uploadAvatar(data){
      console.log(data)
      return axios.post(
        process.env.REACT_APP_BACKEND_DOMAIN+'/uploadavatar',
        
          data
        ,
        {
          headers: authHeader()
          
        }
      ).then((response)=> {
        //console.log(response.body)
        return response
      }).catch((e) =>{
          throw new Error (e.response.data.message) //e is an error message object in axios
        }) //malhash lazma w msh shaghala
    }

    getUserImage(){
      let user_id=undefined;
      if(AuthService.getCurrentUser().role==='student')
        user_id=AuthService.getCurrentUser().user.student._id;
      else if(AuthService.getCurrentUser().role==='teacher')
        user_id=AuthService.getCurrentUser().user.teacher._id;

      const ImageURL= process.env.REACT_APP_BACKEND_DOMAIN + '/getavatar/' +user_id
      
      //console.log(response)
      return ImageURL;
    }

    DeleteCourses(newcoursesarr){
     return axios.patch( process.env.REACT_APP_BACKEND_DOMAIN + '/teacher/updatecourses'
      ,{courses: newcoursesarr}, {headers: authHeader()})
            .then((res)=>res)
            .catch((e)=>{throw new Error(e)}) 
    }

    AddCourse(course_name,course_description){
      return axios.post(
        process.env.REACT_APP_BACKEND_DOMAIN+'/teacher/createcourse',
        {
          coursename:course_name,
          description:course_description
        },
        {
          headers:authHeader()
        }
      )
    }

    getCurrentStudents(courseID,limit,skip){
      return axios.get(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/teacher/${courseID}/getstudentslist?limit=${limit}&skip=${skip}`,
        {
          headers:authHeader()
        }
      )
      .then(res=>res)
      .catch((e)=>{throw new Error(e)})
    }

    RemoveStudent(student,courseID){
      return axios.patch(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/teacher/removestudent`,
        {
          email:student.email,
          course_id:courseID
        },
        {
          headers:authHeader()
        }
      )
      .then(res=>res)
      .catch((e)=>{throw new Error(e)})
    }

    AddStudent(student_email,courseID){
      return axios.post(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/teacher/addstudent`,
        {
          email:student_email,
          course_id:courseID
        },
        {
          headers:authHeader()
        }
      ).then((res)=>res)
      .catch((e)=>{throw new Error(e)})
    }
    
    GetAssignments(courseID){
      const role=JSON.parse(localStorage.getItem("role"))
      if(role==='teacher')
    {
      console.log('sdfsdfsdds')
      return axios.get(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/teacher/${courseID}/getassignments`,
        {
          headers:authHeader()
        }
        ).then((res)=>res)
        .catch((e)=>{throw new Error(e)})
    }

      else if (role==='student')
        return axios.get(
          `${process.env.REACT_APP_BACKEND_DOMAIN}/student/${courseID}/getassignments`,
          {
            headers:authHeader()
          }
          ).then((res)=>res)
          .catch((e)=>{throw new Error(e)})
    }

    // `${process.env.REACT_APP_BACKEND_DOMAIN}/teacher/${courseID}/createassignment`
    CreateAndUploadAssignment(courseID,formdata){

      return axios.post(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/teacher/${courseID}/createassignment`,
        formdata,
        { 
          headers:authHeader()
        }
      ).then((res)=>res)
      .catch((e)=>{throw new Error(e)})
    }

    DeleteAssignment(courseID,assignmentID){
      return axios.patch(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/teacher/${courseID}/deleteassignment/${assignmentID}`,undefined,{
          headers:authHeader()
        })
        .then(res=>res)
        .catch((e)=>{throw new Error(e)})
    }

    SubmitAttempt(courseID,assignmentID,formdata){
      return axios.post(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/student/${courseID}/submitassignment/${assignmentID}`,
        formdata,
        {
          headers:authHeader()
        }
      ).then((res)=>console.log(res))
      .catch((e)=>{throw new Error(e)})
    }

    GetAttempt(courseID,assignmentID){
      return axios.get(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/student/${courseID}/getattempt/${assignmentID}`,
        {
          headers:authHeader()
        }
        ).then((res)=>res)
        .catch((e)=>{throw new Error(e)})

    }

    GetAttempt_Teacher(courseID,assignmentID){
      return axios.get(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/teacher/${courseID}/assignment/${assignmentID}/getattempts`,
        {
          headers:authHeader()
        }
        ).then((res)=>res)
        .catch((e)=>{throw new Error(e)})

    }


  }

 


  
  export default new StudentService();