"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function TokenStorage() {
  const { data: session, status } = useSession();

  useEffect(() => {
    const syncAuthData = () => {
      if (status === "authenticated" && session?.accessToken) {
        localStorage.setItem("token", session.accessToken);
        localStorage.setItem("userId", session.user?.id || "");
        localStorage.setItem("email", session.user?.email || "");
        localStorage.setItem("role", session.user?.role || "USER");
        localStorage.setItem("firstName", session.user?.firstName || "");
        localStorage.setItem("lastName", session.user?.lastName || "");
        localStorage.setItem("profileImage", session.user?.image || "");

        window.dispatchEvent(new Event("auth-change"));
      }

      if (status === "unauthenticated") {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("email");
        localStorage.removeItem("role");
        localStorage.removeItem("firstName");
        localStorage.removeItem("lastName");
        localStorage.removeItem("profileImage");

        window.dispatchEvent(new Event("auth-change"));
      }
    };

    syncAuthData();
    window.addEventListener("auth-change", syncAuthData);
    return () => window.removeEventListener("auth-change", syncAuthData);
  }, [status, session]);

  return null;
}
