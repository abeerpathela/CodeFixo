const Question = require('../models/Question');
const UserProgress = require('../models/UserProgress');
const { analyzeCode } = require('../utils/aiService');

// @desc    Get all practice modules
// @route   GET /api/practice/modules
// @access  Public
const getModules = (req, res) => {
    res.json(['Arrays', 'Strings']);
};

// @desc    Get questions by module and difficulty
// @route   GET /api/practice/questions
// @access  Public
const getQuestions = async (req, res) => {
    const { module, difficulty } = req.query;
    const query = {};

    if (module) query.module = module;
    if (difficulty) query.difficulty = difficulty;

    try {
        console.log('Query being sent to MongoDB:', query);
        console.log(`Fetching questions for module: ${module}, difficulty: ${difficulty}`);
        const questions = await Question.find(query).select('-testCases -sampleInput -sampleOutput -constraints');
        console.log(`Found ${questions.length} questions matching criteria.`);
        res.json(questions);
    } catch (error) {
        res.status(500);
        throw new Error('Server Error');
    }
};

// @desc    Get single question by ID
// @route   GET /api/practice/questions/:id
// @access  Public
const getQuestionById = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (question) {
            res.json(question);
        } else {
            res.status(404);
            throw new Error('Question not found');
        }
    } catch (error) {
        res.status(500);
        throw new Error('Server Error');
    }
};

// @desc    Submit code for AI review
// @route   POST /api/practice/submit
// @access  Private
const submitCode = async (req, res) => {
    const { questionId, code, language } = req.body;

    if (!['c', 'cpp', 'java'].includes(language.toLowerCase()) && !['c++', 'java'].includes(language.toLowerCase())) {
        // Allow flexibility in language string: 'cpp', 'c++', 'c', 'java'
    }

    // Normalized check
    const allowed = ['c', 'cpp', 'c++', 'java'];
    if (!allowed.includes(language.toLowerCase())) {
        res.status(400);
        throw new Error('Language not supported for practice module');
    }

    try {
        const question = await Question.findById(questionId);
        if (!question) {
            res.status(404);
            throw new Error('Question not found');
        }

        const analysis = await analyzeCode(code, language, question);

        // We do NOT mark as solved automatically here, as per requirements (AI reviews logic). 
        // User manually marks as solved or we could integrate test cases runner if it was an online judge (but it's not).

        res.json({ analysis });
    } catch (error) {
        console.error(error);
        res.status(500);
        throw new Error('Submission analysis failed');
    }
};

// @desc    Mark question as solved
// @route   POST /api/practice/mark-solved
// @access  Private
const markSolved = async (req, res) => {
    const { questionId } = req.body;

    try {
        const progress = await UserProgress.findOne({
            userId: req.user.id,
            questionId
        });

        if (progress) {
            if (!progress.solved) {
                progress.solved = true;
                progress.solvedAt = Date.now();
                await progress.save();
            }
        } else {
            await UserProgress.create({
                userId: req.user.id,
                questionId,
                solved: true,
                solvedAt: Date.now()
            });
        }

        res.json({ message: 'Question marked as solved' });
    } catch (error) {
        console.error(error);
        res.status(500);
        throw new Error('Failed to update progress');
    }
};

// @desc    Get user's solved status for a list of questions (Helper for frontend list)
// @route   POST /api/practice/progress
// @access  Private
const getUserProgress = async (req, res) => {
    try {
        const progress = await UserProgress.find({ userId: req.user.id });
        res.json(progress);
    } catch (error) {
        res.status(500);
        throw new Error('Server Error');
    }
}

module.exports = {
    getModules,
    getQuestions,
    getQuestionById,
    submitCode,
    markSolved,
    getUserProgress
};
