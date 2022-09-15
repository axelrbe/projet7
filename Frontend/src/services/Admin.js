import axios from "axios";
import { useEffect, useState } from "react";

const Admin = () => {
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3001/api/auth/getInfo",
      headers: { Authorization: "Bearer " + JwtService.getToken() },
    }).then((res) => {
      setUserAdmin(res.data.user);
    });
  }, []);

  return <div></div>;
};

export default Admin;
