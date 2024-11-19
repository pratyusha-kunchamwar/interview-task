"use client";
import axios from "axios";
import { useState, useEffect } from "react";

import { Button } from "@mui/material";

import StudentForm from "../components/StudentForm";
import StudentTable from "../components/StudentTable";
import StudentDelete from "../components/StudentDelete";

const Homepage = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
  const [message, setMessage] = useState("");

  // api calling
  const getStudents = async () => {
    try {
      let response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      setError(error);
    }
  };
  //add students
  const addStudents = async (formData) => {
    try {
      await axios.post(API_URL, formData);
      getStudents();
    } catch (error) {
      setError(error);
    }
  };
  //edit students
  const editTheStudents = async (id) => {
    try {
      await axios.patch(`${API_URL}${id}`, formData);
      getStudents();
    } catch (error) {
      setError(error);
    }
  };
  //delete students
  const deleteTheStudents = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}`);
      getStudents();
    } catch (error) {
      setError(error);
    }
  };
  useEffect(() => {
    getStudents();
  }, []);

  // handlers
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setMessage("");
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

    if (name === "roll_no") {
      const existingStudent = students.find(
        (student) => student.roll_no == value
      );
      if (existingStudent) {
        setMessage(
          `This roll number ${value} already exists. Please enter another.`
        );
      } else {
        setMessage("");
      }
    }

    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      editTheStudents(formData.roll_no);
    } else {
      addStudents(formData);
    }
    handleClose();
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
    <div style={{ marginTop: "6rem" }}>
      <h1 style={{ textAlign: "center" }}>Students</h1>
      {error && (
        <div
          style={{ color: "#f44336", textAlign: "center" }}
        >{`Error: ${error.message}`}</div>
      )}
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        color="primary"
        style={{ marginLeft: "4rem" }}
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
        message={message}
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
    </div>
  );
};

export default Homepage;
