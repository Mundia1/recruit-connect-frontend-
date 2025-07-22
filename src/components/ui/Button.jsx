import React from "react";

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center font-semibold rounded transition focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-[#177245] text-white hover:bg-green-700",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
  };
  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${base} ${variants[variant] || ""} ${sizes[size] || ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};