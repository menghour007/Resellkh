
"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function TokenStorage() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.accessToken) {
      localStorage.setItem("authToken", session.accessToken);
      localStorage.setItem("userId", session.userId);
      localStorage.setItem("firstName", session.firstName);
      localStorage.setItem("lastName", session.lastName);
      localStorage.setItem("email", session.email);
    }
  }, [session]);

  return null;
}
