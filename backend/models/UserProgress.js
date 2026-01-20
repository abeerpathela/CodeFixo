const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
    solved: {
        type: Boolean,
        default: false
    },
    lastAttemptedAt: {
        type: Date,
        default: Date.now
    },
    solvedAt: {
        type: Date
    }
});

// Compound index for fast lookups of user progress on specific questions
userProgressSchema.index({ userId: 1, questionId: 1 }, { unique: true });

module.exports = mongoose.model('UserProgress', userProgressSchema);
