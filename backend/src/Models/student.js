const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const bcrypt = require('bcrypt')

const studentSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    mobilenumber: {
        type: Number,
        required:true
    },
    role:{ //Teacher or Student
        type: String,
        required:true
    },
    avatar:{
        type:Buffer
    },
    CoursesList:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'course'
    }],
    assignmentsList:[{
        SubmissionStatus: String,
        assignment:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'assignment'
        }
    }],
    tokens:[{ //tokens is an array of objects, each object contains a token
        token:{
            type:String,
            required:true
        } 
     }]
   },
   //2nd arg is an object that contains options, where one of the options is timestamps
   {   //to enable the use of virtual, set virtuals to true in toObject and toJSON as done below
       toObject: {
           virtuals: true
       },
       toJSON: {
           virtuals: true
       },
       timestamps:true //Adding Createdat and Updatedat timestamps to User
       
   
   });


   //Differance between .methods and .statics is that
// .methods--> You are accessing a specific instance of the schema like this.user
//.statics --> the function is  a static "class" method to the Model itself (more of a class function rather than an object of the class function)
studentSchema.methods.GenerateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id: user._id.toString()},process.env.JWT_SECRET) //this function generates the new token

    user.tokens=user.tokens.concat({token:token}) //adds new token object to the instance user's tokens arary
    await user.save() //call this such that we update user ,where the new token that was added to the user tokens array for this user
    return token
}

studentSchema.statics.FindCredentials = async (email,password)=>{
 
    
    const student = await Student.findOne({
        email:email
    })
    if(student)
        {         
            const verified=await bcrypt.compareSync(password,student.password)
            if(!verified)
                return undefined
        }
    return student
}

const Student = mongoose.model("student", studentSchema);

module.exports = Student;