const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Question = require('./models/Question');

dotenv.config();

const checkDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to: ${mongoose.connection.host}`);

        const count = await Question.countDocuments();
        console.log(`Total questions: ${count}`);

        const modules = await Question.distinct('module');
        console.log(`Modules found in DB: ${JSON.stringify(modules)}`);

        const samples = await Question.find().limit(5);
        console.log('Sample questions:');
        samples.forEach(q => {
            console.log(`- ${q.title} [Module: ${q.module}, Difficulty: ${q.difficulty}]`);
        });

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkDB();
