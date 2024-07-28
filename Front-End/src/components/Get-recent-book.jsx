import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loder from "./Loder";
import { summaryApi } from "../common";

function GetRecentBook() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loding, setloding] = useState(true);

  async function fatchdata() {
    try {
      setloding(true);
      const response = await fetch(summaryApi.getRecentBook.url);
      const data = await response.json();
      setData(data.data);

      setloding(false);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fatchdata();
  }, []);
  if (loding) {
    return <Loder />;
  }

  return (
    <div>
      <div className="flex w-full justify-center p-4 text-2xl">
        <h1 className="border p-2 bg-zinc-300 dark:bg-zinc-500">Recent Book</h1>
      </div>
      <div className="flex mb-8 gap-6 justify-center flex-wrap  items-center">
        {data?.map((item) => (
          <div
            onClick={() => navigate(`/book/${item._id}`)}
            key={item._id}
            className="w-72 h-96  bg-zinc-800 flex justify-center items-center flex-col p-3 gap-4 cursor-pointer">
            <div className=" bg-zinc-500 w-64 h-64 flex justify-center items-center">
              <img src={item.url} className="w-56 h-60 bg-zinc-500" />
            </div>
            <div className="details">
              <h1 className=" text-gray-100 text-2xl">{item.title} </h1>
              <p className="text-gray-400">Price: {item.price} </p>
              <p className="text-gray-400">Author: {item.author} </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GetRecentBook;
