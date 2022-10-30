const mongoose = require("mongoose");
const {Schema} = mongoose;

const studentSchema = new Schema({
    rollno : {
        type : String,
        required : true,
        unique : true,
    },

    name : {
        type : String,
        required : true,
    },

    password : {
        type : String,
        required : true,
    },
 
    gender : {
        type : String,
    }

});

const Student = mongoose.model("student", studentSchema);

module.exports = Student;
