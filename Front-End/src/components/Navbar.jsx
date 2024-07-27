/* eslint-disable react/no-unescaped-entities */
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";

import { FaRegMoon } from "react-icons/fa6";
import { IoMdSunny } from "react-icons/io";
import logo from "../assets/book-and-pen-svgrepo-com.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../redux/themeSlice";
import { summaryApi } from "../common";
import { toast } from "react-toastify";
import { SigninSuccess } from "../redux/userSlice";

export function Navbarmenu() {
  const navigate = useNavigate();
  const data = useSelector((state) => state.theme);
  const user = useSelector((state) => state.user);

  const { currentUser } = user;
  console.log(currentUser);
  const dispatch = useDispatch();
  async function signout() {
    console.log("hlw");
    const response = await fetch(summaryApi.signout.url, {
      method: summaryApi.signout.method,
      credentials: "include",
    });
    const data = await response.json();
    console.log(data);
    toast.success(data.message);
    navigate("/home");
    dispatch(SigninSuccess(null));
  }

  return (
    <Navbar className=" flex  rounded w-full fixed z-30   ">
      <NavbarBrand className="">
        <img src={logo} className="w-10 text-blue-50" />

        <h1 className="text-2xl font-bold ">Ovi's Book</h1>
      </NavbarBrand>

      <div className="flex gap-2 md:order-2  dark:text-gray-950">
        <Button
          outline
          pill
          className="outline-none "
          onClick={() => dispatch(setTheme())}>
          {data.theme === "dark" ? (
            <IoMdSunny size={20} />
          ) : (
            <FaRegMoon size={20} />
          )}
        </Button>

        {currentUser ? (
          <div className="flex gap-3">
            <Link to={"Dashboard?tab=profile"}>
              <Button outline>Profile</Button>
            </Link>
            <Button onClick={signout} gradientDuoTone="purpleToPink">
              Sign Out
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button
              outline
              gradientDuoTone="purpleToBlue"
              onClick={() => navigate("/login")}>
              {" "}
              Login
            </Button>
            <Button
              className="bg-transparent"
              gradientDuoTone="purpleToPink"
              onClick={() => navigate("/signup")}>
              {" "}
              SignUp
            </Button>
          </div>
        )}
        <NavbarToggle />
      </div>

      <NavbarCollapse>
        <NavbarLink as={"div"} onClick={() => navigate("/home")} active>
          Home
        </NavbarLink>
        <NavbarLink
          className="cursor-pointer"
          onClick={() => navigate("/About")}>
          About us
        </NavbarLink>
        <Link to={"/Books"}>
          <NavbarLink as={"div"}>All book</NavbarLink>
        </Link>
      </NavbarCollapse>
    </Navbar>
  );
}
