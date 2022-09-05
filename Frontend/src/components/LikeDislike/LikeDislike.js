import axios from "axios";
import { useEffect, useState } from "react";
import "./LikeDislike.css";
import JwtService from "../../services/JwtService";

const LikeDislike = ({ postId, _likes }) => {
  const [likes, setLikes] = useState(0);
  const [likeActive, setLikeActive] = useState(false);

  useEffect(() => {
    setLikes(_likes);
  }, [_likes]);

  const likePost = () => {
    const userId = JwtService.getTokenDecrypted().userId;
    axios
      .post(`http://localhost:3001/api/posts/like/${postId}`, { userId })
      .then((res) => {
        if (res.data.action === "added") {
          setLikeActive(true);
          setLikes(likes + 1);
        } else {
          setLikeActive(false);
          setLikes(likes - 1);
        }
      })
      .catch((err) => err.response.data);
  };

  return (
    <div className="btns__container">
      <div></div>
      <button
        className={`like__btn ${likeActive ? "likeIsActive" : ""}`}
        onClick={likePost}
      >
        <i className="fa-regular fa-thumbs-up" /> {likes}
      </button>
    </div>
  );
};

export default LikeDislike;
