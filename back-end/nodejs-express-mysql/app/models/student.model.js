const sql = require("./db.js");
Student = {};
// get all students
Student.getAll = (result) => {
  sql.query("SELECT * FROM students", (err, res) => {
    if (err) {
      result(err, null);
      return;
    } else {
      result(null, res);
    }
  });
};

// add new student
Student.add = (newStudent, result) => {
  sql.query(
    "INSERT INTO students ( name, gender,roll_no, branch) VALUES (?, ?, ?, ?)",
    [newStudent.name, newStudent.gender, newStudent.roll_no, newStudent.branch],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      } else {
        result(null, res);
      }
    }
  );
};

// update student data
Student.update = (roll_no, student, result) => {
  sql.query(
    "UPDATE students SET name = ?, branch = ?, gender = ? WHERE roll_no = ?",
    [student.name, student.branch, student.gender, roll_no],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "notfound" }, null);
        return;
      }
      result(null, { roll_no: roll_no, ...student });
    }
  );
};

// delete the student
Student.delete = (roll_no, result) => {
  sql.query("DELETE FROM students WHERE roll_no = ?", roll_no, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "notfound" }, null);
      return;
    }
    result(null, res);
  });
};

module.exports = Student;
