const mongoose = require('mongoose');

const mentorSchema = mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    email:{
        type:String,
        required : true
    },
    course:{
        type : String,
        required : true
    },
    studentAssigned:[
        {
            type : mongoose.Schema.Types.ObjectId,
            default: undefined,
            ref:"student"
        }
    ]
});

module.exports = mongoose.model('mentor',mentorSchema)