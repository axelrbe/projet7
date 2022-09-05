import axios from "axios";
import { useEffect, useState } from "react";
import "./Delete.css";
import JwtService from "../../services/JwtService";

const Delete = ({ postId, post, _deletePost }) => {
  const [deletePost, setDeletePost] = useState([]);

  useEffect(() => {
    setDeletePost(_deletePost);
  }, [_deletePost]);

  const handleDelete = () => {
    const userId = JwtService.getTokenDecrypted().userId;
    axios
      .post(`http://localhost:3001/api/posts/${postId}`, { userId })
      .then((res) => {
        if (res.data.PostDeleted) {
          setDeletePost(post.filter((item) => item.id !== postId));
        }
      })
      .catch((err) => err.response.data);
  };

  return (
    <div>
      <button key={deletePost} className="delete_btn" onClick={handleDelete}>
        <i className="fa-solid fa-trash"></i>
      </button>
    </div>
  );
};

export default Delete;
