const { analyzeCode } = require('../utils/aiService');
const CodeAnalysis = require('../models/CodeAnalysis');

// @desc    Analyze code using AI
// @route   POST /api/code/analyze
// @access  Private
const analyzeUserCode = async (req, res) => {
    const { code, language } = req.body;

    if (!code || !language) {
        res.status(400);
        throw new Error('Please provide code and language');
    }

    try {
        const analysis = await analyzeCode(code, language);

        // Optional: Save analysis history
        await CodeAnalysis.create({
            userId: req.user.id,
            code,
            language,
            analysis,
        });

        res.json({ analysis });
    } catch (error) {
        console.error(error);
        res.status(500);
        throw new Error('AI Analysis failed');
    }
};

module.exports = { analyzeUserCode };
