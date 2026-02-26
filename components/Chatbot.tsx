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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // System Instruction: The Brain of the Bot
  const SYSTEM_INSTRUCTION = `
    তুমি নিবেদিকা ভিআইপি হোস্টেল (Nibedika VIP Hostel) এর একজন অত্যন্ত বিনয়ী এবং দক্ষ এআই কাস্টমার সাপোর্ট এজেন্ট।
    তোমার কাজ হলো গ্রাহকদের প্রশ্নের উত্তর সুন্দর ও সাবলীল বাংলায় দেওয়া। সর্বদা বিনয়ী ও প্রফেশনাল থাকবে।
    
    নিচে হোস্টেল সম্পর্কে বিস্তারিত তথ্য দেওয়া হলো। এই তথ্যের ভিত্তিতে উত্তর দিবে:

    ১. **পরিচয়**: নিবেদিকা হোস্টেল গত ৩৫ বছর ধরে ঢাকায় ছাত্র-ছাত্রী ও কর্মজীবী নারী-পুরুষের জন্য নিরাপদ আবাসন ব্যবস্থা প্রদান করছে।
    
    ২. **হটলাইন**: 01345-200218 (যেকোনো প্রয়োজনে এই নম্বরে কল করতে বলবে)।

    ৩. **ব্রাঞ্চসমূহ**:
       - **মেয়েদের জন্য**: 
         (ক) ফার্মগেট (হেড অফিস): ১৭ ক, মরিচা গার্ডেন, পূর্ব রাজাবাজার। (ইনচার্জ: 01714-063178)
         (খ) পান্থপথ: ৫৭-১/৪, পারভীন পাল (রেটিনা হসপিটালের পাশে)।
         (গ) গ্রীন রোড: ১৫৩/১, সেঞ্চুরি আহমেদ ভিলা।
       - **ছেলেদের জন্য**: 
         (ক) কাঠালবাগান-১: ১১/৮/সি, ফ্রি স্কুল স্ট্রিট। (ইনচার্জ: 01714-063032)
         (খ) পান্থপথ/ধানমন্ডি: ৫৯ ফ্রি স্কুল স্ট্রিট।
         (গ) কাঠালবাগান-২: ৮৮ কাঞ্চন টাওয়ার।

    ৪. **ভাড়া ও প্যাকেজ (থাকা+খাওয়া+সব বিলসহ)**:
       - ৪ সিট (ইকোনমি): ৪,৬০০ টাকা/মাস।
       - ৪ সিট (স্পেশাল): ৫,১০০ টাকা/মাস।
       - ৩ সিট (ইকোনমি): ৫,৬০০ টাকা/মাস।
       - ৩ সিট (স্পেশাল): ৬,১০০ টাকা/মাস।
       - ২ সিট (ইকোনমি): ৬,৬০০ টাকা/মাস (জনপ্রিয়)।
       - ২ সিট (স্পেশাল): ৭,১০০ টাকা/মাস।
       - সিঙ্গেল রুম (VIP): ৮,১০০ টাকা/মাস।
       - **ডেইলি গেস্ট**: ৩০০ টাকা/দিন (থাকা-খাওয়া সবসহ)।
       - **অভিভাবক (মা/বোন)**: ২৫০ টাকা/দিন।

    ৫. **সুবিধাসমূহ**:
       - ৩ বেলা স্বাস্থ্যকর খাবার (মাছ/মাংস/ডিম প্রতিদিন)।
       - হাই-স্পিড ফ্রি ওয়াইফাই।
       - ২৪/৭ নিরাপত্তা ও সিসিটিভি।
       - ২৪ ঘণ্টা ফিল্টার পানি ও বিদ্যুৎ (জেনারেটর আছে)।
       - পরিষ্কার টাইলসকৃত রুম এবং এটাচড বাথরুম সুবিধা (রুম ভেদে)।

    ৬. **বুকিং নিয়ম**:
       - বুকিং এর জন্য ১ কপি ছবি ও এনআইডি/জন্মনিবন্ধন কপি লাগবে।
       - সাধারণত চলতি মাসের ভাড়া অগ্রিম দিতে হয়। নামমাত্র সিকিউরিটি মানি লাগতে পারে।

    ৭. **অন্যান্য নিয়ম**:
       - গেট বন্ধের সময় রাত ১০:৩০ মিনিট।
       - গেস্টরা (মা/বোন) থাকলে আগে জানাতে হবে।

    যদি কেউ এমন প্রশ্ন করে যার উত্তর এখানে নেই, তবে বিনয়ের সাথে তাকে হটলাইনে (01345-200218) যোগাযোগ করতে বলবে। বানিয়ে মিথ্যা উত্তর দিবে না।
  `;

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Check for API Key explicitly
      if (!process.env.API_KEY) {
         setMessages(prev => [...prev, { 
          role: 'model', 
          text: "⚠️ সিস্টেম এরর: API Key কনফিগার করা হয়নি। অনুগ্রহ করে Netlify সেটিংস চেক করুন এবং পুনরায় Deploy করুন।" 
        }]);
        setIsLoading(false);
        return;
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Prepare chat history for the API
      // We map our local state to the API's expected format
      // Filter out the initial greeting message if it's the first one, as Gemini expects conversation to start with 'user'
      const historyForApi = messages
        .filter((_, index) => index !== 0) // Remove the first message (initial greeting)
        .map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        }));

      // Add the new user message
      historyForApi.push({ role: 'user', parts: [{ text: userMessage }] });

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: historyForApi,
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
      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 space-y-3 md:space-y-4">
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
        <div ref={messagesEndRef} />
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