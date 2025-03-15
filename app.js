const express = require("express");
const cors = require("cors");
const db = require("./utils/database");
const path = require("path");
const { json } = require("stream/consumers");
const { copyFileSync } = require("fs");
const app = express();

//middleware to serve static files
app.use(express.static("public"));
app.use(cors());

//middleware to parse json
app.use(express.json());

//users route -
app.get("/users", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "registerForm.html"));
});

//Get all users
app.get("/users/getUser", (req, res) => {
  db.execute(`SELECT * FROM users`)
    .then(([rows]) => {
      res.json(rows);
    })
    .catch((err) => {
      console.error(err);
    });
});
//addUser
app.post("/users/addUser", (req, res) => {
  let { username, email, phone } = req.body;
  db.execute(`INSERT INTO users (username, email, phone) VALUES (?,?,?)`, [
    username,
    email,
    phone,
  ])
    .then((result) => {
      res.json({ message: "USER ADDED SUCCESSFULLY to db" });
    })
    .catch((err) => {
      console.log(err);
    });
});

//delete user
app.delete("/users/deleteUser/:id", (req, res) => {
  let { id } = req.params;
  db.execute(`DELETE FROM users WHERE id = ?`, [id])
    .then((result) => {
      res.json({ message: "User deleted successfully" });
    })
    .catch((err) => {
      console.log(err);
    });
});

//edit user
app.put("/users/editUser/:id", (req, res) => {
  let { id } = req.params;
  let { username, email, phone } = req.body;
  db.execute(
    `UPDATE users SET username = ?, email = ?, phone = ? WHERE id = ?`,
    [username, email, phone, id]
  )
    .then(() => {
      res.json({ message: "User Updateed successfully" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(3000, () => {
  console.log(`Server is listening to port 3000`);
});
