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

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

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

  

const handleVerify = async () => {
  const code = otp.join("");
  if (code.length !== 6) {
    toast.error("Please enter all 6 digits.");
    return;
  }

  try {
    // Simulate server verification delay
    await new Promise((r) => setTimeout(r, 500));

    toast.success(`Verified ${email} successfully`, { position: "top-center" });
    router.push("/reset-password"); // Redirect after success
  } catch (error) {
    toast.error("Verification failed. Please try again.");
  }
};


  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-white px-4 sm:px-8 md:px-12 lg:px-[210px] py-12 gap-10">
      {/* Left - Image (Hidden on Mobile) */}
      <div className="hidden md:flex lg:w-1/2 justify-between">
        <img
          src="/images/auth/verify OTP.jpg"
          alt="OTP Illustration"
          className="w-full max-w-[400px] h-auto"
        />
      </div>

      {/* Right - OTP Form */}
      <div className="w-full lg:w-1/2 max-w-md text-center space-y-6">
        {/* Icon */}

        <div className="mx-auto  flex items-center justify-center">

          <svg width="71" height="70" viewBox="0 0 71 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M45.4691 16.4587C45.0668 15.816 44.4742 15.3147 43.7737 15.0246C43.0732 14.7344 42.2996 14.6699 41.5607 14.84L36.3166 16.0446C35.7791 16.1681 35.2207 16.1681 34.6832 16.0446L29.4391 14.84C28.7002 14.6699 27.9266 14.7344 27.2261 15.0246C26.5256 15.3147 25.933 15.816 25.5307 16.4587L22.6724 21.0204C22.3807 21.4871 21.987 21.8808 21.5203 22.1754L16.9586 25.0337C16.317 25.4356 15.8164 26.0273 15.5264 26.7266C15.2363 27.4259 15.1711 28.1982 15.3399 28.9362L16.5445 34.1862C16.6676 34.7227 16.6676 35.2801 16.5445 35.8167L15.3399 41.0637C15.1705 41.8022 15.2353 42.5751 15.5254 43.275C15.8155 43.9749 16.3165 44.5671 16.9586 44.9692L21.5203 47.8275C21.987 48.1192 22.3807 48.5129 22.6753 48.9796L25.5336 53.5412C26.3561 54.8567 27.9253 55.5071 29.4391 55.16L34.6832 53.9554C35.2207 53.8319 35.7791 53.8319 36.3166 53.9554L41.5636 55.16C42.3021 55.3294 43.075 55.2646 43.7749 54.9745C44.4748 54.6844 45.067 54.1834 45.4691 53.5412L48.3274 48.9796C48.6191 48.5129 49.0128 48.1192 49.4795 47.8275L54.0441 44.9692C54.6863 44.5665 55.187 43.9737 55.4766 43.2732C55.7662 42.5727 55.8303 41.7994 55.6599 41.0608L54.4582 35.8167C54.3347 35.2792 54.3347 34.7208 54.4582 34.1833L55.6628 28.9362C55.8325 28.1981 55.7681 27.4254 55.4785 26.7255C55.189 26.0256 54.6886 25.4333 54.047 25.0308L49.4824 22.1725C49.0164 21.8803 48.6225 21.4864 48.3303 21.0204L45.4691 16.4587ZM44.002 28.4958C44.1824 28.1641 44.2271 27.7753 44.1267 27.4113C44.0263 27.0473 43.7886 26.7364 43.4636 26.5441C43.1387 26.3518 42.7518 26.293 42.3844 26.3801C42.0169 26.4672 41.6976 26.6935 41.4936 27.0112L33.8666 39.9204L29.2611 35.5104C29.1245 35.3701 28.961 35.2588 28.7804 35.183C28.5999 35.1073 28.4059 35.0687 28.21 35.0696C28.0142 35.0704 27.8206 35.1107 27.6407 35.188C27.4607 35.2653 27.2982 35.3781 27.1628 35.5196C27.0274 35.661 26.9219 35.8283 26.8526 36.0115C26.7832 36.1946 26.7515 36.3898 26.7592 36.5855C26.7669 36.7812 26.814 36.9733 26.8976 37.1504C26.9812 37.3275 27.0996 37.4859 27.2457 37.6162L33.1782 43.3008C33.337 43.4526 33.528 43.5666 33.737 43.6343C33.9461 43.7019 34.1676 43.7215 34.3853 43.6915C34.6029 43.6614 34.8109 43.5827 34.9938 43.461C35.1767 43.3393 35.3298 43.1779 35.4416 42.9887L44.002 28.4958Z" fill="#F1641E" />
          </svg>
        </div>

        {/* Title & Email */}
        <h2 className="text-2xl font-bold">OTP Verification</h2>
        <p className="text-gray-600 text-sm">
          Enter the OTP sent to{" "}
          <span className="text-orange-500 font-medium break-words">
            {email || "leackhena@gmail.com"}
          </span>
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
              className="w-12 h-12 border-b-2 text-center text-xl outline-none focus:border-orange-500 transition"
            />
          ))}
        </div>

        {/* Timer */}
        <p className="text-orange-500 text-sm font-medium">
          {timer > 0 ? `00:${String(timer).padStart(2, "0")}` : "Expired"}
        </p>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          className="w-full py-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition"
        >
          Verify
        </button>

        {/* Resend Link */}
        <p className="text-sm text-gray-600">
          Didn’t receive the OTP?{" "}
          <button
            onClick={() => setTimer(60)}
            className="font-semibold text-orange-500 hover:underline"
          >
            Resend OTP
          </button>
        </p>
      </div>
    </div>
  );
}
