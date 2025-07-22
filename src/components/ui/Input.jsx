import React from "react";

export const Input = ({
  label,
  icon,
  className = "",
  ...props
}) => (
  <div className={`relative ${className}`}>
    {label && (
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
    )}
    <input
      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#177245]"
      {...props}
    />
    {icon && (
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        {icon}
      </span>
    )}
  </div>
);