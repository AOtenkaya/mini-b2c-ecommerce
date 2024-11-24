import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext"; // Import ThemeContext to access theme

const Loader = ({ message = "Loading..." }) => {
  const { theme } = useContext(ThemeContext); // Get the current theme from context

  // Determine the appropriate text color and spinner border based on theme
  const textColor = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const spinnerBorderColor =
    theme === "dark" ? "border-blue-500" : "border-blue-600";

  return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center">
        <div
          className={`animate-spin rounded-full h-16 w-16 border-t-4 ${spinnerBorderColor}`}
        />

        <p className={`mt-4 ${textColor} text-lg z-50`}>{message}</p>
      </div>
    </div>
  );
};

export default Loader;
