import mongoose from "./index.js";

const validateEmail = (e) =>{
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return emailPattern.test(e);
}
const mentorSchema = new mongoose.Schema({
    mentorName : { type:String,
        required:[true, "Mentor Name is required"]},
    mentorID : { type:String,
        required:[true, "Mentor ID is required"]},
    email : { type:String,
        required:[true, "Email is required"],
        validate:validateEmail},
    mentorStudents : { type: [String] },
    createdAt : { type:Date,
        default:Date.now()}        
},
{
    versionKey:false
})

const mentorModel = mongoose.model('mentors',mentorSchema)

export default mentorModel