const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GEMINI_KEY });

async function main(prompt, tone) {
    // const response = await ai.models.generateContent({
    //     model: "gemini-2.0-flash",
    //     systemInstruction: `
    //                 You are a professional email writer. Generate ONE single, clean, ready-to-send email.

    //                 Output format:
    //                 Subject: <subject line>

    //                 <email body>

    //                 STRICT RULES:
    //                 - ONE email only. Never give multiple options or templates.
    //                 - No tips, no notes, no explanations before or after the email.
    //                 - No "Key things to remember", no "How to customize" sections.
    //                 - Use [Your Name], [Company] as placeholders when needed.
    //                 - Use the tone provided by the user.
    //                 `,
    //     contents: prompt,
    // });
    // return response.text;

    let userInput = `
            prompt: ${prompt}  
            tone: ${tone}  
            `
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: userInput,
        config: {
            systemInstruction: `
                    You are a professional email writer. Generate ONE single, clean, ready-to-send email.

                    Output format:
                    Subject: <subject line>

                    <email body>

                    STRICT RULES:
                    - ONE email only. Never give multiple options or templates.
                    - No tips, no notes, no explanations before or after the email.
                    - No "Key things to remember", no "How to customize" sections.
                    - Use [Your Name], [Company] as placeholders when needed.
                    - Use the tone provided by the user.
                    `
        }
    });
    return response.text;
}

module.exports = main;
