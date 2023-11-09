import studentModel from "../models/Students.js";
import mentorModel from "../models/Mentors.js";


// Get all Students
const getStudents = async(req,res)=>{
try {
    let students = await studentModel.find()
    res.status(200).send({
        message:"Students Data Fetched Successfully",
        counts:students.length,
        students
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
        message:"Internal Server Error",
        error:error.message
    })
}
}

// Create Students
const createStud = async(req,res)=>{
    try {
        let students = await studentModel.findOne({email:req.body.email})
        if(!students){
            await studentModel.create(req.body)
            res.status(201).send({
                message:"Student Created Successfully",
                
             })
        }
        else
        {
            res.status(400).send({message:`Student with ${req.body.email} already exists`})
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
}

// Get all Mentors
const getMentors = async(req,res)=>{
    try {
        let mentors = await mentorModel.find()
        res.status(200).send({
            message:"Mentors Data Fetched Successfully",
            counts:mentors.length,
            mentors
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
    }

// Create Mentor 
const createMentor = async(req,res)=>{

    try {
        let mentors = await mentorModel.findOne({email:req.body.email})
        if(!mentors){
            await mentorModel.create(req.body)
            res.status(201).send({
                message:"Mentor Created Successfully"
            })
        }
        else
        {
            res.status(400).send({message:`Mentor with ${req.body.email} already exists`})
        }

    } catch (error) {
        res.status(500).send({
            message:"Internal Server error",
            error:error.message
        })
    }
}

// Select One Mentor and Add Multiple Students
// const assignStudentsToMentor = async(req,res) => {
//     try {
//       const {mentorName, studentNames} = req.body;
  
//       // Check if the mentor exists
//       const mentor = await mentorModel.findOne({ mentorName });
  
//       if (!mentor) {
//         return res.status(404).send({
//           message: `Mentor ${mentorName} not found`,
//         });
//       }
  
//     //   Check if the students exists and do not have mentors
//     const students = await studentModel.find({
//         studName: { $in: studentNames },
//         mentorName: { $exists: false },
//     });

//     if (students.length !== studentNames.length) {
//         return res.status(400).send({
//             message: "Some students do not exist or already have mentors",
//         });
//     }
//     // Update the mentor's students and the students' mentorName
//     mentor.mentorStudents.push(...studentNames);
//     await mentor.save();

//     await studentModel.updateMany(
//         {studName : {$in: studentNames}},
//         {mentorName});

//     res.status(200).send({
//         message:"Students Assigned to mentor successfully"
//     }) 

//     } catch (error) {
//       res.status(500).json({
//         message: "Internal Server Error",
//         error: error.message,
//       });
//     }
//   };

const assignStudentsToMentor = async(req,res)=>{
    try {
        const {mentorName, studentNames} = req.body;
        
        // Check if mentor exits
        const mentor = await mentorModel.findOne({ mentorName })
        if(!mentor){
            return res.status(404).send({
                message: `Mentor ${mentorName} not found`,
              });
        }
        
        // Update the Mentor's mentorStudents
        mentor.mentorStudents.push(...studentNames);
        await mentor.save();


        res.status(200).send({
            message: "Students assigned to mentor successfully",
        })
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            error: error.message,
        });
    }
}
  
// Change Or Update newMentor to the particular Student 
const assignMentorToStudent = async (req, res) => {
    try {
        const { studName, newMentorName } = req.body;

        // Find the student by name
        const student = await studentModel.findOne({ studName });

        if (!student) {
            return res.status(400).send({
                message: `Student '${studName}' not found`,
            });
        }

        // Update the student's mentorName
        student.newMentorName = newMentorName;
        await student.save();

        res.status(200).send({
            message: `Assigned New Mentor to '${studName}' successfully`,
        });
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// Get Assigned Mentor for Particular Student
const getAssignedMentor = async (req, res) => {
    try {
        const studentName = req.params.studentName;

        // Find the student by name
        const student = await studentModel.findOne({ studName: studentName });

        if (!student) {
            return res.status(404).send({
                message: `Student '${studentName}' not found`,
            });
        }

        const assignedMentor = student.mentorName;

        if (!assignedMentor) {
            return res.status(200).send({
                message: `Student '${studentName}' does not have an assigned mentor.`,
            });
        }

        res.status(200).send({
            message: `Assigned mentor for student '${studentName}': ${assignedMentor}`,
        });
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// Get Assigned Students for Particular Mentor
const getAssignedStudents = async(req,res)=>{
    try {
        const mentorName = req.params.mentorName;

        const students = await studentModel.find({ mentorName });
        res.status(200).send({
            message:`Students for Mentor ${mentorName} Fetched Successfully`,
            counts:students.length,
            students
        })

    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

// Previously Assigned Mentor for particular Student
const previouslyAssignedMentor = async(req,res)=>{
    try {
        const studName = req.params.studName;
        // Find the student by their name
        const student = await studentModel.findOne({ studName});
        if(!student){
            return res.status(404).send({
                message:"Student Not found"
            })
        }

        // Get previously Assigned mentor
        const previousMentor = student.mentorName
        if(!previousMentor){
            return res.status.send({
                message:"No Previous Mentor found for the student"
            })
        }

        res.status(200).send({previousMentor})

    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error',
            error: error.message,
          });
    }
}

// Delete Student
const deleteStudent = async (req, res) => {
    try {
        const studentName = req.params.studentName;

        // Find and delete the student by name
        const deletedStudent = await studentModel.findOneAndDelete({ studName: studentName });

        if (!deletedStudent) {
            return res.status(404).send({
                message: `Student '${studentName}' not found, no data deleted.`,
            });
        }

        res.status(200).send({
            message: `Student '${studentName}' deleted successfully.`,
            deletedStudent,
        });
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

// Delete Mentor
const deleteMentor = async (req, res) => {
    try {
        const mentorId = req.params.mentorId;

        // Find and delete the mentor by ID
        const deletedMentor = await mentorModel.findOneAndDelete({ _id: mentorId });

        if (!deletedMentor) {
            return res.status(404).send({
                message: `Mentor with ID '${mentorId}' not found, no data deleted.`,
            });
        }

        res.status(200).send({
            message: `Mentor with ID '${mentorId}' deleted successfully.`,
            deletedMentor,
        });
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export default {
    getStudents,
    createStud,
    getMentors,
    createMentor,
    assignStudentsToMentor,
    assignMentorToStudent,
    getAssignedMentor,
    getAssignedStudents,
    previouslyAssignedMentor,
    deleteStudent,
    deleteMentor
}