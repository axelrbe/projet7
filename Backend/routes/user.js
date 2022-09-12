const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const userCtrl = require("../controllers/user");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.post("/modifyInfo", auth, userCtrl.modifyInfo);
router.get("/getInfo", auth, userCtrl.getInfo);

module.exports = router;
