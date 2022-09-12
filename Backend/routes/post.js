const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

const postCtrl = require("../controllers/post");

router.get("/readAll", postCtrl.readAll);
router.post("/", multer, postCtrl.createPost);
router.post("/:id", postCtrl.deletePost);
router.post("/like/:id", postCtrl.likePost);
router.get("/readOne/:id", postCtrl.readOne);
router.post("/update/:id", multer, postCtrl.update);

module.exports = router;
