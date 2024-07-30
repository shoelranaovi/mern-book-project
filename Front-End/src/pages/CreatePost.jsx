import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";

import { summaryApi } from "../common";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CreatePost() {
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
  console.log(fromdata);

  const navigate = useNavigate();
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
      const resonse = await fetch(summaryApi.addbook.url, {
        method: summaryApi.addbook.method,
        credentials: "include",
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
        navigate("/Dashboard?tab=allbooks");
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

export default CreatePost;
