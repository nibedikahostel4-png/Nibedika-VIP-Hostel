import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Send, Bot, User, Loader2 } from 'lucide-react';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'আসসালামু আলাইকুম! আমি নিবেদিকা হোস্টেলের এআই অ্যাসিস্ট্যান্ট। আপনাকে কীভাবে সাহায্য করতে পারি?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const chat = ai.chats.create({
        model: "gemini-3.1-pro-preview",
        config: {
          systemInstruction: `You are a helpful AI assistant for Nibedika VIP Hostel in Dhaka, Bangladesh. 
          Your goal is to provide information about the hostel to potential residents (students and working women/men).
          
          Key Information:
          - Experience: 35 years of experience.
          - Locations: Farmgate, Panthapath, Green Road (Dhaka).
          - Pricing: Starts from 4,600 BDT.
          - Facilities included in package: 3 meals a day, WiFi, Water, Gas, Generator.
          - Security: 24/7 security, CCTV, safe environment.
          - Documents needed for booking: 1 passport size photo, NID/Birth Certificate photocopy, Student ID (for students).
          - Gate closing time: 10:30 PM.
          - Guest policy: Female guests/mothers can stay for 250-300 BDT/day.
          - AC rooms: Electricity bill is separate for AC rooms.
          
          Always be polite and helpful. Respond in Bengali as the primary language, but you can use English terms where appropriate. 
          If you don't know something, suggest they contact the hotline at 01345-200218.`,
        },
      });

      const response = await chat.sendMessage({ message: userMessage });
      const botText = response.text || "দুঃখিত, আমি এই মুহূর্তে উত্তর দিতে পারছি না। অনুগ্রহ করে আবার চেষ্টা করুন।";
      
      setMessages(prev => [...prev, { role: 'model', text: botText }]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "দুঃখিত, কোনো একটি সমস্যা হয়েছে। অনুগ্রহ করে পরে চেষ্টা করুন বা আমাদের হটলাইনে কল করুন।" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[450px] bg-white rounded-xl shadow-inner border border-gray-200 overflow-hidden">
      {/* Chat Header */}
      <div className="bg-teal-600 p-3 text-white flex items-center gap-2">
        <Bot size={20} />
        <span className="font-bold text-sm">নিবেদিকা এআই অ্যাসিস্ট্যান্ট</span>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-teal-100 text-teal-600' : 'bg-white border border-gray-200 text-teal-600'}`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-3 rounded-2xl text-xs md:text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-teal-600 text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none shadow-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-2 items-center bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-none shadow-sm">
              <Loader2 size={16} className="animate-spin text-teal-600" />
              <span className="text-xs text-gray-500">টাইপ করছে...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-gray-200 bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="আপনার প্রশ্নটি লিখুন..."
            className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-teal-600 text-white p-2 rounded-full hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
