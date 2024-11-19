import { useState, useEffect } from "react";
import axios from "axios";

const useStudentsAPI = (API_URL) => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  // fetch students data
  const getStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      setError(error);
    }
  };
  // add student
  const addStudents = async (formData) => {
    try {
      await axios.post(API_URL, formData);
      getStudents();
    } catch (error) {
      setError(error);
    }
  };
  //edit student'
  const editTheStudents = async (id, formData) => {
    console.log(formData);
    try {
      await axios.patch(`${API_URL}${id}`, formData);
      getStudents();
    } catch (error) {
      setError(error);
    }
  };
  // delete a student
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
  }, [API_URL]);

  return { students, error, addStudents, editTheStudents, deleteTheStudents };
};

export default useStudentsAPI;
