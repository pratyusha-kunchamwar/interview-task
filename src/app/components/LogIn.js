"use client";
import { signIn } from "next-auth/react";
import { Button } from "@mui/material";

const LogIn=()=> {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        gap: "1.5rem",
      }}
    >
      <h2 style={{ color: "#333", fontSize: "1.8rem", fontWeight: "500" }}>
        Welcome! Please Sign In to Access the Website
      </h2>
      <Button
        variant="outlined"
        onClick={() => signIn("keycloak")}
        sx={{
          backgroundColor: "#f44336",
          color: "#fff",
          width: "15rem",
          height: "3rem",
          fontSize: "1rem",
          borderRadius: "0.5rem",
        }}
      >
        Sign In
      </Button>
    </div>
  );
}
export default LogIn;
