// Using Node.js `require()`
const mongoose = require('mongoose');

//mongoose.connect("mongodb://localhost:27017/virtualclassroom", { //replace this line with the line below in case, we're  running NOT on docker containers (lw ben run on machine 3ady localhost)
mongoose.connect("mongodb://mongo_database_by_chris:27017/virtualclassroom", {    
    useNewUrlParser:true,
useCreateIndex:true,
useUnifiedTopology: true, //removes depreciation warning,
useFindAndModify:false
})