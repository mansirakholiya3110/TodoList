const validateTask = (req, res, next) => {
    const { task, username, date,task_type } = req.body;

    if (!task || !username || !date || !task_type) {
        return res.status(400).json({
            message: 'All fields are required',
        });
    }

    if (typeof task !== 'string' || task.length < 3) {
        return res.status(400).json({ message: 'Task must be a string with at least 3 characters.' });
    }

    if (!/^[0-9]+$/.test(date)) {
        return res.status(400).json({ message: 'Date must be a numeric string.' });
    }

    if (!['office', 'personal', 'family', 'friends', 'other'].includes(task_type)) {
        return res.status(400).json({ message: 'Invalid task type.' });
    }

    next(); 
};

module.exports = validateTask;
