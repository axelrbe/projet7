import axios from "axios";
import { useEffect, useState } from "react";
import "./Delete.css";
import JwtService from "../../services/JwtService";

const Delete = ({ postId, post, onPostDeleted }) => {
  const [deletePost, setDeletePost] = useState([]);
  let newPostList;

  const handleDelete = () => {
    axios({
      method: "post",
      url: `http://localhost:3001/api/posts/${postId}`,
      data: newPostList,
      headers: { Authorization: "Bearer " + JwtService.getToken() },
    })
      .then(() => {
        alert("Votre post à bien été supprimé !");
        newPostList = post.filter((item) => item.id !== postId);
        onPostDeleted(newPostList);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setDeletePost(newPostList);
  }, [newPostList]);

  return (
    <div>
      <button key={deletePost} className="delete_btn" onClick={handleDelete}>
        <i className="fa-solid fa-trash"></i>
      </button>
    </div>
  );
};

export default Delete;
