import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Send, Bot, Loader2 } from 'lucide-react';

// Message Type Definition
type Message = {
  role: 'user' | 'model';
  text: string;
};

const Chatbot: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'আসসালামু আলাইকুম! আমি নিবেদিকা হোস্টেলের এআই অ্যাসিস্ট্যান্ট। আমি আপনাকে কীভাবে সাহায্য করতে পারি? সিট বুকিং, ভাড়া বা লোকেশন সম্পর্কে জানতে চাইতে পারেন।' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // System Instruction: The Brain of the Bot
  const SYSTEM_INSTRUCTION = `
    তুমি নিবেদিকা ভিআইপি হোস্টেল (Nibedika VIP Hostel) এর একজন অত্যন্ত বিনয়ী এবং দক্ষ এআই কাস্টমার সাপোর্ট এজেন্ট।
    তোমার কাজ হলো গ্রাহকদের প্রশ্নের উত্তর খুব সংক্ষেপে, সুন্দর ও সাবলীল বাংলায় দেওয়া। উত্তরগুলো ২-৩ লাইনের মধ্যে রাখার চেষ্টা করবে।

    গুরুত্বপূর্ণ তথ্য:
    ১. হটলাইন: 01345-200218 (যেকোনো প্রয়োজনে কল করতে বলবে)।
    ২. ব্রাঞ্চ: ফার্মগেট, পান্থপথ, গ্রীন রোড, কাঠালবাগান।
    ৩. ভাড়া: ৪৬০০ টাকা থেকে শুরু। থাকা-খাওয়া সবসহ।
    ৪. সুবিধা: ৩ বেলা খাবার, ওয়াইফাই, ২৪/৭ নিরাপত্তা, জেনারেটর।

    যদি কোনো প্রশ্নের উত্তর জানা না থাকে, তবে বিনীতভাবে হটলাইনে যোগাযোগ করতে বলবে। মিথ্যা তথ্য দিবে না।
  `;

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Use VITE_GEMINI_API_KEY for client-side access
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (!apiKey) {
         setMessages(prev => [...prev, { 
          role: 'model', 
          text: "⚠️ সিস্টেম এরর: API Key কনফিগার করা হয়নি। অনুগ্রহ করে Netlify Environment Variables-এ VITE_GEMINI_API_KEY যুক্ত করুন।" 
        }]);
        setIsLoading(false);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      
      // Prepare chat history for the API
      const historyForApi = messages
        .filter((_, index) => index !== 0) // Remove the first message (initial greeting)
        .map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        }));

      // Add the new user message
      // historyForApi.push({ role: 'user', parts: [{ text: userMessage }] }); // Not needed for generateContent if using contents

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-latest',
        contents: [
          ...historyForApi,
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        }
      });

      const botResponseText = response.text || "দুঃখিত, আমি এই মুহূর্তে উত্তর দিতে পারছি না। দয়া করে হটলাইনে কল করুন।";

      setMessages(prev => [...prev, { role: 'model', text: botResponseText }]);

    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: "দুঃখিত, টেকনিক্যাল সমস্যার কারণে আমি উত্তর দিতে পারছি না। দয়া করে সরাসরি আমাদের হটলাইনে কল করুন: 01345-200218" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden h-[450px] md:h-[600px] flex flex-col">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-3 md:p-4 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="bg-white/20 p-1.5 md:p-2 rounded-full">
            <Bot size={20} className="md:w-6 md:h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base md:text-lg">নিবেদিকা AI সাপোর্ট</h3>
            <span className="flex items-center gap-1 text-[10px] md:text-xs text-teal-100">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full animate-pulse"></span>
              Active Now
            </span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 space-y-3 md:space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] p-3 md:p-4 rounded-2xl text-xs md:text-base leading-relaxed shadow-sm ${
                msg.role === 'user'
                  ? 'bg-teal-600 text-white rounded-br-none'
                  : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        
        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 p-3 md:p-4 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-2">
              <Loader2 className="w-4 h-4 md:w-5 md:h-5 text-teal-600 animate-spin" />
              <span className="text-xs md:text-sm text-gray-500">লিখছে...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-3 md:p-4 bg-white border-t border-gray-100 shrink-0">
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2 md:px-4 md:py-3 focus-within:ring-2 focus-within:ring-teal-500/50 transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="আপনার প্রশ্ন লিখুন..."
            className="flex-1 bg-transparent text-sm md:text-base outline-none text-gray-700 placeholder:text-gray-400"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`p-2 md:p-2.5 rounded-full transition-colors ${
              input.trim() && !isLoading 
                ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-sm' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send size={16} className="md:w-5 md:h-5" />
          </button>
        </div>
        <div className="text-center mt-2">
          <span className="text-[10px] text-gray-400">Powered by Gemini AI</span>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;