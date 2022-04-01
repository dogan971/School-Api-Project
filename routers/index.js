const express = require("express");
const router = express.Router();
const user = require("./user");
const auth = require("./auth");
const teacher = require("./teacher");




router.use("/user", user);
router.use("/auth",auth)
router.use("/teacher",teacher)
module.exports = router;
