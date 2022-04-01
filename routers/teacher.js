const express = require("express");
const router = express.Router();
const {
  registerTeacher,
  getSingleUser,
  addLessonToStudent,
  addStudent,
  editLesson,
  removeLesson,
  removeStudent,
  getAllTeacher,
} = require("../controllers/teacher");
const { getAccessToRoute } = require("../middlewares/authorizations/auth");

router.get(
  "/:teacherId/getSingleStudent/:studentId",
  getAccessToRoute,
  getSingleUser
);

router.post("/addStudent/:teacherId/:studentId", getAccessToRoute, addStudent);
router.post(
  "/addLessonToStudent/:teacherId/:studentId",
  getAccessToRoute,
  addLessonToStudent
);
router.post("/registerTeacher", registerTeacher);
router.put("/editLesson/:teacherId/:studentId", getAccessToRoute,editLesson);
router.delete("/removeLesson/:teacherId/:studentId", getAccessToRoute, removeLesson);
router.delete(
  "/removeStudent/:teacherId/:studentId",
  getAccessToRoute,
  removeStudent
);
router.get("/getAllTeacher",getAllTeacher)

module.exports = router;
