import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PostCreate from "./pages/PostCreate/PostCreate";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import PostUpdate from "./components/PostUpdate/PostUpdate";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/accueil" element={<Home />} />
      <Route path="/ajout-article" element={<PostCreate />} />
      <Route path="/modifier-article/:id" element={<PostUpdate />} />
      <Route path="/inscription" element={<Signup />} />
      <Route path="/" element={<Login />} />
    </Routes>
  </BrowserRouter>
);
