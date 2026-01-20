const express = require('express');
const router = express.Router();
const {
    getModules,
    getQuestions,
    getQuestionById,
    submitCode,
    markSolved,
    getUserProgress
} = require('../controllers/practiceController');
const { protect } = require('../middleware/authMiddleware');

router.get('/modules', getModules);
router.get('/questions', getQuestions);
router.get('/questions/:id', getQuestionById);
router.post('/submit', protect, submitCode);
router.post('/mark-solved', protect, markSolved);
router.get('/progress', protect, getUserProgress); // Changed to GET for RESTfulness

module.exports = router;
