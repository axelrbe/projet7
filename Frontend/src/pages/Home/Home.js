import Header from "../../components/Header/Header";
import "./Home.css";
import { useState, useEffect } from "react";
import LikeDislike from "../../components/LikeDislike/LikeDislike";
import imagePost from "../../images/post-sans-image.jpg";
import { Link } from "react-router-dom";
import Delete from "../../components/Delete/Delete";
import JwtService from "../../services/JwtService";
import axios from "axios";
import { formatDate } from "../../services/Utils";

function Home() {
  const [posts, setPosts] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const { userId, isAdmin } = JwtService.getTokenDecrypted();

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3001/api/posts/readAll",
      headers: { Authorization: "Bearer " + JwtService.getToken() },
    }).then((res) => {
      console.log(res.data.data);
      setPosts(res.data.data);
    });
  }, []);

  const handleClick = (i) => {
    setSelectedIndex(i);
  };

  const onPostDeleted = (index) => {
    const posts_ = [...posts];
    posts_.splice(index, 1);
    setPosts(posts_);
  };

  return (
    <div className={`"main" ${selectedIndex ? "main__noscroll" : ""}`}>
      <div className={selectedIndex ? "active" : ""}></div>
      <Header />
      <div className="Home">
        <div className="title__container">
          <h1 className="title">Liste des posts !</h1>
        </div>
        <ul className="nav__ul">
          {posts.map((post, index) => {
            return (
              <li key={post.id} className="nav__li">
                {post.imageUrl ? (
                  <img
                    src={post.imageUrl}
                    alt={post.id}
                    onClick={() => {
                      handleClick(index);
                    }}
                    className="image__post"
                  />
                ) : (
                  <img
                    src={imagePost}
                    alt={post.id}
                    onClick={() => {
                      handleClick(index);
                    }}
                    className="image__post"
                  />
                )}
                <div className="post">
                  <h3 className="posts__title">{post.title} :</h3>
                  <p className="posts__description">{post.description}</p>
                  {(post.userId === userId || isAdmin === 1) && (
                    <Link to={"/modifier-article/" + post.id}>
                      <i className="fa-solid fa-pen-to-square modify__icon" />
                    </Link>
                  )}
                </div>
                <div>
                  <LikeDislike postId={post.id} _likes={post.likes} />
                  {(post.userId === userId || isAdmin === 1) && (
                    <Delete
                      postId={post.id}
                      index={index}
                      onPostDeleted={onPostDeleted}
                    />
                  )}
                </div>
                {selectedIndex === index && (
                  <div className={`open__post`}>
                    <p className="user__pseudo">
                      Posté par: {post.user.pseudo}
                    </p>
                    <p className="posts__createdAt">
                      Posté le: {formatDate(post.createdAt)}
                    </p>
                    <h3 className="post__title">{post.title}</h3>
                    <p className="post__description">{post.description}</p>
                    {post.imageUrl ? (
                      <img src={post.imageUrl} alt={post.id} />
                    ) : (
                      <img src={imagePost} alt={post.id} />
                    )}
                    <button
                      className="close__btn"
                      onClick={() => {
                        handleClick(null);
                      }}
                    >
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
