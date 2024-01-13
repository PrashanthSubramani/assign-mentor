const mongoose = require("mongoose");
const mentorModels = require("../../models/mentors/mentor.model");
const studentModel = require("../../models/students/student.model");


function GET_MENTORS(req, res){
    try{
        mentorModels
        .find()
        .then((response)=>{
            if(response.length > 0){
                return res.status(200).json({
                    sucess: true,
                    data: response,
                    messsage : "Mentor data fetched successfully"
                });
            }else{
                return res.status(200).json({
                    success:false,
                    message: "No records found"
                })
            }
        })
        .catch((e)=>{
            return res.status(402).json({
                success:false,
                message:"Something went wrong"
            })
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

function CREATE_MENTORS(req, res){
    
    const newMentor = new mentorModels(req.body);

    newMentor
    .save()
    .then((response)=>{
        if(response._id){
            return res.status(200).json({
                sucess : true,
                message: "Mentor added Successfully",
                data:response
            });
        }else{
            throw new Error({
                sucess : false,
                message:"Mentor not added Successfully"
            })
        }
    })
    .catch((e)=>{
        return res.status(200).json({
            sucess : false,
            message: e.message
        });
    });
}


    function SHOW_ALL_STUDENTS(req, res){
        try{

            let id = req.params.id;

            mentorModels.findById(id)
            .then(async (response)=>{
                
                const studentData = await Promise.all(response.studentAssigned.map(async (studentId) => {
                    try {
                        return await studentModel.findById(studentId);
                    } catch (err) {
                        console.error(`Error fetching data for student with ID ${studentId}: ${err.message}`);
                        return null;
                    }
                }));
            
                if (studentData.length > 0) {
                    return res.status(200).json({
                        success: true,
                        message: `Student data for the mentor ${id}`,
                        data: studentData.filter((data) => data !== null),
                    });
                } else {
                    return res.status(200).json({
                        success: false,
                        message: "No student assigned to this mentor",
                    });
                }

            })
            .catch((e)=>{
                return res.status(402).json({
                    sucess : false,
                    message: e.message,
                });
            })
        }catch(error){
            return res.status(500).json({
                sucess : false,
                message: "something went wrong",
            });
        }
    }


module.exports = {
    GET_MENTORS,
    CREATE_MENTORS,
    SHOW_ALL_STUDENTS
}