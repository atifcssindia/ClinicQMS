import React from "react";

const InputComponent = ({
  label,
  id,
  value,
  onChange,
  type = "text",
  placeholder = "",
  options = [],
  margin,
  fullWidth,
  SelectProps,
}) => {
  return (
    <div className={`mb-5  relative ${fullWidth ? "w-full" : ""}`}>
      <label
        htmlFor={id}
        className="absolute left-4 -top-3 text-gray-800 px-1.5 bg-white font-semibold text-[14px]"
      >
        {label}
      </label>

      {type === "select" ? (
        <select
          id={id}
          value={value}
          onChange={onChange}
          className="min-h-[45px] w-full px-5 outline-none border-2 border-gray-200 rounded-md focus:ring-blue-600 focus:border-blue-600"
          {...SelectProps}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          value={value}
          type={type}
          onChange={onChange}
          placeholder={placeholder}
          className="min-h-[45px] w-full px-5 outline-none border-2 border-gray-200 rounded-md focus:ring-blue-600 focus:border-blue-600"
        />
      )}
    </div>
  );
};

export default InputComponent;
