const customError = require("../../helpers/errors/CustomError");
const jwt = require("jsonwebtoken");
const asyncError = require("express-async-handler");
const Users = require("../../models/Users");
const {
  isTokenIncluded,
  getAccessTokenFromHeader,
} = require("../../middlewares/authorizations/tokenHelpers");
const getAccessToRoute = (req, res, next) => {
  const { JWT_SECRET_KEY } = process.env;
  if (!isTokenIncluded(req)) {
    return next(
      new customError("You are not authorized to access this route"),
      401
    );
  }
  const accesstoken = getAccessTokenFromHeader(req);
  jwt.verify(accesstoken, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return next(
        new customError("You are not authorized to access this route", 401)
      );
    }
    req.user = {
      id: decoded.id,
      name: decoded.name,
    };
    next();
  });
};

module.exports = {
  getAccessToRoute,
};
