const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    batch:{
        type:String,
        required : true
    },
    mentorAssigned:{
        type : mongoose.Schema.Types.ObjectId,
        default: undefined,
        ref:"mentor"
    }
});

module.exports = mongoose.model('student',studentSchema)