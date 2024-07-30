import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { MdFavoriteBorder } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa";
import Loder from "../components/Loder";

function Book() {
  const location = useParams();
  const [book, setBook] = useState();
  console.log(book);
  const [loading, setLoading] = useState(true);

  async function findbook() {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/book/getbooKbyid/${location.id}`
      );
      const data = await response.json();

      setBook(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    findbook();
  }, [location.id]);
  if (loading) {
    return <Loder />;
  }

  return (
    <div className=" w-full h-full md:flex m-8 ">
      <div className=" w-full md:w-[50%] flex  justify-center items-center bg-zinc-900">
        {" "}
        <div className=" w-[90%] p-4 flex justify-center items-center  ">
          {" "}
          <img src={book.url} className="w-[400px] h-[450px]  " />
        </div>
        <div className=" pr-14  ">
          <div className="flex  gap-4 flex-col">
            <MdFavoriteBorder size={35} />
            <FaCartArrowDown size={35} />
          </div>
        </div>
      </div>
      <div className="book-right flex w-[400px] md:w-[600px]  p-4">
        <div>
          <div className="flex gap-2">
            <h1 className="font-bold text-gray-500"> Book Title : </h1>{" "}
            <p> {book.title}</p>
          </div>
          <div className="flex gap-2">
            <h1 className="font-bold text-gray-500"> Author Name: </h1>{" "}
            <p> {book.author}</p>
          </div>
          <div className="flex gap-2">
            <h1 className="font-bold text-gray-500"> Language: </h1>{" "}
            <p> {book.language}</p>
          </div>
          <div className="flex gap-2">
            <h1 className="font-bold text-gray-500"> Price: </h1>{" "}
            <p className="text-green-300"> ${book.price}</p>
          </div>
          <div className="flex gap-2">
            <h1 className="font-bold text-gray-500"> Description: </h1>{" "}
            <p className=""> {book.desc} </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Book;
