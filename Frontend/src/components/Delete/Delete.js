import axios from "axios";
import { useEffect, useState } from "react";
import "./Delete.css";
import JwtService from "../../services/JwtService";

const Delete = ({ postId, post }) => {
  const [deletePost, setDeletePost] = useState([]);
  let postDeleted;

  const handleDelete = () => {
    const userId = JwtService.getTokenDecrypted().userId;
    axios
      .post(`http://localhost:3001/api/posts/${postId}`, { userId })
      .then(() => {
        alert("Votre post à bien été supprimé !");
        postDeleted = post.filter((item) => item.id !== postId);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setDeletePost(postDeleted);
  }, [postDeleted]);

  return (
    <div>
      <button key={deletePost} className="delete_btn" onClick={handleDelete}>
        <i className="fa-solid fa-trash"></i>
      </button>
    </div>
  );
};

export default Delete;
