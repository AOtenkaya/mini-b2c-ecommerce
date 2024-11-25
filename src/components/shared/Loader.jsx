import React, { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext"; // Import ThemeContext
import { getThemeClasses } from "@/utils/themeUtils"; // Import centralized theming utility

const Loader = ({ message = "Loading..." }) => {
  const { theme } = useContext(ThemeContext); // Get current theme
  const themeClasses = getThemeClasses(theme); // Get theme-based classes

  return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center">
        <div
          className={`animate-spin rounded-full h-16 w-16 border-t-4 ${themeClasses.spinnerBorder}`}
        />
        <p className={`mt-4 ${themeClasses.textColor} text-lg`}>{message}</p>
      </div>
    </div>
  );
};

export default Loader;
