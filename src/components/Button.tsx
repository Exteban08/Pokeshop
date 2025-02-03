import React from "react";
import { useTheme } from "../context/useTheme";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button = ({ children, className, ...props }: ButtonProps) => {
  const { theme } = useTheme();

  const baseStyles = "flex justify-center items-center rounded-md font-medium transition-colors";

  const themeStyles =
    theme === "dark"
      ? "bg-gray-700 text-white hover:bg-gray-600"
      : "bg-blue-500 text-white hover:bg-blue-600";

  return (
    <button className={`cursor-pointer ${baseStyles} ${themeStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
