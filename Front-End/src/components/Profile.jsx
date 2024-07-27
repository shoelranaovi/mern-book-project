import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux";

function Profile() {
  const currentuser = useSelector((state) => state.user);
  const [edit, setEdit] = useState(false);
  const { currentUser } = currentuser;
  console.log(currentUser);
  return (
    <div className="flex flex-1 justify-center items-center min-w-[400px] md:w-[900px] m-6  rounded-xl ">
      <form className="flex w-full md:w-[500px] flex-col gap-4">
        <div className=" w-full flex justify-center items-center rounded-full ">
          <img className="w-28 h-28 rounded-full" src={currentUser.avatar} />
        </div>
        <div className=" w-full flex justify-end items-center rounded-full ">
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
            value={currentUser.email}
            disabled={edit ? false : true}
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username" value="User Name" />
          </div>
          <TextInput
            id="username"
            type="username"
            value={currentUser.username}
            disabled={edit ? false : true}
            required
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
            required
          />
        </div>

        {edit && <Button type="submit">Submit</Button>}
      </form>
    </div>
  );
}

export default Profile;
