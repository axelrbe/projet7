const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");

const postCtrl = require("../controllers/post");

router.get("/readAll", postCtrl.readAll);
router.post("/", multer, postCtrl.createPost);
router.delete("/:id", postCtrl.deletePost);
router.post("/like/:id", postCtrl.likePost);
router.get("/readOne/:id", postCtrl.readOne);
router.post("/update/:id", postCtrl.update);

module.exports = router;
