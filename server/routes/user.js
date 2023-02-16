const express = require("express");
const router = express.Router();

// Require controller modules.
const {
  AddUser,
  UpdateUser,
  GetUserProfile,
  GetUserProduct,
  UpdateUserAdress,
} = require("../contollers/user.js");

router.post("/addUser", AddUser);
router.put("/updateUser/:id_user", UpdateUser);
router.put("/updateUserAdress/:id_user", UpdateUserAdress);

router.get("/getUserPorfile/:id_user", GetUserProfile);
router.get("/getUserProduct/:id_user", GetUserProduct);

module.exports = router;
