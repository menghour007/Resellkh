import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, 
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      // This block only runs on first sign-in
      if (account && profile) {
        try {
          const response = await axios.post(
            "https://exchange-solely-finest-makers.trycloudflare.com/api/v1/auths/google",
            {
              email: profile.email,
              firstName: profile.given_name,
              lastName: profile.family_name,
            }
          );

          const data = response.data?.data ?? response.data;

          // Store backend response in token
          token.accessToken = data.token;
          token.role = data.role;
          token.userId = data.userId;
          token.email = data.email;
          token.firstName = data.firstName;
          token.lastName = data.lastName;
        } catch (error) {
          console.error("Google login error:", error.response?.data || error.message || error);
        }
      }
      return token;
    },

    async session({ session, token }) {
      // Merge JWT token into session object
      session.accessToken = token.accessToken;
      session.role = token.role;
      session.userId = token.userId;
      session.email = token.email;
      session.firstName = token.firstName;
      session.lastName = token.lastName;

      return session;
    },
  },
  pages: {
    signIn: "/login", // Optional: redirect to custom login page
    error: "/login",  // Optional: show login error
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
