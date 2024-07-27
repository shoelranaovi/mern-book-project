import { useSelector } from "react-redux";

/* eslint-disable react/prop-types */
function ThemeProvider({ children }) {
  const themedata = useSelector((state) => state.theme);
  return (
    <div className={themedata.theme}>
      <div className="bg-gray-100 text-gray-700 dark:bg-[rgb(16,23,42)] dark:text-gray-200 min-h-screen">
        {children}
      </div>
    </div>
  );
}

export default ThemeProvider;
