const Student = require("../model/student.model");

// get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.getAll();
    res.send(students);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving students",
    });
  }
};

// add a new student
exports.addStudent = async (req, res) => {
  const { name, gender, roll_no, branch } = req.body;

  if (!name || !gender || !roll_no || !branch) {
    return res.status(400).send({
      message: "All fields are required.",
    });
  }

  try {
    const newStudent = await Student.add({ name, gender, roll_no, branch }); // Calling the model's add method
    res.send(newStudent);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error while creating the student.",
    });
  }
};

// update student data
exports.updateStudent = async (req, res) => {
  const roll_no = req.params.roll_no;
  const { name, branch, gender } = req.body;

  if (!name && !branch && !gender) {
    return res.status(400).send({
      message: "Some fields are missing",
    });
  }

  try {
    const updatedStudent = await Student.updateStudent(roll_no, {
      name,
      branch,
      gender,
    });

    res.send(updatedStudent);
  } catch (err) {
    if (err.kind === "notfound") {
      return res.status(404).send({
        message: `Student with roll_no ${roll_no} not found.`,
      });
    }
    res.status(500).send({
      message: err.message || "Some error occurred while updating the student.",
    });
  }
};

// delete student
exports.deleteStudent = async (req, res) => {
  const roll_no = req.params.roll_no;

  try {
    const result = await Student.delete(roll_no);
    res.send(result);
  } catch (err) {
    if (err.kind === "notfound") {
      return res.status(404).send({
        message: `Student with roll_no ${roll_no} not found.`,
      });
    }
    res.status(500).send({
      message: err.message || "Some error occurred while deleting the student.",
    });
  }
};
