import Header from "../../components/Header/Header";
import "./Home.css";
import { useState, useEffect } from "react";
import LikeDislike from "../../components/LikeDislike/LikeDislike";
import imagePost from "../../images/post-sans-image.jpg";
import { Link } from "react-router-dom";
import Delete from "../../components/Delete/Delete";
import JwtService from "../../services/JwtService";
import axios from "axios";

function Home() {
  const [posts, setPosts] = useState([]);
  const [openPost, setOpenPost] = useState(false);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3001/api/posts/readAll",
      headers: { Authorization: "Bearer " + JwtService.getToken() },
    }).then((res) => {
      setPosts(res.data.data);
    });
  }, []);

  const handleClick = () => {
    openPost ? setOpenPost(false) : setOpenPost(true);
  };

  const onPostDeleted = (newPostList) => {
    setPosts(newPostList);
  };

  return (
    <div className={`"main" ${openPost ? "main__noscroll" : ""}`}>
      <div className={openPost ? "active" : ""}></div>
      <Header />
      <div className="Home">
        <div className="title__container">
          <h1 className="title">Liste des posts !</h1>
        </div>
        <ul className="nav__ul">
          {posts.map((post) => {
            return (
              <li key={post.id} className="nav__li">
                {post.imageUrl ? (
                  <img
                    src={post.imageUrl}
                    alt={post.id}
                    onClick={handleClick}
                    className="image__post"
                  />
                ) : (
                  <img
                    src={imagePost}
                    alt={post.id}
                    onClick={handleClick}
                    className="image__post"
                  />
                )}
                <div className="post">
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                </div>
                <div className="icons__container">
                  <LikeDislike postId={post.id} _likes={post.likes} />
                  <Delete
                    postId={post.id}
                    post={[post]}
                    onPostDeleted={onPostDeleted}
                  />
                  <Link to={"/modifier-article/" + post.id}>
                    <i className="fa-solid fa-pen-to-square modify__icon" />
                  </Link>
                </div>
                {openPost && (
                  <div className={`open__post`}>
                    <h3>{post.title}</h3>
                    <p className="post__description">{post.description}</p>
                    {post.imageUrl ? (
                      <img src={post.imageUrl} alt={post.id} />
                    ) : (
                      <img src={imagePost} alt={post.id} />
                    )}
                    <button className="close__btn" onClick={handleClick}>
                      X
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Home;
