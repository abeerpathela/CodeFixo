const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // Auto-seeding logic
        const Question = require('../models/Question');
        const questions = require('../utils/seedQuestions');

        const count = await Question.countDocuments();
        console.log(`Current question count in database: ${count}`);

        if (count === 0) {
            console.log('No questions found in database. Seeding initial data...');
            try {
                await Question.insertMany(questions);
                console.log('Database seeded successfully with practice questions.');
            } catch (seedError) {
                console.error(`Error during seeding: ${seedError.message}`);
            }
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
