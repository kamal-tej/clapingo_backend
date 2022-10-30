const mongoose = require("mongoose");
const {Schema} = mongoose;

const teacherSchema = new Schema({

    name : {
        type : String,
        required : true,
    },

    email : {
        type : String,
        required : true,
        unique : true,
    },

    password : {
        type : String,
        required : true,
    },

    subject : {
        type : String,
        required : true,
    },

    mobile : {
        type : String,
    },
 
    gender : {
        type : String,
    }

});

const Teacher = mongoose.model("teacher", teacherSchema);

module.exports = Teacher;
