import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { summaryApi } from "../common";
import { useDispatch } from "react-redux";
import { SigninSuccess } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [fromdata, setFromdata] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { email, password } = fromdata;
  const [loading, setLoding] = useState(null);
  const [showpass, setshowpass] = useState(false);
  const dispatch = useDispatch();

  const onchange = (e) => {
    setFromdata({ ...fromdata, [e.target.id]: e.target.value });
  };

  const onsubmit = async (e) => {
    e.preventDefault();
    setLoding(true);
    if (!email || !password) {
      toast.error("provide your information");
      setLoding(false);
      return;
    }
    try {
      const response = await fetch(summaryApi.signin.url, {
        method: summaryApi.signin.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(fromdata),
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        setLoding(false);
        dispatch(SigninSuccess(data.data));
        navigate("/home");
      } else {
        toast.error(data.message);
        setLoding(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div className=" flex justify-center items-center w-full   pb-20 ">
      <div className="w-[550px] ml-12  ">
        <form className="flex  w-full max-w-md flex-col gap-4 ">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email"
              type="email"
              value={email}
              onChange={onchange}
              placeholder="sonmeting@gmail.com"
              required
            />
          </div>
          <div className="relative">
            <div className="mb-2 block">
              <Label htmlFor="password" value="Your password" />
            </div>
            <TextInput
              id="password"
              type={showpass ? "text" : "password"}
              onChange={onchange}
              value={password}
              required
            />
            <div
              className="absolute top-12 right-4"
              onClick={() => setshowpass(!showpass)}>
              {showpass ? <FaRegEye /> : <FaEyeSlash />}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <Button
            onClick={onsubmit}
            isProcessing={loading}
            className="w-28"
            type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signin;
