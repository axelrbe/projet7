import { useEffect, useState } from "react";
import Header from "../Header/Header";
import PostForm from "../PostForm/PostForm";
import "./PostUpdate.css";
import { useParams } from "react-router-dom";
import axios from "axios";

function PostUpdate() {
  const [postInfo, setPostInfo] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios.get("http://localhost:3001/api/posts/readOne/" + id).then((res) => {
      setPostInfo(res.data.data);
    });
  }, [id]);

  return (
    <div>
      <Header />
      <div className="PostUpdate">
        <div className="title__container">
          <h1 className="title">Modifiez votre post !</h1>
        </div>
        {postInfo.title && <PostForm postInfo={postInfo} />}
      </div>
    </div>
  );
}

export default PostUpdate;
