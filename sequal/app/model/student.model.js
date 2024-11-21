const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./db.js");

// student model
const Student = sequelize.define(
  "Student",
  {
    roll_no: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    branch: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "students",
    timestamps: false,
  }
);

//  all students
Student.getAll = async () => {
  try {
    return await Student.findAll();
  } catch (err) {
    throw err;
  }
};

// add a new student
Student.add = async (newStudent) => {
  try {
    return await Student.create(newStudent);
  } catch (err) {
    throw err;
  }
};

// update student
Student.updateStudent = async (roll_no, updatedData) => {
  try {
    const updatedRows = await Student.update(updatedData, {
      where: { roll_no },
    });

    if (updatedRows[0] === 0) {
      throw { kind: "notfound" };
    }

    return await Student.findOne({ where: { roll_no } });
  } catch (err) {
    throw err;
  }
};

// delete student
Student.delete = async (roll_no) => {
  try {
    const deletedRows = await Student.destroy({
      where: { roll_no },
    });

    if (deletedRows === 0) {
      throw { kind: "notfound" };
    }
    return { message: "Student deleted successfully" };
  } catch (err) {
    throw err;
  }
};

module.exports = Student;
