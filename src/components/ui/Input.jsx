
export default function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder = "",
}) {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm text-gray-900 mb-1">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required
        className="w-full border h-[45px] rounded-full border-gray-900 px-3 py-2 text-sm focus:outline-none focus:border-orange-400 placeholder-gray-500 placeholder:text-[13px]"
      />
    </div>
  );
}
