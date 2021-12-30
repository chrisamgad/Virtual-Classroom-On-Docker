const mongoose=require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt=require('bcrypt')

const teacherSchema = new mongoose.Schema({
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
    CoursesList:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'course'
    }],
    tokens:[{ //tokens is an array of objects, each object contains a token
        token:{
            type:String,
            required:true
        } 
     }]
   },{   //to enable the use of virtual, set virtuals to true in toObject and toJSON as done below
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    },
    timestamps:true //Adding Createdat and Updatedat timestamps to User
    
});

teacherSchema.methods.GenerateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id: user._id.toString()},process.env.JWT_SECRET) //this function generates the new token

    user.tokens=user.tokens.concat({token:token}) //adds new token object to the instance user's tokens arary
    await user.save() //call this such that we update user ,where the new token that was added to the user tokens array for this user
    return token
}

teacherSchema.statics.FindCredentials = async (email,password)=>{
 
    
    const teacher = await Teacher.findOne({
        email:email
    })
    if(teacher)
        {
            
            const verified=await bcrypt.compareSync(password,teacher.password)
            if(!verified)
                return undefined
        }
    return teacher
}


const Teacher = mongoose.model("teacher", teacherSchema);

module.exports = Teacher;