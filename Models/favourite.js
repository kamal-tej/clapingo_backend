const mongoose = require("mongoose");
const Teacher = require("./teacher");
const Student = require("./student");
const {Schema} = mongoose;

const favorSchema = new Schema({

    student_id : {
        type :  mongoose.Types.ObjectId,
        required : true,
        ref : Student,
    },

    teacher_id : {
        type :  mongoose.Types.ObjectId,
        required : true,
        ref : Teacher,
    }


});

const favor = mongoose.model("favor", favorSchema);

module.exports = favor;
