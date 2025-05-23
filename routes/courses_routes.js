const express = require("express");
const router = express.Router();

const controllers = require("../controllers/controllers-courses");

router.post("/addCourse", controllers.addCourse);
router.get("/getCourses", controllers.getAllCourses);
router.get("/getCourse/:id", controllers.getCourseById);
router.patch("/updateCourse/:id", controllers.updateCourse);
router.delete("/deleteCourse/:id", controllers.deleteCourse);

module.exports = router;
