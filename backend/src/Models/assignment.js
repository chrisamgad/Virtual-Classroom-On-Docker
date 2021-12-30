const mongoose=require('mongoose')

const assignmentSchema = new mongoose.Schema({
    name:{
        type:String
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'course'
    },
    description:{
        type:String
    },
    status:{
        type:String  //2 states-> In-Progress, which means still available for students to submit, AND Done, which means students no longer have access to submit their attempts (because deadline has passed)
    },
    DueDate:{
        type: Date
    },
    assignmentfile: {
        type:mongoose.Schema.Types.ObjectId, //allows storing binary data, which helps us in storing files
        ref:'file'
    },
    attempts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'student-assignment-attempt'
    }],
    students:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'student'
    }]
})

const Assignment = mongoose.model("assignment", assignmentSchema);

module.exports = Assignment;