const OpenAI = require('openai');

const client = new OpenAI({
    baseURL: "https://router.huggingface.co/v1",
    apiKey: process.env.HF_TOKEN
});

const analyzeCode = async (code, language, context = null) => {
    try {
        let prompt;
        if (context) {
            // Prompt for Practice Questions (with context)
            prompt = `
You are an expert coding tutor. Review this ${language} solution for the problem: "${context.title}".

Problem Description:
${context.description}

User's Code:
${code}

Instructions:
1.  Check for logical correctness against the problem requirements.
2.  Analyze time and space complexity.
3.  Suggest improvements or cleaner approaches.
4.  If there are errors, explain them clearly.
5.  IMPORTANT: Output strictly in valid JSON format only. No markdown formatting around the JSON.

Expected JSON Format:
{
    "isCorrect": boolean, // true if logic is correct and passes requirements, false otherwise
    "title": "string", // e.g. "Solution is Correct" or "Logic Error Found"
    "summary": "string", // Brief summary
    "details": [ // Array of strings for bullet points
        "Point 1",
        "Point 2"
    ]
}
`;
        } else {
            // Prompt for General Code Analysis
            prompt = `
You are an expert senior developer. Analyze the following ${language} code.

Code:
${code}

Instructions:
1.  Check for logical and syntax integrity.
2.  If the code is bug-free, efficient, and follows best practices, mark it as "correct".
3.  If there are bugs, inefficiencies, or bad practices, mark it as "incorrect".
4.  Provide a summary and detailed feedback points.
5.  IMPORTANT: Output strictly in valid JSON format only. No markdown formatting around the JSON.

Expected JSON Format:
{
    "isCorrect": boolean, // true if 100% correct, false otherwise
    "title": "string", // e.g. "Code is 100% Correct" or "Issues Found"
    "summary": "string", // Brief summary
    "details": [ // Array of strings for bullet points
        "Point 1",
        "Point 2"
    ]
}
`;
        }

        const completion = await client.chat.completions.create({
            model: "moonshotai/Kimi-K2-Instruct-0905",
            messages: [
                { role: "system", content: "You are a helpful and strict code review assistant. You always output valid JSON." },
                { role: "user", content: prompt }
            ],
            temperature: 0.3,
            max_tokens: 1024,
        });

        let content = completion.choices[0].message.content;

        // Strip markdown fences if present
        content = content.replace(/```json/g, '').replace(/```/g, '').trim();

        return content;
    } catch (error) {
        console.error("AI Service Error:", error);
        throw new Error("Failed to generate AI analysis. Please try again later.");
    }
};

module.exports = { analyzeCode };
