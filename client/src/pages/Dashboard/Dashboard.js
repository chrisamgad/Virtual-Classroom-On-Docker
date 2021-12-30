import React,{useContext,useEffect,useState}  from "react";
import AuthenticatedContext from '../../Contexts/AuthenticatedContext'
import CourseContext from "../../Contexts/CourseContext";
import {Container, Row, Col } from "react-bootstrap";

import {Switch,Route} from 'react-router-dom'
import Sidebar from "../../components/DashboardSidebar/Sidebar";
import styles from './Dashboard.module.css'
import MyCourses from "../../components/MyCourses/MyCourses";
import CourseSummary from "../../components/MyCourses/Course/CourseSummary/CourseSummary";
import Backdrop from '../../components/Backdrop/Backdrop'
import AddCourseForm from '../../components/MyCourses/AddCourseForm/AddCourseForm'
import Assignments from "../../components/Assignments/Assignments";
import ViewStudents from '../../components/ViewStudents/ViewStudents'
import AssignmentDetails from "../../components/AssignmentDetails/AssignmentDetails";
import MyProfile from '../../pages/Profile/Profile'
import './dashboard.css'


const Dashboard = (props) => {
    const authenticateduserCtx= useContext(AuthenticatedContext)
    const courseCtx=useContext(CourseContext)
    const [showbackdrop,setshowbackdrop] =useState(false)

    useEffect(()=>{
       
        authenticateduserCtx.SetAuthenticatedUser()
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
       
    const setShowBackdrop=(value)=>{
        setshowbackdrop(value);
    }

    return (
        <div>
           <Backdrop show={showbackdrop} setShowBackdrop={setShowBackdrop}/>
           <AddCourseForm show={showbackdrop} setShowBackdrop={setShowBackdrop}/>
            <Container>
                    <Row>
                        <Col md={2} className="SidebarContainer" >
                                <Sidebar/>      
                        </Col>

                        <Col md={10} className="DashboardContainer" >
                                          
                                <Switch>
                                    <Route exact path={`/dashboard/home`}>
                                        Home
                                    </Route>
                                    <Route exact path={`/dashboard/mycourses`}>
                                        <MyCourses setShowBackdrop={setShowBackdrop}/>
                                    </Route>
                                    <Route path={`/dashboard/mycourses/:courseid/coursesummary`}>
                                        <CourseSummary />
                                    </Route>
                                    <Route exact path={`/dashboard/mycourses/:courseid/assignments`}>
                                        <Assignments />
                                    </Route>
                                    <Route exact path={`/dashboard/mycourses/:courseid/assignments/:assignmentid`}>
                                        <AssignmentDetails />
                                    </Route>
                                    <Route exact path={`/dashboard/announcments`}>
                                        Announcments
                                    </Route>
                                    <Route exact path={`/dashboard/mygrades`}>
                                        My Grades
                                    </Route>
                                    <Route exact path={`/dashboard/myprofile`}>
                                        <MyProfile/>
                                    </Route>
                                </Switch>        
                            
                        </Col>
                    </Row>
                </Container>
            </div>
        
        );
  };

  export default Dashboard