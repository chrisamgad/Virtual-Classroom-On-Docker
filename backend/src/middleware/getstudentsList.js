const Course =require('../Models/course')

const getstudentList=async(req,res,next)=>{
    try{
      // console.log("limit is "+parseInt(req.query.limit))
      // console.log("skip is "+parseInt(req.query.skip))
      // console.log(req.query)
     
      OwnerOfCourseFlag=req.teacher.CoursesList.includes(req.params.courseid)
    
      if(OwnerOfCourseFlag)
      {
        let TotalStudentsArrLength;
        //1. get student length
        await Course.findById(req.params.courseid)
        .populate({
          path:'studentsList'
        })
        .exec(function (err, course) {
          if (err) return handleError(err);
          //console.log(course.studentsList);
          TotalStudentsArrLength=course.studentsList.length;
        });
  
        await Course.findById(req.params.courseid)
        .populate({
          path:'studentsList',
          options:{
            limit:parseInt(req.query.limit),
            skip:parseInt(req.query.skip)
          }
        })
        .exec(function (err, course) {
          if (err) return handleError(err);
  
          console.log(TotalStudentsArrLength);
          //res.send({studentsList:course.studentsList, TotalStudentsArrLength})
          req.studentsList=course.studentsList
          req.TotalStudentsArrLength=TotalStudentsArrLength
          next()
        });
      }
      else
        throw new Error('You are not the owner of the course!')
    }catch(e){
      console.log(e)
      res.status(500).send(e)
    }
  }

  module.exports=getstudentList