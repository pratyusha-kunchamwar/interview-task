  import { authOptions } from "../[...nextauth]/route";
  import { getServerSession } from "next-auth";
  import { getIdToken } from "@/utils/sessionTokenAccessor";
  import axios from "axios";

  export async function GET() {
    const session = await getServerSession(authOptions);
    if (session) {
      const idToken = await getIdToken();
      let url = `${
        process.env.END_SESSION_URL
      }?id_token_hint=${idToken}&post_logout_redirect_uri=${encodeURIComponent(
        process.env.NEXTAUTH_URL
      )}`;
      try {
        await axios.get(url);
      } catch (err) {
        return new Response(null, { status: 500 });
      }
    }
    return new Response({ status: 200 });
  }

  export default GET;
