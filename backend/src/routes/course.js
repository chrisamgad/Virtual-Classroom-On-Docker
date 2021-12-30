const express=require('express')
var router = express.Router()

const Course = require('../Models/course')
const Student = require('../Models/student')
const TeacherAuth =require('../middleware/TeacherAuth')


module.exports=router;