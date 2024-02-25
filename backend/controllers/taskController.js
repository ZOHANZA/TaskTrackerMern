const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModel");
const User = require("../models/userModel");

// @desc    Get tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.status(200).json(tasks);
});

// @desc    Set task
// @route   POST /api/tasks
// @access  Private
const setTask = asyncHandler(async (req, res) => {
  const { text, timeAndDay, setReminder } = req.body;

  if (!text || !timeAndDay) {
    res.status(400);
    throw new Error("Please provide text and timeAndDay for the task");
  }

  const task = await Task.create({
    text,
    timeAndDay,
    setReminder: setReminder || false, // Default to false if not provided
    user: req.user.id,
  });

  res.status(201).json(task);
});

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  // Check if the user is authorized to update the task
  if (task.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized to update this task");
  }

  const { text, timeAndDay, setReminder } = req.body;

  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        text: text || task.text,
        timeAndDay: timeAndDay || task.timeAndDay,
        setReminder: setReminder !== undefined ? setReminder : task.setReminder,
      },
    },
    { new: true }
  );

  res.status(200).json(updatedTask);
});



// @desc    Toggle reminder for task
// @route   PUT /api/tasks/:id
// @access  Private
const toggleTaskReminder = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  // Check if the user is authorized to update the task
  if (task.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized to update this task");
  }

  // Toggle the reminder field to its opposite state
  task.reminder = !task.reminder;

  const updatedTask = await task.save();

  res.status(200).json(updatedTask);
});



// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  // Check if the user is authorized to delete the task
  if (task.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized to delete this task");
  }

  await task.remove();

  res.status(200).json({ message: "Task removed successfully" });
});

module.exports = {
  getTasks,
  setTask,
  updateTask,
  deleteTask,
};
