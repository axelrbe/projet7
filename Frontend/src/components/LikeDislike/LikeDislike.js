import { useState } from "react";
import "./LikeDislike.css";

const LikeDislike = () => {
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);

  const [likeActive, setLikeActive] = useState(false);
  const [dislikeActive, setDislikeActive] = useState(false);

  const likePost = () => {
    if (likeActive) {
      setLikeActive(false);
      setLike(like - 1);
    } else {
      setLikeActive(true);
      setLike(like + 1);

      if (dislikeActive) {
        setDislikeActive(false);
        setLike(like + 1);
        setDislike(dislike - 1);
      }
    }
  };

  const dislikePost = () => {
    if (dislikeActive) {
      setDislikeActive(false);
      setDislike(dislike - 1);
    } else {
      setDislikeActive(true);
      setDislike(dislike + 1);

      if (likeActive) {
        setLikeActive(false);
        setDislike(dislike + 1);
        setLike(like - 1);
      }
    }
  };

  return (
    <div className="btns__container">
      <div></div>
      <button
        className={`like__btn ${likeActive ? "likeIsActive" : ""}`}
        onClick={likePost}
      >
        <i className="fa-regular fa-thumbs-up" /> {like}
      </button>
      <button
        className={`dislike__btn ${dislikeActive ? "dislikeIsActive" : ""}`}
        onClick={dislikePost}
      >
        <i className="fa-regular fa-thumbs-down" /> {dislike}
      </button>
    </div>
  );
};

export default LikeDislike;
