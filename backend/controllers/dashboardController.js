const Question = require('../models/Question');
const UserProgress = require('../models/UserProgress');

// @desc    Get user dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private
const getStats = async (req, res) => {
    try {
        const userId = req.user.id;

        // Total Questions
        const totalQuestions = await Question.countDocuments();

        // User Progress
        const solvedProgress = await UserProgress.find({ userId, solved: true }).populate('questionId');
        const totalSolved = solvedProgress.length;

        // Module breakdown
        const modulesList = ['Arrays', 'Strings', 'Loops', 'Functions', 'Recursion', 'Linked List', 'Stack', 'Queues'];
        const solvedByModule = {};
        modulesList.forEach(m => solvedByModule[m] = 0);

        // Difficulty breakdown
        const solvedByDifficulty = { Easy: 0, Medium: 0, Hard: 0 };

        solvedProgress.forEach(p => {
            const q = p.questionId;
            if (q) {
                if (solvedByModule[q.module] !== undefined) solvedByModule[q.module]++;
                if (solvedByDifficulty[q.difficulty] !== undefined) solvedByDifficulty[q.difficulty]++;
            }
        });

        // Current Streak Calculation
        const solveDates = solvedProgress
            .map(p => p.solvedAt)
            .filter(d => d)
            .sort((a, b) => b - a);

        let currentStreak = 0;
        if (solveDates.length > 0) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            let lastDate = new Date(solveDates[0]);
            lastDate.setHours(0, 0, 0, 0);

            const diffDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));
            if (diffDays <= 1) {
                currentStreak = 1;
                for (let i = 1; i < solveDates.length; i++) {
                    const currentDate = new Date(solveDates[i]);
                    currentDate.setHours(0, 0, 0, 0);
                    const d = Math.floor((lastDate - currentDate) / (1000 * 60 * 60 * 24));
                    if (d === 1) {
                        currentStreak++;
                        lastDate = currentDate;
                    } else if (d > 1) {
                        break;
                    }
                }
            }
        }

        // Global Ranking
        const allUserProgress = await UserProgress.aggregate([
            { $match: { solved: true } },
            { $group: { _id: '$userId', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);
        const rankIndex = allUserProgress.findIndex(up => up._id.toString() === userId.toString());
        const globalRank = rankIndex === -1 ? 'Unranked' : `#${rankIndex + 1}`;
        const User = require('../models/User');
        const totalUsers = await User.countDocuments();

        // Goals System
        const goals = [
            { id: 1, title: 'Array Beginner', target: 5, module: 'Arrays' },
            { id: 2, title: 'String Basics', target: 5, module: 'Strings' },
            { id: 3, title: 'Loop Master', target: 10, module: 'Loops' },
            { id: 4, title: 'Recursion Hero', target: 5, module: 'Recursion' },
            { id: 5, title: 'Stack & Queue Wiz', target: 5, module: 'Stack' }
        ];

        const goalsWithProgress = goals.map(g => ({
            ...g,
            current: solvedByModule[g.module] || 0,
            achieved: (solvedByModule[g.module] || 0) >= g.target
        }));

        const targetAchieved = Math.round((goalsWithProgress.filter(g => g.achieved).length / goals.length) * 100);

        // Recently Solved
        const recent = await UserProgress.find({ userId, solved: true })
            .sort({ solvedAt: -1 })
            .limit(10)
            .populate('questionId', 'title difficulty module');

        res.json({
            totalSolved,
            totalQuestions,
            solvedByModule,
            solvedByDifficulty,
            recentlySolved: recent.map(r => r.questionId),
            currentStreak,
            globalRank,
            totalUsers,
            targetAchieved,
            goals: goalsWithProgress
        });
    } catch (error) {
        console.error(error);
        res.status(500);
        throw new Error('Server Error');
    }
};

module.exports = { getStats };
