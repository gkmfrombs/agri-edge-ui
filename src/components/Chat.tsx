import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sprout } from 'lucide-react';

export default function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hello! I am your Agri-Edge Co-Pilot. What region or crop are we checking today?' }
  ]);
  
  // 1. Create a reference to the bottom of the chat
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 2. Function to trigger the scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 3. Automatically run the scroll function whenever 'messages' change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestedPrompts = [
    "Check Palwal Inventory",
    "What treats Fungal Blight?",
    "Show Amit Sharma's crops"
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const newMessages = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInput('');

    setTimeout(() => {
      let aiResponse = "I'm checking the Knowledge Graph for that...";
      if (text.toLowerCase().includes("palwal")) {
        aiResponse = "Ramesh Singh, Suresh Kumar, and Vikram Patel are located in Palwal. Green Agri Mart in Palwal has High stock of Syngenta Insecticide Y.";
      } else if (text.toLowerCase().includes("fungal")) {
        aiResponse = "Fungal Blight is often triggered by High Humidity. I recommend Syngenta Fungicide X. Rewari Agro currently has this in stock.";
      }
      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full w-full bg-agri-dark">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-agri-green' : 'bg-zinc-800 border border-zinc-700'}`}>
                {msg.role === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-agri-green" />}
              </div>
              <div className={`p-3 rounded-2xl ${msg.role === 'user' ? 'bg-agri-green text-white rounded-tr-none' : 'bg-agri-card border border-zinc-800 text-zinc-200 rounded-tl-none'}`}>
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
            </div>
          </div>
        ))}
        {/* The invisible div we scroll to */}
        <div ref={messagesEndRef} />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-agri-dark/90 backdrop-blur-md border-t border-zinc-800">
        <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
          {suggestedPrompts.map((prompt, idx) => (
            <button 
              key={idx}
              onClick={() => handleSend(prompt)}
              className="flex items-center gap-1.5 whitespace-nowrap bg-zinc-900 border border-zinc-700 text-zinc-300 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-zinc-800 hover:text-agri-green transition-colors"
            >
              <Sprout size={12} />
              {prompt}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
            placeholder="Ask about crops, pests, or inventory..."
            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-full px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-agri-green focus:ring-1 focus:ring-agri-green transition-all"
          />
          <button 
            onClick={() => handleSend(input)}
            className="w-12 h-12 bg-agri-green hover:bg-emerald-400 text-white rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-emerald-900/50 transition-colors"
          >
            <Send size={18} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}