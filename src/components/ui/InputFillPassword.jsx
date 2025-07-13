import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

export default function InputFillPassword({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder = "",
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm text-gray-900 mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required
          className="w-full border h-[45px] rounded-full border-gray-900 px-4 pr-12 py-2 text-sm focus:outline-none focus:border-orange-400 placeholder-gray-500 placeholder:text-[13px]"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl"
        >
          {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
        </button>
      </div>
    </div>
  );
}
