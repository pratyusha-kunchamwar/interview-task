const Student = require("../model/student.model");

// get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    res.send(students);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving students.",
    });
  }
};

// add a new student
exports.addStudent = async (req, res) => {
  const { name, gender, roll_no, branch } = req.body;

  if (!name || !gender || !roll_no || !branch) {
    return res.status(400).send({
      message: "Content cannot be empty! All fields are required.",
    });
  }

  try {
    const newStudent = await Student.create({ name, gender, roll_no, branch });
    res.send(newStudent);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while creating the student.",
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
    const [updatedRows] = await Student.update(
      { name, branch, gender },
      { where: { roll_no } }
    );

    if (updatedRows === 0) {
      return res.status(404).send({
        message: `Student with roll_no ${roll_no} not found.`,
      });
    }

    const updatedStudent = await Student.findOne({ where: { roll_no } });
    res.send(updatedStudent);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while updating the student.",
    });
  }
};

// delete 
exports.deleteStudent = async (req, res) => {
  const roll_no = req.params.roll_no;

  try {
    const deletedRows = await Student.destroy({
      where: { roll_no },
    });

    if (deletedRows === 0) {
      return res.status(404).send({
        message: `Student with roll_no ${roll_no} not found.`,
      });
    }

    res.send({
      message: `Student with roll_no ${roll_no} was deleted successfully!`,
    });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while deleting the student.",
    });
  }
};
