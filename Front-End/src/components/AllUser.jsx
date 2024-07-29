import { useEffect, useState } from "react";
import { summaryApi } from "../common";
import {
  Button,
  Modal,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import Loder from "./Loder";

function AllUser() {
  const [user, setuser] = useState();
  const [showModal, setShowmodal] = useState(false);
  const [showedit, setshowedit] = useState(false);
  const [loading, setloading] = useState(false);
  const [loading2, setloading2] = useState(false);
  const [useridfordelete, setuseridfordelete] = useState("");
  const [useridforupdate, setuseridforupdate] = useState("");
  const [postload, setpostLoad] = useState(false);
  console.log(user);
  const [role, setrole] = useState({});
  console.log(role, useridforupdate);
  async function getalluser() {
    setpostLoad(true);
    try {
      const response = await fetch(summaryApi.getalluser.url, {
        credentials: "include",
      });
      const data = await response.json();

      setuser(data.data);
      setpostLoad(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getalluser();
  }, []);
  const handledeleteuser = async () => {
    setloading(true);
    setShowmodal(false);
    try {
      const res = await fetch(
        `http://localhost:8080/api/deleteuser/${useridfordelete}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setloading(false);

        toast.error(data.message);
      } else {
        setuser((prev) => prev.filter((post) => post._id !== useridfordelete));
        console.log(data);
        setloading(false);
        toast.success(data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  function onchangerole(e) {
    setrole({ [e.target.id]: e.target.value });
  }
  async function changeuserrole() {
    setloading2(true);
    const response = await fetch(
      `http://localhost:8080/api//updateuserrole/${useridforupdate}`,
      {
        method: "Put",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(role),
      }
    );
    const data = await response.json();
    console.log(data);

    if (data.success) {
      toast.success(data.message);
      setshowedit(false);
      setloading2(false);
      await getalluser();
    } else {
      toast.success(data.message);
      setloading2(false);
    }
  }
  if (postload) {
    return <Loder />;
  }

  return (
    <div className="overflow-x-auto m-5 mb-8 md:w-[70vw]  md:mt-7 ">
      <Table hoverable>
        <TableHead>
          <TableHeadCell>SL</TableHeadCell>
          <TableHeadCell>Image</TableHeadCell>
          <TableHeadCell>UserName</TableHeadCell>
          <TableHeadCell>Role</TableHeadCell>
          <TableHeadCell>Update Date</TableHeadCell>
          <TableHeadCell>
            <span className="">Action</span>
          </TableHeadCell>
          <TableHeadCell>
            <span className="sr-only">Edit</span>
          </TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {user?.map((item, i) => (
            <TableRow
              key={i}
              className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell>{i + 1}</TableCell>
              <TableCell>
                <img className="w-10 h-8 rounded-full" src={item.avatar} />{" "}
              </TableCell>
              <TableCell>{item.username}</TableCell>
              <TableCell>{item.role}</TableCell>

              <TableCell>
                {new Date(item.updatedAt).toLocaleDateString()}{" "}
              </TableCell>
              <TableCell>
                <Link
                  onClick={() => {
                    setshowedit(true);
                    setuseridforupdate(item._id);
                  }}
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                  Edit
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  onClick={() => {
                    setuseridfordelete(item._id);
                    setShowmodal(true);
                  }}
                  className="font-medium text-red-400 hover:underline">
                  Delete
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal
        show={showModal}
        size="md"
        onClose={() => setShowmodal(false)}
        popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to update profile?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure">
                <div onClick={handledeleteuser} className=" flex gap-2">
                  {loading && (
                    <Spinner aria-label="Spinner button example" size="sm" />
                  )}
                  <p>{"Yes, I'm sure"}</p>
                </div>
              </Button>
              <Button color="gray" onClick={() => setShowmodal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={showedit} size="md" onClose={() => setshowedit(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <div className="flex gap-3 w-full justify-center items-center p-4">
              <label htmlFor="">Role</label>
              <select name="role" id="role" onChange={onchangerole}>
                <option value="Admin"> {null} </option>
                <option value="Admin"> Admin</option>
                <option value="User"> User</option>
              </select>
            </div>
            <div className="flex justify-center gap-4">
              <Button color="failure">
                <div onClick={changeuserrole} className=" flex gap-2">
                  {loading2 && (
                    <Spinner aria-label="Spinner button example" size="sm" />
                  )}
                  <p>{"Yes, I'm sure"}</p>
                </div>
              </Button>
              <Button color="gray" onClick={() => setshowedit(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AllUser;
