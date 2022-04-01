const express = require("express");
const router = express.Router();
const { loginUser, logout } = require("../controllers/auth");
const { getAccessToRoute } = require("../middlewares/authorizations/auth");

router.post("/loginUser", loginUser);
router.get("/logout",getAccessToRoute, logout);

module.exports = router;
