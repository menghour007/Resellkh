"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import Input from "@/components/ui/Input"; // adjust the path to where your Input.jsx is located

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await new Promise((r) => setTimeout(r, 1000));
      router.push("/reset-success");
    } catch (err) {
      setError("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white px-[150px]">
      {/* Left Image */}
      <div className="hidden md:flex w-1/2 justify-between ">
        <img src="/images/auth/create new password.jpg" alt="Reset Password" className="w-[400px]" />
      </div>

      {/* Right Form */}
      <div className="w-full md:w-1/2 max-w-md space-y-6">
        <div className="flex justify-center mb-8">
          <img src="/images/auth/logo.jpg" alt="logo" className="w-[130px]" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-left">
            Create new Password
          </h2>
          <p className="text-gray-500 mt-2 text-left text-sm">
            Set the new password for your account so you can login and access
            all features.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Reset Password Field */}
          <div className="relative">
            <Input
              label="Reset Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your new password"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[46px] transform -translate-y-1/2 cursor-pointer text-gray-500 text-xl"
            >
              {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
            </span>
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <Input
              label="Confirm Password"
              name="confirm"
              type={showConfirm ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm your password"
            />
            <span
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-[46px] transform -translate-y-1/2 cursor-pointer text-gray-500 text-xl"
            >
              {showConfirm ? <HiOutlineEyeOff /> : <HiOutlineEye />}
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full p-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition font-semibold"
          >
            Update Password
          </button>
        </form>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
      </div>
    </div>
  );
}
