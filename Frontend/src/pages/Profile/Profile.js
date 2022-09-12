import Header from "../../components/Header/Header";
import "./Profile.css";
import UserModif from "../../components/UserModif/UserModif";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import JwtService from "../../services/JwtService";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3001/api/auth/getInfo",
      headers: { Authorization: "Bearer " + JwtService.getToken() },
    }).then((res) => {
      setUser(res.data.user);
    });
  }, []);

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div>
      <Header />
      <UserModif email={user.email} pseudo={user.pseudo} />
      <div className="btn__container">
        <button className="btn" onClick={handleClick}>
          Se deconnecter
        </button>
      </div>
    </div>
  );
};

export default Profile;
