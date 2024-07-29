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
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import Loder from "./Loder";

function AllBooks() {
  const [book, setbook] = useState();
  const [showModal, setShowmodal] = useState(false);
  const [loading, setloading] = useState(false);
  const [postidfordelete, setpostidfordelete] = useState("");
  const [postload, setpostLoad] = useState(false);
  console.log(postidfordelete);
  async function getAllBook() {
    setpostLoad(true);
    try {
      const response = await fetch(summaryApi.getallbook.url, {
        credentials: "include",
      });
      const data = await response.json();

      setbook(data.data);
      setpostLoad(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllBook();
  }, []);
  const handleDeletePost = async () => {
    setloading(true);
    setShowmodal(false);
    try {
      const res = await fetch(
        `http://localhost:8080/api/book/deletepost/${postidfordelete}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setloading(false);
        console.log(data.message);
      } else {
        setbook((prev) => prev.filter((post) => post._id !== postidfordelete));
        console.log(data);
        setloading(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  if (postload) {
    return <Loder />;
  }

  return (
    <div className="overflow-x-auto m-5 mb-8 md:w-[70vw]  md:mt-7 ">
      <Table hoverable>
        <TableHead>
          <TableHeadCell>SL</TableHeadCell>
          <TableHeadCell>Image</TableHeadCell>
          <TableHeadCell>Title</TableHeadCell>
          <TableHeadCell>Author</TableHeadCell>
          <TableHeadCell>Update Date</TableHeadCell>
          <TableHeadCell>
            <span className="">Action</span>
          </TableHeadCell>
          <TableHeadCell>
            <span className="sr-only">Edit</span>
          </TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {book?.map((item, i) => (
            <TableRow
              key={i}
              className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell>{i + 1}</TableCell>
              <TableCell>
                <img className="w-10 h-5" src={item.url} />{" "}
              </TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.author}</TableCell>
              <TableCell>
                {new Date(item.updatedAt).toLocaleDateString()}{" "}
              </TableCell>
              <TableCell>
                <Link className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                  Edit
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  onClick={() => {
                    setpostidfordelete(item._id);
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
                <div onClick={handleDeletePost} className=" flex gap-2">
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
    </div>
  );
}

export default AllBooks;
