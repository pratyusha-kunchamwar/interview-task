"use client";
import { useState } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const storedUser = {
    email: "user@example.com",
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required.");
      setSuccessMessage("");
      return;
    }

    if (email === storedUser.email) {
      setError(null);
      setSuccessMessage("Login successful!");
    } else {
      setError("Invalid email address.");
      setSuccessMessage("");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Sign In</h2>

      {error && <div style={styles.error}>{error}</div>}
      {successMessage && <div style={styles.success}>{successMessage}</div>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
          style={styles.input}
          placeholder="Enter your email"
          required
        />
        <br />
        <br />

        <button type="submit" style={styles.button}>
          Sign In
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "25rem",
    margin: "4rem auto",
    padding: "3rem",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    textAlign: "center",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "1.2rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "0.8rem",
    margin: "0.8rem 0",
    fontSize: "1rem",
    borderRadius: "0.3rem",
    border: "1px solid #ccc",
    width: "100%",
  },
  button: {
    padding: "0.8rem",
    fontSize: "1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "0.4rem",
    cursor: "pointer",
    marginTop: "0.8rem",
  },
 
};

export default SignIn;
