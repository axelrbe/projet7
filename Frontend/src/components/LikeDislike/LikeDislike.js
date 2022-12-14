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
    axios({
      method: "post",
      url: `http://localhost:3001/api/posts/like/${postId}`,
      data: { userId },
      headers: { Authorization: "Bearer " + JwtService.getToken() },
    })
      .then((res) => {
        if (res.data.action === "added") {
          setLikeActive(true);
          setLikes(res.data.likes);
        } else {
          setLikeActive(false);
          setLikes(res.data.likes);
        }
      })
      .catch((err) => err.response.data);
  };

  return (
    <div className="btns__container">
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
