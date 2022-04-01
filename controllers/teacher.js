const Teacher = require("../models/Teacher");
const Users = require("../models/Users");
const asyncError = require("express-async-handler");
const customError = require("../helpers/errors/CustomError");
const checkUser = require("../helpers/errors/CheckUser");

const registerTeacher = asyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const teacher = await Teacher.create({ name, email, password });
  return res.status(200).json({
    success: true,
    data: teacher,
  });
});

const getSingleUser = asyncError(async (req, res, next) => {
  const id = req.params.studentId;
  const user = await Users.findById(id);
  checkUser(user, next);
  return res.status(200).json({
    success: true,
    student_information: {
      name: user.name,
      email: user.email,
      lessons: user.lessons,
      profile_image: user.profile_image,
      createdAt: user.createdAt,
    },
  });
});

const addStudent = asyncError(async (req, res, next) => {
  const { teacherId } = req.params;
  const { studentId } = req.params;
  const user = await Users.findById(studentId);
  checkUser(user, next);
  const teacher = await Teacher.findById(teacherId);
  checkUser(teacher, next);
  if (teacher.students.find((x) => x === studentId)) {
    return next(new customError("There is such a student", 400));
  }
  teacher.students.push(studentId);
  await teacher.save();
  return res.status(200).json({
    success: true,
    newStudent: teacher,
  });
});
const addLessonToStudent = asyncError(async (req, res, next) => {
  const { studentId } = req.params;
  const { teacherId } = req.params;
  const newLesson = req.body.lessons;
  const user = await Users.findById(studentId);
  checkUser(user, next);
  const teacher = await Teacher.findById(teacherId);
  checkUser(teacher, next);
  if (user.lessons.find((x) => x.lesson === newLesson)) {
    return next(new customError("There is already such a lesson."), 400);
  }
  user.lessons.push({ TeacherName: teacher.name, lesson: newLesson });
  await user.save();
  return res.status(200).json({
    success: true,
    newLesson: user,
  });
});

const editLesson = asyncError(async (req, res, next) => {
  const { studentId } = req.params;
  const { teacherId } = req.params;
  const newLesson = req.body.newLesson;
  const oldLesson = req.body.oldLesson;
  const user = await Users.findById(studentId);
  checkUser(user, next);
  const teacher = await Teacher.findById(teacherId);
  checkUser(teacher, next);
  user.lessons.map((element) => {
    if (element.lesson === oldLesson) {
      const index = user.lessons.indexOf(element);
      user.lessons.splice(index, 1, {
        TeacherName: teacher.name,
        lesson: newLesson,
      });
    }
  });
  await user.save();
  return res.status(200).json({
    data: user,
  });
});

const removeLesson = asyncError(async (req, res, next) => {
  const { studentId } = req.params;
  const lesson = req.body.lesson;
  const user = await Users.findById(studentId);
  checkUser(user, next);
  user.lessons.map((element) => {
    if (element.lesson === lesson) {
      const index = user.lessons.indexOf(element);
      user.lessons.splice(index, 1);
    }
  });
  await user.save();
  return res.status(200).json({
    data: user,
  });
});

const removeStudent = asyncError(async (req, res, next) => {
  const { studentId } = req.params;
  const { teacherId } = req.params;
  const teacher = await Teacher.findById(teacherId);
  checkUser(teacher, next);
  teacher.students.map((element) => {
    if (element === studentId) {
      const index = teacher.students.indexOf(element);
      teacher.students.splice(index, 1);
    }
  });
  await teacher.save();
  return res.status(200).json({
    data: teacher,
  });
});

const getAllTeacher = asyncError(async (req, res, next) => {
  const teacher = await Teacher.find();
  return res.status(200).json({
    success: true,
    data: teacher,
  });
});
module.exports = {
  getSingleUser,
  registerTeacher,
  addLessonToStudent,
  addStudent,
  editLesson,
  removeLesson,
  removeStudent,
  getAllTeacher,
};
