"use client";
import axios from "axios";
import { useState, useEffect } from "react";

import { Button } from "@mui/material";

import StudentForm from "../components/StudentForm";
import StudentTable from "../components/StudentTable";
import StudentDelete from "../components/StudentDelete";

const Homepage = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    roll_no: "",
    branch: "",
  });
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  const [isEditMode, setIsEditMode] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  // api calling
  const getStudents = async () => {
    try {
      let response = await axios.get("http://localhost:8080/students");
      setStudents(response.data);
    } catch (error) {
      setError(error);
    }
  };
  //add students
  const addStudents = async (formData) => {
    try {
      await axios.post("http://localhost:8080/students", formData);
      getStudents();
    } catch (error) {
      setError(error);
    }
  };
  //edit students
  const editTheStudents = async (id) => {
    try {
      await axios.patch(`http://localhost:8080/students/${id}`, formData);
      getStudents();
    } catch (error) {
      setError(error);
    }
  };
  //delete students
  const deleteTheStudents = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/students/${id}`);
      getStudents();
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      name: "",
      gender: "",
      roll_no: "",
      branch: "",
    });
    setIsEditMode(false);
  };

  //for student data
  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.gender ||
      !formData.roll_no ||
      !formData.branch
    ) {
      alert("Enter all fields");
      return;
    } else {
      if (isEditMode) {
        editTheStudents(formData.roll_no);
      } else {
        addStudents(formData);
      }

      handleClose();
    }
  };

  // to edit
  const handleEdit = (roll_no) => {
    const studentToEdit = students.find(
      (student) => student.roll_no === roll_no
    );
    if (studentToEdit) {
      setFormData(studentToEdit);
      setIsEditMode(true);
      handleClickOpen();
    } 
  };

  // to delete
  const handleDelete = (roll_no) => {
    const student = students.find((student) => student.roll_no === roll_no);
    setStudentToDelete(student);
    setOpenDeleteDialog(true);
  };
  const handleConfirmDelete = () => {
    if (studentToDelete) {
      deleteTheStudents(studentToDelete.roll_no);
    }
    setOpenDeleteDialog(false);
    setStudentToDelete(null);
  };
  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
    setStudentToDelete(null);
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Students</h1>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        color="primary"
        style={{ marginLeft: "1rem" }}
      >
        Add Student
      </Button>
      <StudentForm
        open={open}
        handleClose={handleClose}
        formData={formData}
        handleFormData={handleFormData}
        handleSubmit={handleSubmit}
        isEdit={isEditMode}
      />
      <StudentTable
        students={students}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <StudentDelete
        open={openDeleteDialog}
        student={studentToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default Homepage;
