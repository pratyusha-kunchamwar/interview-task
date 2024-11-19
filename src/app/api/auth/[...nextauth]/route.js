// import NextAuth from "next-auth";
// import KeycloakProvider from "next-auth/providers/keycloak";

// export const authOptions = {
//   providers: [
//     KeycloakProvider({
//       clientId: process.env.KEYCLOAK_CLIENT_ID,
//       clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
//       issuer: process.env.KEYCLOAK_ISSUER
//     })
//   ]
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

export const authOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
      issuer: process.env.KEYCLOAK_ISSUER
    })
  ],
  session: {
    // Set the session to expire based on a specific time
    strategy: 'jwt', // Use JWT tokens for stateless sessions
    maxAge: 24 * 60 * 60, // Optional: set max age of the session (1 day in this case)
    updateAge: 60 * 60, // Optional: the session is refreshed every hour
  },
  callbacks: {
    async session({ session, token }) {
      // Remove session information after logout
      if (!token) {
        session = null; // Ensure no session data is carried over after logout
      }
      return session;
    },
    async jwt({ token, account, profile }) {
      if (account) {
        // Add any custom properties to the JWT token if needed
        token.id = profile.id;
      }
      return token;
    },
  },
  pages: {
    // Optional: customize the login and logout redirects if needed
    signOut: "/auth/signout", // Add a custom sign-out page if you want
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

