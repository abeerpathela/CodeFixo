const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true
    },
    module: {
        type: String,
        enum: ['Arrays', 'Strings'],
        required: true
    },
    tags: [String],
    constraints: String,
    sampleInput: String,
    sampleOutput: String,
    testCases: [{
        input: String,
        output: String
    }],
    snippets: [{
        langSlug: String, // e.g., 'cpp', 'java', 'python'
        code: String      // The starter code
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Question', questionSchema);
