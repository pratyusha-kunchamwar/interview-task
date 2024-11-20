"use client";
import axios from "axios";
import { signOut } from "next-auth/react";
import { Button } from "@mui/material";

const keycloakSessionLogOut = async () => {
  try {
    const response = await axios.get("/api/auth/logout");
  } catch (err) {
    console.error("Error logging out:", err);
  }
};

const LogOut = () => {
  return (
    <Button
      variant="outlined"
      onClick={() => {
        keycloakSessionLogOut().then(() => signOut({ callbackUrl: "/" }));
      }}
      sx={{
        backgroundColor: "#f44336",
        color: "#ffff",
      }}
    >
      Signout
    </Button>
  );
};
export default LogOut;
