const asyncError = require("express-async-handler");
const customError = require("../../helpers/errors/CustomError");
const Users = require("../../models/Users");
const checkUserExists = asyncError(async (req, res, next) => {
  const id = req.params.id || req.params.studentId;
  const teacherId = req.params.teacherId;
  const user = await Users.findById(id);
  if (!user) {
    return next(new customError("Student not  Found", 400));
  }

  req.data = user;

  next();
});

module.exports = {
  checkUserExists,
};
