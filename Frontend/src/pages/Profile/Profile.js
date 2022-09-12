import Header from "../../components/Header/Header";
import "./Profile.css";
import UserModif from "../../components/UserModif/UserModif";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const userInfo = localStorage.getItem("user");
  const user = JSON.parse(userInfo);
  const userEmail = user.email;
  const userPseudo = user.pseudo;

  const handleClick = () => {
    navigate("/");
    localStorage.clear(user);
  };

  return (
    <div>
      <Header />
      <UserModif email={userEmail} pseudo={userPseudo} />
      <div className="btn__container">
        <button className="btn" onClick={handleClick}>
          Se deconnecter
        </button>
      </div>
    </div>
  );
};

export default Profile;
