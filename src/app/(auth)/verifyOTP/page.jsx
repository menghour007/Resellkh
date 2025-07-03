'use client';

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';

export default function OTPVerification() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleResend = () => {
    if (timer <= 0) {
      setTimer(60);
      toast.success("OTP resent.");
      fetch("https://phil-whom-hide-lynn.trycloudflare.com/api/v1/auths/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
        .then(res => {
          if (!res.ok) throw new Error("Failed to resend OTP");
          return res.json();
        })
        .then(() => {
          toast.success(`OTP sent to ${email}`);
        })
        .catch(() => {
          toast.error("Failed to resend OTP. Please try again.");
        });
    } else {
      toast.error("Please wait for the timer to expire before resending.");
    }
  };

  const handleChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        const next = document.getElementById(`otp-${index + 1}`);
        if (next) next.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(paste)) {
      setOtp(paste.split(""));
      const lastInput = document.getElementById(`otp-5`);
      if (lastInput) lastInput.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        const prev = document.getElementById(`otp-${index - 1}`);
        if (prev) prev.focus();
      }
    }
  };

  const handleVerify = async () => {
  const code = otp.join("");

  if (code.length !== 6) {
    toast.error("Please enter all 6 digits.");
    return;
  }

  if (!email) {
    toast.error("Email is missing.");
    return;
  }

  try {
    setLoading(true);

    const res = await fetch("https://phil-whom-hide-lynn.trycloudflare.com/api/v1/auths/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp: code }),
    });

    const text = await res.text();  // read body once as text

    let data;
    try {
      data = JSON.parse(text);  // try parse as JSON
    } catch {
      data = { message: text };  // fallback to raw text message
    }

    if (!res.ok) throw new Error(data.message || "Verification failed");

    toast.success(`Verified ${email} successfully`, { position: "top-center" });
    router.push("/login");
  } catch (error) {
    toast.error(error.message || "Verification failed. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-white px-4 sm:px-8 md:px-12 lg:px-[170px] py-10 gap-10">
      {/* Left Illustration */}
      <div className="hidden md:flex lg:w-1/2 justify-between">
        <img
          src="/images/auth/verify OTP.jpg"
          alt="OTP Illustration"
          className="w-full max-w-[400px] h-auto"
        />
      </div>

      {/* OTP Form */}
      <div className="w-full lg:w-1/2 max-w-md text-center space-y-6">
        <div className="mx-auto flex items-center justify-center">
          {/* Icon SVG */}
          <svg width="71" height="70" viewBox="0 0 71 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* (SVG content here – keep as is) */}
          </svg>
        </div>

        <h2 className="text-2xl font-bold">OTP Verification</h2>
        <p className="text-gray-600 text-sm">
          Enter the OTP sent to{" "}
          <span className="text-orange-500 font-medium break-words">{email || "your email"}</span>
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              id={`otp-${idx}`}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              onPaste={idx === 0 ? handlePaste : undefined}
              className="w-12 h-12 border-b-2 text-center text-xl outline-none focus:border-orange-500 transition"
            />
          ))}
        </div>

        <p className="text-orange-500 text-sm font-medium">
          {timer > 0 ? `00:${String(timer).padStart(2, "0")}` : "Expired"}
        </p>

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full py-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        <p className="text-sm text-gray-600">
          Didn’t receive the OTP?{" "}
          <button
            onClick={handleResend}
            className="font-semibold text-orange-500 hover:underline disabled:opacity-50"
          >
            Resend OTP
          </button>
        </p>
      </div>
    </div>
  );
}
