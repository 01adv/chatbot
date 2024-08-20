'use client'
import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;

    // Add the user's message to the chat
    setMessages((prev) => [...prev, { role: 'user', content: input }]);
    
    // Call the API to get the AI response
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: input }),
    });

    const data = await response.json();
    
    // Add the AI's response to the chat
    setMessages((prev) => [...prev, { role: 'ai', content: data.response.generatedText }]);
    
    // Clear the input
    setInput('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg w-full max-w-xl p-6">
        <h1 className="text-2xl font-bold mb-4">Chatbot</h1>
        
        <div className="mb-4 h-64 overflow-y-auto border border-gray-300 p-4 rounded-lg bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-200'}`}
            >
              {msg.content}
            </div>
          ))}
        </div>
        
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            className="text-black flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg">Send</button>
        </form>
      </div>
    </div>
  );
}
