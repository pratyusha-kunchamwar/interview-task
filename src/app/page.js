"use client";
import { useSession } from "next-auth/react";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Homepage from "./homePage/page";

const MYApp = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (session) {
    return (
      <div>
        <div
          style={{
            position: "absolute",
            top: "2rem",
            right: "8rem",
          }}
        >
          <h5>{session?.user?.name || "User"}</h5>
          <Logout />
        </div>
        <Homepage />
      </div>
    );
  }
  return (
    <div>
      <Login />
    </div>
  );
};

export default MYApp;
