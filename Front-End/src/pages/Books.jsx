import { useEffect, useState } from "react";
import { summaryApi } from "../common";
import { toast } from "react-toastify";
import { MdFavoriteBorder } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa";
import Loder from "../components/Loder";
import { useNavigate } from "react-router-dom";

function Books() {
  const [book, setbook] = useState();
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  console.log(book);
  async function getAllBook() {
    setloading(true);

    try {
      const response = await fetch(summaryApi.getallbook.url, {
        credentials: "include",
      });
      const data = await response.json();

      setbook(data.data);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
      toast.error(error.massage);
    }
  }
  useEffect(() => {
    getAllBook();
  }, []);

  if (loading) {
    return <Loder />;
  }
  return (
    <div className=" flex w-full h-auto justify-center gap-4 flex-wrap items-center m-2">
      {book?.map((item, i) => (
        <div
          key={i}
          className="w-[220px]  h-[300px] bg-zinc-600"
          onClick={() => navigate(`/book/${item._id}`)}>
          <div className="flex justify-start items-center w-full  ">
            <img src={item.url} className="p-2 w-[180px] h-[200px] " />

            <div className="flex  gap-4 flex-col">
              <MdFavoriteBorder size={35} />
              <FaCartArrowDown size={35} />
            </div>
          </div>
          <div className="details ml-4">
            <h1 className=" text-gray-100 text-2xl">{item.title} </h1>
            <p className="text-gray-400">
              Price: <span className="text-gray-950">${item.price}</span>{" "}
            </p>
            <p className="text-gray-400">Author: {item.author} </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Books;
