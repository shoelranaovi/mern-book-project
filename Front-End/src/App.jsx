import { Navbarmenu } from "./components/Navbar";
import ThemeProvider from "./components/ThemeProvider";

import Fotter from "./components/Fotter";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { SigninSuccess } from "./redux/userSlice";
import { summaryApi } from "./common";

function App() {
  const dispatch = useDispatch();
  async function auth() {
    try {
      const response = await fetch(summaryApi.userdetails.url, {
        credentials: "include",
      });
      const data = await response.json();
      dispatch(SigninSuccess(data.data));
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    auth();
  });
  return (
    <>
      <ThemeProvider>
        <Navbarmenu />
        <main className="min-h-[342px] pt-16 overflow-hidden">
          <Outlet />
        </main>
        <Fotter />
      </ThemeProvider>
      <ToastContainer />
    </>
  );
}

export default App;
