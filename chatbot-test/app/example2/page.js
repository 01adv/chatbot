'use client'
import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Make sure the environment variable is correctly loaded
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY;

if (!apiKey) {
  console.error("Google Generative AI API Key is missing!");
}

const genAI = new GoogleGenerativeAI(apiKey);

const TextGen = () => {
    const [text, setText] = useState('');

    const handleClick = async () => {
        try {
            const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent("Write a story about an AI and magic");
            const response = await result.response;
            const generatedText = await response.text();
            setText(generatedText);
        } catch (error) {
            console.error("Error generating content:", error);
        }
    };

    return (
        <div className="p-20 flex items-center justify-center">
            <h2>Hellooooo world</h2>
            <button className="p-4" onClick={handleClick}>Click</button>
            {text && <p>{text}</p>}
        </div>
    );
};

export default TextGen;
