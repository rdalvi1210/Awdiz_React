import axios from "axios";
import { useState } from "react";

const CreateBlog = () => {
  const [data, setData] = useState({
    author: "",
    title: "",
    content: "",
    imageUrl: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.author || !data.title || !data.content || !data.imageUrl) {
      alert("All fields are required");
      return;
    }

    await axios.post("/api/blog/createblog", data);

    alert("Blog Created");
    setData({
      author: "",
      title: "",
      content: "",
      imageUrl: "",
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create Blog</h1>

      <form onSubmit={handleSubmit} className="border p-4 rounded-lg bg-white">
        <input
          type="text"
          className="w-full border p-2 rounded mb-3"
          placeholder="Author"
          value={data.author}
          onChange={(e) => setData({ ...data, author: e.target.value })}
        />

        <input
          type="text"
          className="w-full border p-2 rounded mb-3"
          placeholder="Title"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />

        <input
          type="text"
          className="w-full border p-2 rounded mb-3"
          placeholder="Image URL"
          value={data.imageUrl}
          onChange={(e) => setData({ ...data, imageUrl: e.target.value })}
        />

        <textarea
          className="w-full border p-2 rounded mb-3 h-32"
          placeholder="Content"
          value={data.content}
          onChange={(e) => setData({ ...data, content: e.target.value })}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
