"use client";
import { signOut } from "next-auth/react";
import { Button } from "@mui/material";

const Logout = () => {
  return (
    <Button
      variant="outlined"
      onClick={() => signOut()}
      sx={{
        backgroundColor: "#f44336",
        color: "#ffff",
      }}
    >
      Signout
    </Button>
  );
};
export default Logout;
