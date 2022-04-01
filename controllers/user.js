const express = require("express");
const Users = require("../models/Users");
const asyncError = require("express-async-handler");
const customError = require("../helpers/errors/CustomError");
const checkUser = require("../helpers/errors/CheckUser");
const Teacher = require("../models/Teacher");

const getAllUser = asyncError(async (req, res, next) => {
  const data = await Users.find();
  return res.status(200).json({
    data: data,
  });
});

const getInfo = asyncError(async (req, res, next) => {
  const { id } = req.params;
  const user = await Users.findOne({ id });
  return res.status(200).json({
    information: user,
  });
});

const editUser = asyncError(async (req, res, next) => {
  const editUser = req.params;
  const { email, password } = req.body;
  const user = await Users.findOne(editUser);
  checkUser(user, next);
  user.email = email;
  user.password = password;
  await user.save();
  return res.status(200).json({
    success: true,
    data: user,
  });
});

const deleteUser = asyncError(async (req, res, next) => {
  const { studentId } = req.params;
  const { teacherId } = req.params;
  await Users.findByIdAndDelete(studentId);
  const teacher = await Teacher.findById(teacherId);
  if (teacher.students.find((x) => x === studentId)) {
    teacher.students.splice(studentId, 1);
    await teacher.save();
  }  
  return res.status(200).json({
    success: true,
    data: teacher,
  });
});

const registerUser = asyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await Users.create({ name, email, password });
  return res.status(200).json({
    success: true,
    data: user,
  });
});

module.exports = {
  getAllUser,
  getInfo,
  editUser,
  registerUser,
  deleteUser,
};
