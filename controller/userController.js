const User = require("../models/user");
const getUsers = (req, res) => {
  User.findAll()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => console.log(err));
  // db.execute(`SELECT * FROM users`)
  //   .then(([rows]) => {
  //     res.json(rows);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });
};

const addUsers = (req, res) => {
  let { username, email, phone } = req.body;
  User.create({
    username: username,
    email: email,
    phone: phone,
  })
    .then((result) => {
      res.json({ message: "USER ADDED SUCCESSFULLY to db" });
    })
    .catch((err) => {
      console.log(err);
    });

  // db.execute(`INSERT INTO users (username, email, phone) VALUES (?,?,?)`, [
  //   username,
  //   email,
  //   phone,
  // ])
  //   .then((result) => {
  //     res.json({ message: "USER ADDED SUCCESSFULLY to db" });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

const deleteUser = (req, res) => {
  let { id } = req.params;
  User.destroy({ where: { id: id } })
    .then((result) => {
      res.json({ message: "User deleted successfully" });
    })
    .catch((err) => {
      console.log(err);
    });
  // db.execute(`DELETE FROM users WHERE id = ?`, [id])
  //   .then((result) => {
  //     res.json({ message: "User deleted successfully" });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

const editUser = (req, res) => {
  let { id } = req.params;
  let { username, email, phone } = req.body;
  User.update(
    {
      username: username,
      email: email,
      phone: phone,
    },
    { where: { id: id } }
  )
    .then(() => {
      res.json({ message: "User Updated successfully" });
    })
    .catch((err) => {
      console.log(err);
    });

  // db.execute(
  //   `UPDATE users SET username = ?, email = ?, phone = ? WHERE id = ?`,
  //   [username, email, phone, id]
  // )
  //   .then(() => {
  //     res.json({ message: "User Updateed successfully" });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

module.exports = {
  getUsers,
  addUsers,
  deleteUser,
  editUser,
};
