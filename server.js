const express = require("express");
const routers = require("./routers/index");
const dotenv = require("dotenv");
const connectDatabase = require("./helpers/database/connectDatabase");

const customError = require("./middlewares/errors/customError");
// Enviroment Variables
dotenv.config({
  path: "./config/env/config.env",
});

// MongoDB Connection
connectDatabase();

const app = express();
//Express - Body Middleware
app.use(express.json());
const PORT = process.env.PORT;

// Routes Middleware
app.use("/api", routers);
app.use(customError);

app.listen(PORT, () => {
  console.log("Server Started on " + PORT + ":" + "Development");
});
