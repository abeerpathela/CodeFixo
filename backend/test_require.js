try {
    const OpenAI = require('openai');
    console.log("OpenAI loaded successfully");
    const client = new OpenAI({ apiKey: 'test' });
    console.log("Client created");
} catch (e) {
    console.error("Failed:", e);
}
