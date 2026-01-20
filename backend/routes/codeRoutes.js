const express = require('express');
const router = express.Router();
const { analyzeUserCode } = require('../controllers/codeController');
const { protect } = require('../middleware/authMiddleware');

router.post('/analyze', protect, analyzeUserCode);

module.exports = router;
