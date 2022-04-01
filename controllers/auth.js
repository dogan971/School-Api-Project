const express = require("express");
const Users = require("../models/Users");
const asyncError = require("express-async-handler");
const {
  validationUserInput,
  comparePassword,
} = require("../helpers/input/inputHelpers");
const customError = require("../helpers/errors/CustomError");
const {
  sendJwtToClient,
} = require("../middlewares/authorizations/tokenHelpers");
const Teachers = require("../models/Teacher");

const loginUser = asyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!validationUserInput(email, password)) {
    return next(customError("Please check your input", 400));
  }
  const user = await Users.findOne({ email }).select("+password");
  if (user) {
    if (!comparePassword(password, user.password)) {
      return next(new customError("Please check your credentials", 400));
    }
    sendJwtToClient(user, res);
  }
  const teacher = await Teachers.findOne({ email }).select("+password");
  if (teacher) {
    sendJwtToClient(teacher, res);
    if (!comparePassword(password, user.password)) {
      return next(new customError("Please check your credentials", 400));
    }
  }
});

const logout = asyncError(async (req, res, next) => {
  const { NODE_ENV } = process.env;
  return res
    .status(200)
    .cookie({
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      message: "Logout Successfull",
    });
});

module.exports = {
  loginUser,
  logout,
};
