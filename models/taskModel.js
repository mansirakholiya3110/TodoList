const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    task: { type: String, required: true, minlength: 3 },
    username: { type: String, required: true },
    date: { type: String, required: true, },
    status: { type: Number, enum: [0, 1], default: 0 },
    task_type: {
        type: String,
        enum: ['office', 'personal', 'family', 'friends', 'other'],
        required: true,
    },
});

module.exports = mongoose.model('tasks', taskSchema);
