
const mongoose =require('mongoose')
// Creating a Schema for uploaded files
const assignmentfileSchema = new mongoose.Schema({
    createdAt: {
      type: Date,
      default: Date.now,
    },
    name: {
      type: String,
      required: [true, "Uploaded file must have a name"],
    },
    ext:{
      type:String
    },
    assignment:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'assignment'
    },
    attempt:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'student-assignment-attempt'
    }
  });
  
  // Creating a Model from that Schema
  const AssignmentFile = mongoose.model("file", assignmentfileSchema);
  
  // Exporting the Model to use it in app.js File.
module.exports = AssignmentFile;