const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

const postCtrl = require("../controllers/post");

router.get("/readAll", auth, postCtrl.readAll);
router.post("/", auth, multer, postCtrl.createPost);
router.post("/:id", auth, postCtrl.deletePost);
router.post("/like/:id", auth, postCtrl.likePost);
router.get("/readOne/:id", auth, postCtrl.readOne);
router.post("/update/:id", auth, multer, postCtrl.update);

module.exports = router;
