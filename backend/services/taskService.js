const Task = require('../models/Task');

class TaskService {
  async createTask(title, description, createdBy) {
    const newTask = new Task({
      title,
      description,
      createdBy
    });
    return await newTask.save();
  }

  async getTasksByUser(userId) {
    return await Task.find({ createdBy: userId }).sort({ createdAt: -1 });
  }

  async updateTask(id, userId, taskFields) {
    let task = await Task.findById(id);

    if (!task) throw new Error('Task not found');
    if (task.createdBy.toString() !== userId) throw new Error('Not authorized');

    task = await Task.findByIdAndUpdate(
      id,
      { $set: taskFields },
      { new: true }
    );

    return task;
  }

  async deleteTask(id, userId) {
    const task = await Task.findById(id);

    if (!task) throw new Error('Task not found');
    if (task.createdBy.toString() !== userId) throw new Error('Not authorized');

    await Task.findByIdAndRemove(id);
    return { msg: 'Task removed' };
  }
}

module.exports = new TaskService();
