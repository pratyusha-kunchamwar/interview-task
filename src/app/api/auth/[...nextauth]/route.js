import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { jwtDecode } from "jwt-decode";
import { encrypt } from "@/utils/encryption";

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      const nowTimeStamp = Math.floor(Date.now() / 100);
      // console.log(token);
      if (account) {
        token.decode = jwtDecode(account.access_token);
        token.accessToken = account.access_token;
        token.id_token = account.id_token;
        token.expires_at = account.expires_at;
        token.refresh_token = account.refresh_token;
        token.userProp = account.userProp;
        return token;
      } else if (nowTimeStamp < token.expires_at) {
        return token;
      } else {
        console.log("token expiring");
        return token;
      }
    },
    async session({ session, token }) {
      console.log({ id: token.id_token, token: token.decode.realm_access });
      session.access_token = encrypt(token.accessToken);
      session.id_token = encrypt(token.id_token);
      session.roles = token.decode.realm_access.roles;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
