const Course = require("../models/course_model");
const { validationResult } = require("express-validator");
const httpStatus = require("../utils/http_status");

const addCourse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(httpStatus.httpErrorStatus(errors.array));
  }
  const newCourse = new Course(req.body);
  await newCourse.save();
  res.status(201).json(httpStatus.httpSuccessStatus({ course: newCourse }));
};

const getAllCourses = async (req, res) => {
  const query = req.query;
  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const courses = await Course.find({}, { __v: 0 }).limit(limit).skip(skip);
  if (!courses) return res.status(404).json(httpStatus.httpFaliureStatus());
  res.json(httpStatus.httpSuccessStatus({ courses: courses }));
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) return res.status(404).json(httpStatus.httpFaliureStatus());

    res.json(course);
  } catch (error) {
    res.status(400).json(httpStatus.httpErrorStatus(error.message));
  }
};

const updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.json(httpStatus.httpSuccessStatus({ course: updatedCourse }));
  } catch (error) {
    return res.status(400).json(httpStatus.httpErrorStatus(error.message));
  }
};

const deleteCourse = async (req, res) => {
  await Course.deleteOne({ _id: req.params.id });
  res.status(200).json(httpStatus.httpSuccessStatus());
};

module.exports = {
  addCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
