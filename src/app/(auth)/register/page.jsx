"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
   const [loading, setLoading] = useState(false);

  //  const handleLogin = (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   setTimeout(() => {
  //     router.push('/');
  //   }, 1000);
  // };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "Please enter your first name";
    if (!form.lastName.trim()) newErrors.lastName = "Please enter your last name";
    if (!form.email.trim()) newErrors.email = "Please enter your email";
    if (!form.password) newErrors.password = "Please enter your password";
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    if (Object.keys(newErrors).length === 0) {
      // Simulate token storage
      localStorage.setItem("authToken", "mocked-token");
      window.dispatchEvent(new Event("storage"));
      router.push("/verifyOTP");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-around bg-white px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32">
      <div className="w-full lg:w-1/2 max-w-md py-8 space-y-4">
        <div className="flex justify-center mb-2">
           <img src="/images/auth/logo.jpg" alt="logo" className='w-[130px]' />
        </div>

        <form onSubmit={handleSubmit}  className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full h-[77px] md:w-1/2">
              <Input
                label="First Name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter First Name"
              />
              {errors.firstName && (
                <p className="text-[12px] text-red-500 mt-[-14px]">{errors.firstName}</p>
              )}
            </div>

            <div className="w-full h-[77px] md:w-1/2">
              <Input
                label="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter Last Name"
              />
              {errors.lastName && (
                <p className="text-[12px] text-red-500 mt-[-14px]">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="w-full h-[77px]">
            <Input
              label="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-[12px] text-red-500 mt-[-14px]">{errors.email}</p>
            )}
          </div>

          <div className="relative w-full h-[77px]">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-[38px] right-4 text-xl text-gray-500"
            >
              {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
            </button>
            {errors.password && (
              <p className="text-[12px] text-red-500 mt-[-14px]">{errors.password}</p>
            )}
          </div>

          <div className="relative w-full h-[77px]">
            <Input
              label="Confirm Password"
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute top-[38px] right-4 text-xl text-gray-500"
            >
              {showConfirm ? <HiOutlineEyeOff /> : <HiOutlineEye />}
            </button>
            {errors.confirmPassword && (
              <p className="text-[12px] text-red-500 mt-[-14px]">{errors.confirmPassword}</p>
            )}
          </div>

          {/* <button
            type="submit"
            disabled={loading}
            className={`w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full py-3 font-semibold transition ${loading ? 'opacity-60 cursor-not-allowed' : ''
              }`}
          >
            {loading ? 'Continoue...' : 'Register'}
          </button> */}
          <button
            type="submit"
             disabled={loading}
            className="w-full p-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition"
          >
            Register
          </button>
        </form>

        <div className="flex items-center justify-between">
          <hr className="w-1/4 border-gray-300" />
          <span className="text-gray-400 text-sm">Or</span>
          <hr className="w-1/4 border-gray-300" />
        </div>

        <button className="w-full flex items-center justify-center gap-3 border border-gray-900 p-3 rounded-full hover:bg-gray-50 transition">
          <img src="/google-20.png" alt="Google" className="w-5 h-5" />
          <span className="text-sm font-medium text-gray-700">
            Continue with Google
          </span>
        </button>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-orange-600 font-semibold">
            Log in
          </a>
        </p>
      </div>

      <div className="hidden lg:flex md:ps-10 justify-center mt-14 lg:mt-0">
        <img
          src="/images/auth/register.jpg"
          alt="Register Illustration"
          width={450}
          height={450}
        />
      </div>
    </div>
  );
}
