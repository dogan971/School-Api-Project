const customError = require("./CustomError");
const checkUser = (user, next) => {
  if (!user) {
    next(new customError("User Not Found", 400));
  }
};
 
module.exports = checkUser;
