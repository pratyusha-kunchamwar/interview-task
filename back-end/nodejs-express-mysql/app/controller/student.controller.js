const Student = require("../models/student.model");

// get all students
exports.getAllStudents = (req, res) => {
  Student.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving students.",
      });
    } else {
      res.send(data);
    }
  });
};

// add student
exports.addStudent = (req, res) => {
  if (
    !req.body.name ||
    !req.body.gender ||
    !req.body.roll_no ||
    !req.body.branch
  ) {
    res.status(400).send({
      message: "content cannot be empty! all fields are requied",
    });
  }
  const newStudent = new Student({
    name: req.body.name,
    gender: req.body.gender,
    roll_no: req.body.roll_no,
    branch: req.body.branch,
  });
  Student.add(newStudent, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "error occurred while creating the student.",
      });
    } else {
      res.send(data);
    }
  });
};

// Update student data
exports.updateStudent = (req, res) => {
  const roll_no = req.params.roll_no;

  if (!req.body.name && !req.body.branch && !req.body.gender) {
    return res.status(400).send({
      message: "some field is missing",
    });
  }

  const updatedStudent = {};
  if (req.body.name) updatedStudent.name = req.body.name;
  if (req.body.branch) updatedStudent.branch = req.body.branch;
  if (req.body.gender) updatedStudent.gender = req.body.gender;

  Student.update(roll_no, updatedStudent, (err, data) => {
    if (err) {
      if (err.kind === "notfound") {
        res.status(404).send({
          message: `Student with roll_no ${roll_no} not found.`,
        });
      } else {
        res.status(500).send({
          message:
            err.message || "Some error occurred while updating the student.",
        });
      }
    } else {
      res.send(data);
    }
  });
};

// Delete a student by roll number
exports.deleteStudent = (req, res) => {
  const roll_no = req.params.roll_no;

  Student.delete(roll_no, (err, data) => {
    if (err) {
      if (err.kind === "notfound") {
        res.status(404).send({
          message: `Student with roll_no ${roll_no} not found.`,
        });
      } else {
        res.status(500).send({
          message:
            err.message || "Some error occurred while deleting the student.",
        });
      }
    } else {
      res.send({
        message: `Student with roll_no ${roll_no} was deleted successfully!`,
      });
    }
  });
};
