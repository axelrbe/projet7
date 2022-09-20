import axios from "axios";
import { useEffect, useState } from "react";
import JwtService from "../services/JwtService";

const Admin = () => {
  const [userAdmin, setUserAdmin] = useState({});
  const [confirmUserAdmin, setConfirmUserAdmin] = useState(false);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3001/api/auth/getInfo",
      headers: { Authorization: "Bearer " + JwtService.getToken() },
    }).then((res) => {
      setUserAdmin(res.data.user);
      setConfirmUserAdmin(true);
    });
  }, []);

  console.log(confirmUserAdmin, userAdmin);

  return (
    <div>
      {userAdmin.email}
      {userAdmin.pseudo}
      {userAdmin.pseudo}
    </div>
  );
};

export default Admin;
