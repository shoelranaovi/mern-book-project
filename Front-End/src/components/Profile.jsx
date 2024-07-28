import { Button, Label, Modal, Spinner, TextInput } from "flowbite-react";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { summaryApi } from "../common";
import { useNavigate } from "react-router-dom";
import { SigninSuccess } from "../redux/userSlice";

function Profile() {
  const currentuser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const { currentUser } = currentuser;
  const [openmodal, setModel] = useState(false);
  const [loading, setLoding] = useState(false);
  const [fromdata, setFromdata] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: "",
  });
  const navigate = useNavigate();
  const { username, email } = fromdata;

  console.log(fromdata);

  function onchange(e) {
    setFromdata({ ...fromdata, [e.target.id]: e.target.value });
  }
  async function updateUser() {
    setLoding(true);
    const response = await fetch(summaryApi.updateuser.url, {
      method: summaryApi.updateuser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(fromdata),
    });
    const data = await response.json();

    if (data.success) {
      setLoding(false);
      dispatch(SigninSuccess(data.data));
      toast.success(data.message);
      navigate("/");
    } else {
      setLoding(false);
      toast.success(data.message);
      navigate("/");
    }
  }

  return (
    <div className="flex flex-1 justify-center items-center min-w-[400px] md:w-[900px] m-6  rounded-xl ">
      <form className="flex w-full md:w-[500px] flex-col gap-4">
        <div className=" w-full flex justify-center items-center rounded-full ">
          <img className="w-28 h-28 rounded-full" src={currentUser.avatar} />
        </div>
        <div className=" w-full flex  justify-end items-center rounded-full ">
          <div onClick={() => setEdit(!edit)}>
            {edit ? <Button>Cancel</Button> : <Button>Edit</Button>}
          </div>
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput
            id="email"
            type="email"
            value={email}
            onChange={onchange}
            disabled={edit ? false : true}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username" value="User Name" />
          </div>
          <TextInput
            id="username"
            type="username"
            value={username}
            onChange={onchange}
            disabled={edit ? false : true}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput
            disabled={edit ? false : true}
            id="password"
            type="password"
            onChange={onchange}
          />
        </div>

        {edit && (
          <Button
            onClick={(e) => {
              e.preventDefault(), setModel(true);
            }}
            type="submit">
            Submit
          </Button>
        )}
      </form>
      <Modal show={openmodal} size="md" onClose={() => setModel(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to update profile?
            </h3>
            <div className="flex justify-center gap-4">
              <Button onClick={updateUser} color="failure">
                <div className=" flex gap-2">
                  {loading && (
                    <Spinner aria-label="Spinner button example" size="sm" />
                  )}
                  <p>{"Yes, I'm sure"}</p>
                </div>
              </Button>
              <Button color="gray" onClick={() => setModel(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Profile;
