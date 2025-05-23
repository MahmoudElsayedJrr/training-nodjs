const mongoose = require("mongoose");
const validator = require("validator");
const userRoles = require("../utils/user_roles");
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email address."],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function (value) {
        return /(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(
          value
        );
      },
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one symbol.",
    },
  },

  token: {
    type: String,
  },

  role: {
    type: String,
    enum: [userRoles.ADMIN, userRoles.USER, userRoles.MODERATOR],
    default: userRoles.USER,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
