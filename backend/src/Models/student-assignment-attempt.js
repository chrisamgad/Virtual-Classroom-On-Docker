const mongoose=require('mongoose')

const student_assignment_attempt_Schema = new mongoose.Schema({
    name:{
        type:String
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'course'
    },
    status:{
        type:String  //2 states-> Submitted-On-Time, AND Submitted-Late
    },
    gradestatus:{
        type:String //2 states --> to-be-graded, done-grading
    },
    grade:{
        type: Number
    },
    gradecomment:{
        type: String
    },
    assignment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'assignment'
    },
    attempt_file: {
        type:mongoose.Schema.Types.ObjectId, //allows storing binary data, which helps us in storing files
        ref:'file'
    },
    student:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'student'
    }
},
    {   //to enable the use of virtual, set virtuals to true in toObject and toJSON as done below
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        },
        timestamps:true //Adding Createdat and Updatedat timestamps to User
    }
)

const StudentAssignmentAttempt = mongoose.model("student-assignment-attempt", student_assignment_attempt_Schema);

module.exports = StudentAssignmentAttempt;