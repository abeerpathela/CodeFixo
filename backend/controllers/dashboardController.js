const Question = require('../models/Question');
const UserProgress = require('../models/UserProgress');

// @desc    Get user dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private
const getStats = async (req, res) => {
    try {
        const userId = req.user.id;

        // Total Questions (could be dynamic)
        const totalQuestions = await Question.countDocuments();

        // User Progress
        const solvedProgress = await UserProgress.find({ userId, solved: true }).populate('questionId');

        const totalSolved = solvedProgress.length;

        // Module breakdown
        const solvedByModule = {
            Arrays: 0,
            Strings: 0
        };

        // Difficulty breakdown
        const solvedByDifficulty = {
            Easy: 0,
            Medium: 0,
            Hard: 0
        };

        // Recently Solved
        const recentlySolved = [];

        solvedProgress.forEach(p => {
            const q = p.questionId;
            if (q) {
                if (solvedByModule[q.module] !== undefined) solvedByModule[q.module]++;
                if (solvedByDifficulty[q.difficulty] !== undefined) solvedByDifficulty[q.difficulty]++;

                // Populate recent (sorting handled by query ideally, but here manual for simplicity if small)
            }
        });

        // Get recently solved (DB query is better for sorting)
        const recent = await UserProgress.find({ userId, solved: true })
            .sort({ solvedAt: -1 })
            .limit(10)
            .populate('questionId', 'title difficulty module');

        const formattedRecent = recent.map(r => r.questionId);

        res.json({
            totalSolved,
            totalQuestions,
            solvedByModule,
            solvedByDifficulty,
            recentlySolved: formattedRecent
        });
    } catch (error) {
        console.error(error);
        res.status(500);
        throw new Error('Server Error');
    }
};

module.exports = { getStats };
