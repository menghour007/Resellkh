'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import Input from '@/components/ui/Input'; // ✅ make sure path is correct

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      router.push('/');
    }, 1000);

    if (Object.length === 0) {
      // Simulate token storage
      localStorage.setItem("authToken", "mocked-token");
      window.dispatchEvent(new Event("storage"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full items-center">
        {/* Left: Illustration */}
        <div className="hidden md:flex justify-center">
          <Image src="/images/auth/log in.jpg" alt="Login Illustration" width={400} height={400} />
        </div>

        {/* Right: Login Form */}
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src="/images/auth/logo.jpg" alt="logo" className='w-[130px]' />
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            {/* Email */}
            <Input
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />

            {/* Password */}
            <div className="relative">
              <Input
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[38px] text-gray-500 text-xl"
              >
                {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
              </button>
              <div className="text-right mt-1">
                <a href="/forgotpassword" className="text-sm text-gray-500 hover:text-orange-500">
                  Forgot Password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full py-3 font-semibold transition ${
                loading ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>

            {/* Divider */}
            <div className="flex items-center justify-between my-4">
              <hr className="w-1/4 border-gray-300" />
              <span className="text-gray-400 text-sm">Or</span>
              <hr className="w-1/4 border-gray-300" />
            </div>

            {/* Google Login */}
            <button className="w-full flex items-center justify-center gap-3 border border-gray-300 p-3 rounded-full hover:bg-gray-50 transition">
              <Image src="/google-20.png" alt="Google" width={20} height={20} />
              <span className="text-sm font-medium text-gray-700">Continue with Google</span>
            </button>

            <p className="mt-4 text-center text-sm">
              Don’t have an Account?{' '}
              <a href="/register" className="text-orange-600 font-semibold hover:underline">
                Register
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
