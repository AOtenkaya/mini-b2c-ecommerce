// utils/themeUtils.js
export const getThemeClasses = (theme) => {
  const isDark = theme === "dark"; // A variable to make the logic cleaner

  return {
    textColor: isDark ? "text-white" : "text-gray-900", // General text color
    bgColor: isDark ? "bg-gray-900" : "bg-white", // General background color
    darkerBgColor: isDark ? "bg-gray-900" : "bg-gray-100", // General background color
    sectionBackground: isDark
      ? "bg-gray-700 text-white"
      : "bg-gray-50 text-gray-900",
    cardBackground: isDark
      ? "bg-gray-800 text-white"
      : "bg-white text-gray-900",
    buttonColor: isDark
      ? "bg-orange-600 text-white"
      : "bg-orange-500 text-white", // Updated button color
    cartButtonColor: isDark
      ? "text-orange-500 hover:bg-gray-700"
      : "text-orange-600 hover:bg-gray-100",
    orangeTextColor: isDark ? "text-orange-400" : "text-orange-600", // Headings
    iconColor: isDark ? "text-gray-400" : "text-gray-600", // Icons
    borderColor: isDark ? "border-gray-600" : "border-gray-300", // Borders
    cardHover: isDark ? "hover:bg-gray-700" : "hover:bg-gray-200", // Card hover state
    disabledButton: isDark
      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
      : "bg-gray-200 text-gray-500 cursor-not-allowed", // Disabled button,
    input: isDark
      ? "bg-gray-700 text-white border-gray-600"
      : "bg-white text-gray-900 border-gray-300",
    priceColor: isDark ? "text-green-400" : "text-green-600",
    categorySelected: isDark
      ? "font-bold text-orange-400"
      : "font-bold text-orange-600",
    spinnerBorderColor: isDark ? "border-blue-500" : "border-blue-600",
    themeIcon: isDark ? "text-yellow-400" : "text-gray-800",
    themeButton: isDark
      ? "bg-gray-400 text-gray-800"
      : "bg-gray-200 text-gray-800",
  };
};
