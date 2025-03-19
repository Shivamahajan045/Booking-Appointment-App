const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();

router.get("/", userController.getUsers);
router.post("/", userController.addUsers);
router.delete("/:id", userController.deleteUser);
router.put("/:id", userController.editUser);

module.exports = router;
