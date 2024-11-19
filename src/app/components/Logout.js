"use client";
import { signOut } from "next-auth/react";
import { Button } from "@mui/material";

async function keycloakSessionLogOut() {
  try {
    await fetch(`/api/auth/logout`, { method: "GET" });
  } catch (err) {
    console.error(err);
  }
}

const Logout = () => {
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
export default Logout;
