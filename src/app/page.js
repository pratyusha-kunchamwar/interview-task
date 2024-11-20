"use client";
import { useSession } from "next-auth/react";
import LogIn from "./components/LogIn";
import LogOut from "./components/LogOut";
import HomePage from "./homePage/page";

const MyApp = () => {
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
          <LogOut />
        </div>
        <HomePage />
      </div>
    );
  }
  return (
    <div>
      <LogIn />
    </div>
  );
};

export default MyApp;
