const express = require('express');
const router = express.Router();
const studentController = require('../controller/student.controller.js');

// for api req routes
router.get('/students', studentController.getAllStudents);
router.post('/students', studentController.addStudent);
router.patch('/students/:roll_no', studentController.updateStudent);
router.delete('/students/:roll_no', studentController.deleteStudent);

module.exports = router;

