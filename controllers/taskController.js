const Task = require('../models/taskModel'); // Import the model

// Create a new task
exports.createTask = async (req, res) => {
    try {
        const { task, username, date, status, task_type } = req.body;

        // Check for missing required fields
        if (!task || !username || !date || status === undefined || !task_type) {
            res.json({ message: 'All fields required.' });
            return;
        }

        // Create and save the new task
        let task1 = await Task.create({
            task,
            username,
            date,
            status,
            task_type,
        });

        console.log('Task created:', task1);
        res.json({ newtask: task1, message: 'Task added successfully!' });
    } catch (error) {
        console.error('Error creating task:', error);
        res.json({ message: 'Internal server error.',error });
    }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single task by ID
exports.getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


