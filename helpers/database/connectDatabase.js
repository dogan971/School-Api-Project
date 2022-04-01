const mongoose = require("mongoose");
const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_CONNECTION)
    .then(() => console.log("MongoDB Connection Successfully"))
    .catch((err) => console.error(err));
};

module.exports = connectDatabase;
