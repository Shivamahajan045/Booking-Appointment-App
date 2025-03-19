const express = require("express");
const cors = require("cors");
const sequelize = require("./utils/database");
const path = require("path");
const userRoute = require("./routes/usersRoute");
const app = express();

//middleware to serve static files
app.use(express.static("public"));
app.use(cors());

//middleware to parse json
app.use(express.json());

//root route - Serve HTML Form
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "registerForm.html"));
});

// Use a single route prefix for user-related APIs
app.use("/users", userRoute);

sequelize
  .sync()
  .then(() => {
    console.log("Database synced with Sequelize");
  })
  .catch((err) => console.error("Error syncing database:", err));
app.listen(3000, () => {
  console.log(`Server is listening to port 3000`);
});
