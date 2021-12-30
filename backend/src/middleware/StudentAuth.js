const jwt = require('jsonwebtoken')
const Student=require('../Models/student')
const Teacher=require('../Models/teacher')

//Studentauth middleware takes in a parameter CommonRoute, which is a boolean value. If this value is true, this means the route/endpoint that called this middleware is common between teachers and students
                                                                                    //If false, then this endpoint is unique to only students routes
const Studentauth = (CommonRoute)=>{
    //console.log(LogoutFlag)
    
    return async (req,res,next)=>{ //This is middleware
        
        try{
            
            const token =req.header('Authorization').replace('Bearer ', '') //replace Bearer  with nothing to extract the token
            // console.log(token)
            const decoded= jwt.verify(token,process.env.JWT_SECRET) //decode the token if decoded successfully using the 2nd arg(secret key)
            const student=await Student.findOne({_id:decoded._id, 'tokens.token': token}) //1st find the user with the correct ID
                    //2nd arg basically means that we are searching for a token in tokens array that has the token that was generated for every user
                    //In other words, it checks that the token is still stored in the tokens array so that he still gains access once he goes to webapge
            if(!student)
            {
               
                const decoded2= jwt.verify(token,process.env.JWT_SECRET) //decode the token if decoded successfully using the 2nd arg(secret key)
                const teacher=await Teacher.findOne({_id:decoded2._id, 'tokens.token': token}) //1st find the user with the correct ID
                
                if (teacher && CommonRoute) 
                        {  
                            return next('route')
                            //console.log('test')
                        }
                else
                    throw new Error('please authenticate')
                    
                    
            }

            else{ //else a student was found with the token in header
                //By reaching this point, there is no error thrown so we do 2 things
                //1. set a user property in request such that it can be accessed by other route handlers
                //2. add the next() as to continue with the route handling functions
                
                req.token = token
                req.student =student //Set a teacher property in request to the teacher that we just fetched
                
                next() //if No Error
            }

        }
        catch(e){
            res.status(401).send(e)

            
        }
    } 
}
module.exports=Studentauth