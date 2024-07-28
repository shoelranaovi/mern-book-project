import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { summaryApi } from "../common";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [showpass, setShoePass] = useState("false");
  const [fromdata, setFromdata] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    address: "",
  });
  const [loading, setLoading] = useState(null);
  const { username, email, password, confirmpassword, address } = fromdata;

  const navigate = useNavigate();
  function onchange(e) {
    setFromdata({ ...fromdata, [e.target.id]: e.target.value });
  }
  async function onsubmit(e) {
    e.preventDefault();
    setLoading(true);
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmpassword === "" ||
      address === ""
    ) {
      toast.error("plz fill all the details");
      setLoading(false);
      return;
    }
    if (username !== username.toLowerCase()) {
      toast.error("username Must be Lowercase");
      setLoading(false);
      return;
    }
    if (!email.match(pattern)) {
      toast.error("provide a valid email");
      setLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast.error("password not match");
      setLoading(false);
      return;
    }
    try {
      const resonse = await fetch(summaryApi.sigup.url, {
        method: summaryApi.sigup.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(fromdata),
      });
      const data = await resonse.json();
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        setLoading(false);
        navigate("/login");
      } else {
        toast.error(data.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  }
  return (
    <div className="w-full min-h-64  pt-10 flex justify-center items-center  ">
      <div className="bg-gray-200 rounded-md dark:bg-zinc-700 min-w-[450px] px-10 pb-8 mb-4 ">
        <form>
          <div>
            <div className="m-2 block">
              <Label htmlFor="username" value="Username" />
            </div>
            <TextInput
              id="username"
              type="text"
              placeholder="username"
              value={username}
              onChange={onchange}
              required
              shadow
            />
          </div>
          <div>
            <div className="m-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput
              id="email"
              type="email"
              value={email}
              onChange={onchange}
              placeholder="someting@gmail.com"
              required
              shadow
            />
          </div>
          <div className="max-w-md relative">
            <div className="mb-2 block">
              <Label htmlFor="Password" value="Password" />
            </div>
            <TextInput
              id="password"
              value={password}
              type={showpass ? "text" : "password"}
              onChange={onchange}
              className="cursor-pointer"
              placeholder="Type your password"
              required
            />
            <div
              className="absolute top-12 right-5 cursor-pointer "
              onClick={() => setShoePass(!showpass)}>
              {showpass ? <FaRegEye /> : <FaEyeSlash />}
            </div>
          </div>
          <div className="max-w-md relative">
            <div className="mb-2 block">
              <Label htmlFor="confirmPassword" value="Confirm Password" />
            </div>
            <TextInput
              id="confirmpassword"
              type={showpass ? "text" : "password"}
              className="cursor-pointer"
              value={confirmpassword}
              onChange={onchange}
              placeholder="Confirm  your password"
              required
            />
            <div
              className="absolute top-12 right-5 cursor-pointer "
              onClick={() => setShoePass(!showpass)}>
              {showpass ? <FaRegEye /> : <FaEyeSlash />}
            </div>
          </div>
          <div className="max-w-md">
            <div className="mb-2 block">
              <Label htmlFor="Address" value="Your Address" />
            </div>
            <Textarea
              id="address"
              placeholder="Type your address..."
              onChange={onchange}
              value={address}
              required
              rows={4}
              spellCheck="false"
            />
          </div>

          <div className="w-full mt-5 flex justify-center items-center">
            <Button
              type="submit"
              onClick={onsubmit}
              size="md"
              isProcessing={loading}
              gradientDuoTone="purpleToBlue"
              className="w-[100px]">
              {" "}
              Signup
            </Button>
          </div>
          <div className="text-center mt-2">OR</div>
          <div>
            Already Have an Account ? <Link to={"/login"}>Log In </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
