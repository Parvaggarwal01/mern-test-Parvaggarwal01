const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const taskController = require('../controllers/taskController');

// @route   POST api/tasks
// @desc    Create a task
// @access  Private
router.post('/', auth, taskController.createTask);

// @route   GET api/tasks
// @desc    Get all users tasks
// @access  Private
router.get('/', auth, taskController.getTasks);

// @route   PUT api/tasks/:id
// @desc    Update task
// @access  Private
router.put('/:id', auth, taskController.updateTask);

// @route   DELETE api/tasks/:id
// @desc    Delete task
// @access  Private
router.delete('/:id', auth, taskController.deleteTask);

module.exports = router;
