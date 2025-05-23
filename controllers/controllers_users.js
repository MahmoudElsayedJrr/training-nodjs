const User = require("../models/user_model");
const generateJWT = require("../utils/generateJWT");
const httpStatus = require("../utils/http_status");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { fullname, email, password, role } = req.body;
  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    return res
      .status(400)
      .json(httpStatus.httpFaliureStatus("User already exists"));
    CLS;
  }

  const hashedPassword = await bcrypt.hash(password, 8);
  const newUser = new User({
    fullname,
    email,
    password: hashedPassword,
    role,
  });

  const token = await generateJWT({
    id: newUser._id,
    email: newUser.email,
    role: newUser.role,
  });
  newUser.token = token;
  await newUser.save();
  res.status(201).json(httpStatus.httpSuccessStatus({ user: newUser }));
};

const getAllUsers = async (req, res) => {
  const users = await User.find({}, { __v: 0, password: 0 });
  if (!users) {
    return res.status(400).json(httpStatus.httpFaliureStatus("No users found"));
  }
  res.status(200).json(httpStatus.httpSuccessStatus({ users: users }));
};

const login = async (req, res) => {
  const { email, password, role } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res
      .status(400)
      .json(httpStatus.httpFaliureStatus("User does not exist"));
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(400)
      .json(httpStatus.httpFaliureStatus("Invalid credentials"));
  }
  const token = await generateJWT({
    id: user._id,
    email: user.email,
    role: user.role,
  });

  res.status(200).json(
    httpStatus.httpSuccessStatus({
      user: {
        token: token,
      },
    })
  );
};

module.exports = {
  register,
  getAllUsers,
  login,
};
