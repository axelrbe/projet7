import axios from "axios";
import { useEffect, useState } from "react";
import JwtService from "../services/JwtService";

const Admin = () => {
  const [userAdmin, setUserAdmin] = useState({});

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3001/api/auth/getInfo",
      headers: { Authorization: "Bearer " + JwtService.getToken() },
    }).then((res) => {
      setUserAdmin(res.data.user);
    });
  }, []);

  console.log(confirmUserAdmin, userAdmin);

  return <div></div>;
};

export default Admin;
