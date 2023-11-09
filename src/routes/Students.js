import express from 'express'
import StudentController from '../controller/Students.js'

const router = express.Router()

router.get('/',StudentController.getStudents)
router.post('/',StudentController.createStud)
router.get('/allmentors',StudentController.getMentors)
router.post('/mentor',StudentController.createMentor)
router.put('/assignStudent',StudentController.assignStudentsToMentor),
router.put('/assignMentor',StudentController.assignMentorToStudent)
router.get('/assignedMentor/:studentName', StudentController.getAssignedMentor)
router.get('/assingedStudents/:mentorName',StudentController.getAssignedStudents)
router.get('/previousMentor/:studName',StudentController.previouslyAssignedMentor)
router.delete('/:studentName',StudentController.deleteStudent)
router.delete('/deleteMentor/:mentorId',StudentController.deleteMentor)

export default router