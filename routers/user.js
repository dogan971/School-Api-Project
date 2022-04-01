const express = require("express");
const router = express.Router();
const {
  getAllUser,
  getInfo,
  editUser,
  deleteUser,
  registerUser,
} = require("../controllers/user");
const { getAccessToRoute } = require("../middlewares/authorizations/auth");

router.get("/getAllStudent", getAllUser);
router.post("/getInfo/:id", getAccessToRoute, getInfo);
router.put("/editUser/:studentId", getAccessToRoute, editUser);
router.delete(
  "/deleteUser/:studentId/:teacherId",
  getAccessToRoute,
  deleteUser
);
router.post("/registerUser", registerUser);

module.exports = router;
