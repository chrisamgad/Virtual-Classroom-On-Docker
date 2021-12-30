
import React,{createContext,useState} from 'react'

const CourseContext =createContext({
    WentInsideCourse:false,
    courses_changed: false,
    current_course_chosen:undefined
})

export function CourseContextProvider(props){
    const [WentInsideCourse,setWentInsideCourse]=useState(false);
    const[courses_changed, set_courses_changed]=useState(false) 
    const [current_course_chosen,set_current_course_chosen ]  =useState(undefined) 

    function SetWentInsideCourse(value){
        setWentInsideCourse(value)   
        localStorage.setItem("WentInsideCourse", JSON.stringify(value) )   
    }

    function SetCurrentCourseChosen(value){
        set_current_course_chosen(value)
        localStorage.setItem("current_course_chosen", JSON.stringify(value))    
    }

    function Toggle_courses_changed(){
        set_courses_changed((prevstate)=>!prevstate)       
    }

    const context ={
        WentInsideCourse:WentInsideCourse,
        SetWentInsideCourse:SetWentInsideCourse,
        courses_changed:courses_changed,
        Toggle_courses_changed:Toggle_courses_changed,
        current_course_chosen:current_course_chosen,
        SetCurrentCourseChosen:SetCurrentCourseChosen
    }


    return <CourseContext.Provider value={context}>
        {props.children}
    </CourseContext.Provider>
}

export default CourseContext;