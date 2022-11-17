const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateToken } = require("../middleware/getToken");

exports.userLogging = async (username, password) => {
  try {
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const response = {
        _id: user._id,
        username: user.username,
        token: generateToken(user._id, user.role),
        role: user.role,
      };
      return response;
    } else {
      throw { message: "invalid" };
    }
  } catch (error) {
    throw { message: "invalid" };
  }
};

exports.createStaff = async (username, password, role) => {
  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      throw { message: "invalid" };
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      console.log({
        username,
        password: hashedPassword,
        role,
      });
      const user = await User.create({
        username,
        password: hashedPassword,
        role,
      });
      if (user) {
        return {
          _id: user._id,
          username: user.username,
          role: user.role,
        };
      } else {
        throw { message: "Invalid user data" };
      }
    }
  } catch (error) {
    throw { message: "invalid" };
  }
};
