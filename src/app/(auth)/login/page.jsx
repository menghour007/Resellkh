"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import InputFillPassword from "@/components/ui/InputFillPassword";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://phil-whom-hide-lynn.trycloudflare.com/api/v1/auths/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed. Please try again.");
        setLoading(false);
        return;
      }

      // ✅ Store data in localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      if (data.role) {
        localStorage.setItem("userRole", data.role);
      }

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      router.push("/");
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full items-center">
        <div className="hidden md:flex justify-center">
          <Image
            src="/images/auth/log in.jpg"
            alt="Login Illustration"
            width={400}
            height={400}
          />
        </div>

        <div className="w-full max-w-md mx-auto">
          <div className="flex justify-center mb-6">
            <img
              src="/images/auth/logo.jpg"
              alt="logo"
              className="w-[130px]"
            />
          </div>

          {error && (
            <p className="text-red-500 text-center mb-4 font-semibold">
              {error}
            </p>
          )}

          <form className="space-y-5" onSubmit={handleLogin}>
            <Input
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />

            <div className="relative">
              <InputFillPassword
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              
              <div className="text-right mt-1">
                <a
                  href="/forgotpassword"
                  className="text-sm text-gray-500 hover:text-orange-500"
                >
                  Forgot Password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full py-3 font-semibold transition ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>

            <div className="flex items-center justify-between my-4">
              <hr className="w-1/4 border-gray-300" />
              <span className="text-gray-400 text-sm">Or</span>
              <hr className="w-1/4 border-gray-300" />
            </div>

            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="w-full flex items-center justify-center gap-3 border border-gray-900 p-3 rounded-full hover:bg-gray-50 transition"
            >
              <img src="/google-20.png" alt="Google" className="w-5 h-5" />
              <span className="text-sm font-medium text-gray-700">
                Continue with Google
              </span>
            </button>

            <p className="mt-4 text-center text-sm">
              Don’t have an Account?{" "}
              <a
                href="/register"
                className="text-orange-600 font-semibold hover:underline"
              >
                Register
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
