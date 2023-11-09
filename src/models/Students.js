import mongoose from "./index.js";

const validateEmail = (e) =>{
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return emailPattern.test(e);
}
const studentSchema = new mongoose.Schema({
    studName : { type:String,
        required:[true, "Student Name is required"]},
    studID : { type:String,
        required:[true, "Student ID is required"]},
    email : { type:String,
        required:[true, "Email is required"],
        validate:validateEmail},
    mentorName : { type:String,
        required:[true, "Mentor Name is required"]},
    newMentorName : { type:String },
    createdAt : { type:Date,
        default:Date.now()}        
},
{
    versionKey:false
})

const studentModel = mongoose.model('students',studentSchema)

export default studentModel