import React, { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext"; // Import ThemeContext

const Loader = ({ message = "Loading..." }) => {
  const { theme } = useContext(ThemeContext); // Get current theme

  // Use Tailwind's utility classes for dynamic theming
  const textColor = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const spinnerBorderColor =
    theme === "dark" ? "border-blue-500" : "border-blue-600";

  return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center">
        <div
          className={`animate-spin rounded-full h-16 w-16 border-t-4 ${spinnerBorderColor}`}
        />
        <p className={`mt-4 ${textColor} text-lg`}>{message}</p>
      </div>
    </div>
  );
};

export default Loader;
