"use client";
import { useState } from "react";
import Link from "next/link";
import SignIn from "./signIn/page";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email } = formData;

    if (!name || !email) {
      setError("All fields are required.");
      setSuccessMessage("");
      return;
    }

    setError(null);
    setSuccessMessage("Account created successfully!");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Create Account</h2>

      {error && <div style={styles.error}>{error}</div>}
      {successMessage && (
        <div style={styles.success}>{successMessage}</div>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleFormData}
          style={styles.input}
          placeholder="Enter your name"
          required
        />
        <br />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleFormData}
          style={styles.input}
          placeholder="Enter your email"
          required
        />
        <br />

        <button type="submit" style={styles.button}>
          Create Account
        </button>
      </form>

      <div style={styles.linkText}>
        Already have an account?{" "}
        <Link href="/signIn" style={styles.link}>
          SignIn
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "25rem",
    margin: "3rem auto",
    padding: "1.25rem", 
    border: "0.07rem solid #ccc", 
    borderRadius: "0.7rem", 
    backgroundColor: "#f9f9f9",
    textAlign: "center",
  },
  title: {
    fontSize: "1.5rem", 
    fontWeight: "bold",
    marginBottom: "1.25rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "0.7rem", 
    margin: "0.7rem 0", 
    fontSize: "1rem", 
    borderRadius: "0.4rem", 
    border: "0.07rem solid #ccc", 
    width: "100%",
  },
  button: {
    padding: "0.7rem", 
    fontSize: "1rem", 
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "0.4rem", 
    cursor: "pointer",
    marginTop: "0.7rem", 
   
  },
 
  error: {
    color: "#ff4d4d",
    marginBottom: "0.7rem", 
    fontSize: "1rem", // 16px
  },
  success: {
    color: "#28a745",
    marginBottom: "0.7rem", 
    fontSize: "1rem", 
  },
  linkText: {
    marginTop: "1.25rem",
    fontSize: "0.9rem", 
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
  },
};

export default SignUp;