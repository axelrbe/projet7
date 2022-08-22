const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post");

router.get("/readAll", postCtrl.readAll);
router.post("/", postCtrl.createPost);

module.exports = router;
