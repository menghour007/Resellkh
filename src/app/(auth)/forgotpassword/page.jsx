'use client';

import { FiMail } from "react-icons/fi";
import Input from "@/components/ui/Input"; // Make sure path is correct

export default function ForgotPassword() {
  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row items-center justify-center px-4 md:px-12 lg:px-[170px] py-10">
      {/* Left Illustration */}
      <div className="hidden lg:flex w-1/2 justify-between">
        <img
          src="/images/auth/forgot password.jpg"
          alt="Forgot password illustration"
          className="max-w-[430px] h-auto"
        />
      </div>

      {/* Right Form */}
      <div className="w-full lg:w-1/2 max-w-md space-y-6">
        {/* Logo */}
        <div className="flex justify-center mb-12">
           <img src="/images/auth/logo.jpg" alt="logo" className='w-[130px]' />
        </div>

        {/* Title & Description */}
        <div className="text-center lg:text-left">
          <h1 className="text-xl font-semibold text-gray-900">Forgot Password</h1>
          <p className="text-sm text-gray-600 mt-2">
            Enter your email for the verification process. We will send a 6 digit code to your email.
          </p>
        </div>

        {/* Form */}
        <form method="GET" action="/verify-forgotpassword" className="space-y-4">
          <div className="relative">
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
            />
            <FiMail className="absolute right-4 top-[38px] text-gray-400 text-lg" />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition"
          >
            Continue
          </button>
        </form>

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
