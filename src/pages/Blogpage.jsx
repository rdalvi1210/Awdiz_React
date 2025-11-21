import { useEffect, useState } from "react";
import api from "../axios/AxiosInstance";

export default function App() {
  const [blogs, setBlogs] = useState([]);
  const [comments, setComments] = useState([]);

  const [blogForm, setBlogForm] = useState({
    author: "",
    title: "",
    content: "",
    imageUrl: "",
  });

  const [commentAuthor, setCommentAuthor] = useState("");
  const [commentMsg, setCommentMsg] = useState("");
  const [activeBlogId, setActiveBlogId] = useState(null);

  const [replyName, setReplyName] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [activeCommentId, setActiveCommentId] = useState(null);

  const loadData = async () => {
    const res = await api.get("/blogs/all");
    setBlogs(res.data.blogs);
    setComments(res.data.comments);
  };

  useEffect(() => {
    loadData();
  }, []);

  const createBlog = async (e) => {
    e.preventDefault();
    await api.post("/blogs/create", blogForm);
    setBlogForm({ author: "", title: "", content: "", imageUrl: "" });
    loadData();
  };

  const addComment = async (blogId) => {
    await api.post("/blogs/comment", {
      blogId,
      author: commentAuthor,
      message: commentMsg,
      parentId: null,
    });

    setCommentAuthor("");
    setCommentMsg("");
    setActiveBlogId(null);
    loadData();
  };

  const addReply = async (parentId) => {
    await api.post("/blogs/comment", {
      blogId: activeBlogId,
      author: replyName,
      message: replyMessage,
      parentId,
    });

    setReplyName("");
    setReplyMessage("");
    setActiveCommentId(null);
    loadData();
  };

  const renderReplies = (commentId, level = 1) => {
    return comments
      .filter((c) => c.parentId === commentId)
      .map((reply) => (
        <div
          key={reply._id}
          style={{
            marginLeft: level * 20,
            marginTop: 10,
            paddingLeft: 10,
          }}
        >
          {/* Reply block */}
          <div
            style={{
              display: "flex",
              alignItems: "start",
            }}
          >
            <div style={{ marginRight: "10px" }}>
              <b>{reply.author}</b>
              <p>{reply.message}</p>
            </div>

            <button
              onClick={() => {
                setActiveCommentId(reply._id);
                setActiveBlogId(reply.blogId);
              }}
            >
              Reply
            </button>
          </div>

          {/* Reply Form */}
          {activeCommentId === reply._id && (
            <div style={{ marginTop: 10, marginLeft: 10 }}>
              <input
                placeholder="Your Name"
                value={replyName}
                onChange={(e) => setReplyName(e.target.value)}
              />
              <br />
              <input
                placeholder="Reply..."
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
              />
              <br />
              <button onClick={() => addReply(reply._id)}>Send Reply</button>
            </div>
          )}

          {/* Recursive replies */}
          {renderReplies(reply._id, level + 1)}
        </div>
      ));
  };

  const getCommentsForBlog = (blogId) =>
    comments.filter((c) => c.blogId === blogId && c.parentId === null);

  return (
    <div style={{ width: "700px", margin: "20px auto" }}>
      <h1>Blogs</h1>

      <h2>Create Blog</h2>
      <form onSubmit={createBlog}>
        <input
          placeholder="Author"
          value={blogForm.author}
          onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
        />
        <br />

        <input
          placeholder="Title"
          value={blogForm.title}
          onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
        />
        <br />

        <input
          placeholder="Image URL"
          value={blogForm.imageUrl}
          onChange={(e) =>
            setBlogForm({ ...blogForm, imageUrl: e.target.value })
          }
        />
        <br />

        <textarea
          placeholder="Content"
          rows={5}
          style={{ width: "100%" }}
          value={blogForm.content}
          onChange={(e) =>
            setBlogForm({ ...blogForm, content: e.target.value })
          }
        ></textarea>
        <br />

        <button type="submit">Create Blog</button>
      </form>

      <hr />

      <h2>All Blogs</h2>

      {blogs.map((b) => (
        <div
          key={b._id}
          style={{
            border: "1px solid black",
            padding: 10,
            marginBottom: 20,
          }}
        >
          <img
            src={b.imageUrl}
            alt=""
            style={{ width: "200px", height: "120px", objectFit: "cover" }}
          />

          <h3>{b.title}</h3>
          <small>By {b.author}</small>
          <p>{b.content}</p>

          <button onClick={() => setActiveBlogId(b._id)}>Add Comment</button>

          {activeBlogId === b._id && (
            <div style={{ marginTop: 10 }}>
              <input
                placeholder="Your Name"
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
              />
              <br />

              <textarea
                placeholder="Write comment..."
                style={{ width: "100%" }}
                value={commentMsg}
                onChange={(e) => setCommentMsg(e.target.value)}
              ></textarea>

              <button onClick={() => addComment(b._id)}>Submit Comment</button>
            </div>
          )}

          <h4>Comments</h4>

          {getCommentsForBlog(b._id).map((c) => (
            <div key={c._id} style={{ marginBottom: 20 }}>
              {/* Comment Block */}
              <div
                style={{
                  display: "flex",
                  alignItems: "start",
                }}
              >
                <div style={{ marginRight: "10px" }}>
                  <b>{c.author}</b>
                  <p>{c.message}</p>
                </div>

                <button
                  onClick={() => {
                    setActiveCommentId(c._id);
                    setActiveBlogId(b._id);
                  }}
                >
                  Reply
                </button>
              </div>

              {/* Reply Form for top-level comment */}
              {activeCommentId === c._id && (
                <div style={{ marginTop: 10, marginLeft: 10 }}>
                  <input
                    placeholder="Your Name"
                    value={replyName}
                    onChange={(e) => setReplyName(e.target.value)}
                  />
                  <br />
                  <input
                    placeholder="Reply..."
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                  />
                  <br />
                  <button onClick={() => addReply(c._id)}>Send Reply</button>
                </div>
              )}

              {renderReplies(c._id)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
