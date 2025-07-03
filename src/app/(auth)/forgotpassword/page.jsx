'use client';

import { useState } from "react";
import { FiMail } from "react-icons/fi";
import Input from "@/components/ui/Input";
import { useRouter } from "next/navigation"; // ✅ For navigation

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter(); // ✅ Use this instead of window.location.href

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Email is required.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const url = `https://phil-whom-hide-lynn.trycloudflare.com/api/v1/auths/forgot-password?email=${encodeURIComponent(email)}`;

      const res = await fetch(url, {
        method: "POST",
      });

      const text = await res.text();

      if (!res.ok) {
        throw new Error(text || "Failed to send reset email.");
      }

      setMessage("✅ " + text);

      // ✅ Redirect to OTP verify page and pass email via query param
      router.push(`/verify-forgotpassword?email=${encodeURIComponent(email)}`);
    } catch (error) {
      setMessage(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row items-center justify-center px-4 md:px-12 lg:px-[170px] py-10">
      {/* Left Illustration */}
      <div className="hidden lg:flex w-1/2 justify-between">
        <img
          src="/images/auth/forgotpassword.jpg" 
          alt="Forgot password illustration"
          className="max-w-[430px] h-auto"
        />
      </div>

      {/* Right Form */}
      <div className="w-full lg:w-1/2 max-w-md space-y-6">
        <div className="flex justify-center mb-12">
          <img src="/images/auth/logo.jpg" alt="logo" className="w-[130px]" />
        </div>

        <div className="text-center lg:text-left">
          <h1 className="text-xl font-semibold text-gray-900">Forgot Password</h1>
          <p className="text-sm text-gray-600 mt-2">
            Enter your email for the verification process. We will send a 6-digit code to your email.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FiMail className="absolute right-4 top-[38px] text-gray-400 text-lg" />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Continue"}
          </button>
        </form>

        {message && (
          <p className={`text-sm text-center mt-2 ${message.startsWith("✅") ? "text-green-600" : "text-red-500"}`}>
            {message}
          </p>
        )}

        <p className="text-sm text-center text-gray-600">
          Already remember your password?{" "}
          <a href="/login" className="text-orange-500 font-medium hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
