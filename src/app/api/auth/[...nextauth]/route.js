import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const backendURL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://phil-whom-hide-lynn.trycloudflare.com/api/v1";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
     async authorize(credentials) {
  try {
    const res = await fetch(`${backendURL}/auths/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: credentials?.email,
        password: credentials?.password,
      }),
    });

    if (!res.ok) return null;

    const data = await res.json(); // <-- no destructuring

    if (!data.token) return null;

    return {
      id: data.userId,
      email: data.email,
      name: data.userName || `${data.firstName || ""} ${data.lastName || ""}`.trim(),
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role || "USER",
      token: data.token,
      image: data.profileImage || null, // your response doesn't have profileImage, adjust if needed
    };
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
}

    }),
  ],

  callbacks: {
    async signIn({ account, profile, user }) {
      if (account?.provider === "google" && profile?.email) {
        try {
          const res = await fetch(`${backendURL}/auths/google`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: profile.email,
              firstName: profile.given_name,
              lastName: profile.family_name,
              picture: profile.picture,
            }),
          });

          if (!res.ok) return false;

          const { payload } = await res.json();

          user.id = payload.userId;
          user.token = payload.token;
          user.firstName = payload.firstName;
          user.lastName = payload.lastName;
          user.role = payload.role || "USER";
          user.email = payload.email;
          user.image = payload.profileImage || profile.picture;

          return true;
        } catch (err) {
          console.error("Google login error:", err);
          return false;
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user?.token) {
        token.accessToken = user.token;
        token.userId = user.id;
        token.email = user.email;
        token.role = user.role;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.picture = user.image;
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = {
        id: token.userId,
        email: token.email,
        role: token.role,
        firstName: token.firstName,
        lastName: token.lastName,
        image: token.picture,
      };
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60, // 2 hours
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: false,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
