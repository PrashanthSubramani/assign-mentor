const Mongoose = require("mongoose");
const studentModels = require("../../models/students/student.model");
const mentorModel = require("../../models/mentors/mentor.model");

    function GET_STUDENTS(req, res) {
        try {
            studentModels
                .find()
                .then((response) => {
                    if (response.length > 0) {
                        return res.status(200).json({
                            sucess: true,
                            data: response,
                            messsage: "Students data fetched successfully"
                        });
                    } else {
                        return res.status(200).json({
                            success: false,
                            message: "No records found"
                        })
                    }
                })
                .catch((e) => {
                    return res.status(402).json({
                        success: false,
                        message: "Something went wrong"
                    })
                })

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }


    function CREATE_STUDENT(req, res) {
        const newStudent = new studentModels(req.body);

        newStudent
            .save()
            .then((response) => {
                if (response._id) {

                    const id = response._id;

                    if (req.body.mentorAssigned) {
                        mentorModel.findById(req.body.mentorAssigned)
                            .then(mentorData => {
                                if (!mentorData) {
                                    return res.status(400).json({
                                        success: false,
                                        message: "Mentor not found"
                                    });
                                }

                                mentorData.studentAssigned.push(id);
                                mentorData.save();
                            })
                        return res.status(200).json({
                            sucess: true,
                            message: "Student added Successfully",
                            data: response
                        });

                    } else {
                        return res.status(200).json({
                            sucess: true,
                            message: "Student added Successfully",
                            data: response
                        });
                    }

                } else {
                    throw new Error({
                        sucess: false,
                        message: "Student not added Successfully"
                    })
                }
            })
            .catch((e) => {
                return res.status(200).json({
                    sucess: false,
                    message: e.message
                });
            });
    }


    function NO_MENTOR_STUDENT(req, res) {
        studentModels.find({
            mentorAssigned: undefined
        })
            .then((response) => {
                if (response.length > 0) {
                    return res.status(200).json({
                        succes: true,
                        data: response,
                        message: "Students data Not have mentors"
                    })

                } else {
                    return res.status(402).json({
                        succes: false,
                        message: "All Student Have mentors "
                    })
                }
            })
            .catch((e) => {
                return res.status(500).json({
                    succes: false,
                    message: e.message
                })
            })
    }


    function UPDATE_MENTOR(req, res){
        try{
            let id = req.params.id;
            const mentor_id = req.body.mentorAssigned;
            const newStudent = new studentModels(req.body);
            studentModels.findById(id)
            .then((response)=>{

                if(mentor_id){
                    response.mentorAssigned = mentor_id;
                    response.save();

                    if (req.body.mentorAssigned) {
                        mentorModel.findById(mentor_id)
                            .then(mentorData => {
                                if (!mentorData) {
                                    return res.status(400).json({
                                        success: false,
                                        message: "Mentor not found"
                                    });
                                }

                                mentorData.studentAssigned.push(id);
                                mentorData.save();
                            })
                    }

                    return res.status(200).json({
                        succes: true,
                        data: response,
                        message: "Mentor Updated to student " + response._id 
                    })
                }else{
                    return res.status(402).json({
                        succes: false,
                        message: "Something went wrong"
                    })
                }
 
            })
            .catch((e)=>{
                return res.status(500).json({
                    succes: false,
                    message: e.message
                })
            })

        }catch(error){
            return res.status(500).json({
                succes: false,
                message: error.message
            })
        }
    }

module.exports = {
    GET_STUDENTS,
    CREATE_STUDENT,
    NO_MENTOR_STUDENT,
    UPDATE_MENTOR
}