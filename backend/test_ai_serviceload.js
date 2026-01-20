process.env.HF_TOKEN = 'test_token';
try {
    const aiService = require('./utils/aiService');
    console.log("aiService loaded successfully");
} catch (e) {
    console.error("Failed to load aiService:", e);
}
