const mongoose =require('mongoose')

const courseSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'teacher'
    },
    description:{
        type:String
    },
    studentsList:[{    
            type:mongoose.Schema.Types.ObjectId,
            ref:'student'
        }],
    assignmentsList:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'assignment'
    }]
});

const Course = mongoose.model("course", courseSchema);

module.exports = Course;