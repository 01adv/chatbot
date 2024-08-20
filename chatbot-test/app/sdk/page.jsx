'use client'
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { useState } from 'react';


const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY;


if (!googleApiKey) {
    console.error("Google Generative AI API Key is missing!");
  }

  

  const TextGen = () => {
    const [textt, setText] = useState('');

    const handleClick = async () => {
        try {
            const model = google('models/gemini-1.5-flash', {
              apiKey: googleApiKey, // Pass the API key when initializing the model
            });
      
            const { text } = await generateText({
              model,
              prompt: 'Write a vegetarian lasagna recipe for 4 people.',
            });
            console.log(googleApiKey)
      
            setText(text);
          } catch (error) {
            console.error("Error generating text:", error);
          }
    };

    return (
        <div className="p-20 flex items-center justify-center">
            <h2>Hellooooo world</h2>
            <button className="p-4" onClick={handleClick}>Click</button>
            {textt && <p>{textt}</p>}
        </div>
    );
};

export default TextGen;