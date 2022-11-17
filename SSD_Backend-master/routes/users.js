const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var RegistrationValidation = require("../middleware/jwtValidation/registrationValidation");
const { userLogging, createStaff } = require("../service/userService");

//login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await userLogging(username, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
  // res.json({message: 'Login User'})
});

//create staff
router.post("/create", async (req, res) => {
  const { username, password, role } = req.body;

  if (RegistrationValidation(req)) {
    try {
      const result = await createStaff(username, password, role);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    res.status(401).json({
      code: 401,
      error: "Permission not granted",
    });
  }
});



module.exports = router;
