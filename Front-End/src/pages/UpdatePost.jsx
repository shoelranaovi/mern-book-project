import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Loder from "../components/Loder";

function Updatepost() {
  const location = useParams();

  const [fromdata, setFromdata] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });
  const [loading, setLoading] = useState(null);
  const { url, title, author, price, desc, language } = fromdata;

  const navigate = useNavigate();
  async function findbook() {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/book/getbooKbyid/${location.Id}`
      );
      const data = await response.json();
      const datatwo = data.data;

      setFromdata({
        ...fromdata,
        url: datatwo.url,
        title: datatwo.title,
        author: datatwo.author,
        price: datatwo.price,
        desc: datatwo.desc,
        language: datatwo.language,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    findbook();
  }, [location.Id]);

  function onchange(e) {
    setFromdata({ ...fromdata, [e.target.id]: e.target.value });
  }
  async function onsubmit(e) {
    e.preventDefault();
    setLoading(true);

    if (
      url === "" ||
      title === "" ||
      author === "" ||
      price === "" ||
      language === ""
    ) {
      toast.error("plz fill all the details");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/book/updatebook/${location.Id}`,
        {
          method: "put",
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(fromdata),
        }
      );
      const data = await response.json();
      console.log(data);
      setLoading(false);
      toast.success(data.message);
      navigate("/Dashboard?tab=allbooks");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }
  if (loading) {
    return <Loder />;
  }
  return (
    <div className="w-full min-h-64  pt-10 flex justify-center items-center  ">
      <div className="bg-gray-200 rounded-md dark:bg-zinc-700 min-w-[450px] px-10 pb-8 mb-4 ">
        <form>
          <div>
            <div className="m-2 block">
              <Label htmlFor="url" value="Image URL" />
            </div>
            <TextInput
              id="url"
              type="text"
              placeholder="Image URL"
              value={url}
              onChange={onchange}
              required
              shadow
            />
          </div>
          <div>
            <img src={url} />
          </div>
          <div>
            <div className="m-2 block">
              <Label htmlFor="title" value="Book title" />
            </div>
            <TextInput
              id="title"
              type="text"
              value={title}
              onChange={onchange}
              placeholder="A book title"
              required
              shadow
            />
          </div>
          <div className="max-w-md relative">
            <div className="mb-2 block">
              <Label htmlFor="author" value="Author" />
            </div>
            <TextInput
              id="author"
              value={author}
              type="text"
              onChange={onchange}
              className="cursor-pointer"
              placeholder="Type your Author"
              required
            />
          </div>
          <div className="max-w-md relative">
            <div className="mb-2 block">
              <Label htmlFor="price" value="Price" />
            </div>
            <TextInput
              id="price"
              value={price}
              type="number"
              onChange={onchange}
              className="cursor-pointer"
              placeholder="Type your price"
              required
            />
          </div>
          <div className="max-w-md relative">
            <div className="mb-2 block">
              <Label htmlFor="language" value="Language" />
            </div>
            <TextInput
              id="language"
              value={language}
              type="text"
              onChange={onchange}
              className="cursor-pointer"
              placeholder="Type your Language"
              required
            />
          </div>

          <div className="max-w-md">
            <div className="mb-2 block">
              <Label htmlFor="desc" value="Book Description" />
            </div>
            <Textarea
              id="desc"
              placeholder="Description"
              onChange={onchange}
              value={desc}
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
              className="px-4">
              {" "}
              Post Book
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Updatepost;
