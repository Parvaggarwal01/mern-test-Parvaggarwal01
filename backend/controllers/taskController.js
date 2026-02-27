const taskService = require('../services/taskService');

exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await taskService.createTask(title, description, req.user.id);
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getTasksByUser(req.user.id);
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const taskFields = {};
    if (title) taskFields.title = title;
    if (description) taskFields.description = description;
    if (status) taskFields.status = status;

    const task = await taskService.updateTask(req.params.id, req.user.id, taskFields);
    res.json(task);
  } catch (err) {
    if (err.message === 'Task not found') return res.status(404).json({ msg: err.message });
    if (err.message === 'Not authorized') return res.status(401).json({ msg: err.message });
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const result = await taskService.deleteTask(req.params.id, req.user.id);
    res.json(result);
  } catch (err) {
    if (err.message === 'Task not found') return res.status(404).json({ msg: err.message });
    if (err.message === 'Not authorized') return res.status(401).json({ msg: err.message });
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Task not found' });
    }
    res.status(500).send('Server Error');
  }
};
