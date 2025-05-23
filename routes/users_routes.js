const express = require("express");
const router = express.Router();
const allowedTo = require("../middlewares/allowedTo");

const controllers = require("../controllers/controllers_users");
const verifyLogin = require("../middlewares/verifyLogin");
const userRoles = require("../utils/user_roles");

router.post("/register", controllers.register);
router.post("/login", controllers.login);
router.get(
  "/",
  verifyLogin,
  allowedTo(userRoles.ADMIN),
  controllers.getAllUsers
);
//router.get("/getCourse/:id", controllers.getCourseById);
//router.patch("/updateCourse/:id", controllers.updateCourse);
//router.delete("/deleteCourse/:id", controllers.deleteCourse);

module.exports = router;
