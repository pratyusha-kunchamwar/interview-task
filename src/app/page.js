import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

import Login from "./components/Login";
import Logout from "./components/Logout";
import Homepage from "./homePage/page";

const MYApp = async () => {
  const session = await getServerSession(authOptions);
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
          <h5>{session.user?.name}</h5>
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
