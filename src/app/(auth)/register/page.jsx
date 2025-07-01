"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useGoogleLogin } from "@react-oauth/google";
import { signIn } from "next-auth/react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();

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

  const handleSubmit = async (e) => {
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
      setLoading(true);
      setSubmitError("");
      try {
        const response = await fetch('https://phil-whom-hide-lynn.trycloudflare.com/api/v1/auths/register', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        let result = {};
        try {
          result = await response.json();
        } catch {
          console.error("Failed to parse response as JSON");
          result = { message: "Failed to parse server response" };  
        }

        if (response.ok) {
          window.dispatchEvent(new Event("storage"));
          router.push(`/verifyOTP?email=${form.email}`);

        } else if (response.status === 401) {
          setSubmitError("Unauthorized: Make sure the /register endpoint is public.");
        } else {
          setSubmitError(result?.message || "Registration failed. Please try again.");
        }
      } catch (err) {
        console.error("Registration error:", err);
        setSubmitError("Registration failed. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };
  const handleGoogleLogin = () => {
      signIn("google", { callbackUrl: "/" });
    };
  
    // Store Google session data to localStorage once authenticated
    useEffect(() => {
      if (status === "authenticated" && session) {
        // Your backend token is in session.accessToken
        if (session.accessToken) {
          console.log("Storing Google session data to localStorage", session);
          localStorage.setItem("token", session.accessToken);
          localStorage.setItem("userId", session.userId || "");
          localStorage.setItem("email", session.email || "");
          localStorage.setItem("role", session.role || "");
          localStorage.setItem("firstName", session.firstName || "");
          localStorage.setItem("lastName", session.lastName || "");
        } else {
          console.warn("Session accessToken is missing");
        }
      }
    }, [status, session]);

 

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-around bg-white px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32">
      <div className="w-full lg:w-1/2 max-w-md py-8 space-y-4">
        <div className="flex justify-center mb-2">
          <img src="/images/auth/logo.jpg" alt="logo" className="w-[130px]" />
        </div>

        {submitError && (
          <p className="text-red-500 text-sm text-center mb-2">{submitError}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="flex items-center justify-between">
          <hr className="w-1/4 border-gray-300" />
          <span className="text-gray-400 text-sm">Or</span>
          <hr className="w-1/4 border-gray-300" />
        </div>
      <button
        type="button"
       onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-3 border border-gray-900 p-3 rounded-full hover:bg-gray-50 transition"
      >
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
