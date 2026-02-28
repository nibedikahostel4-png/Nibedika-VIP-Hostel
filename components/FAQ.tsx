import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import Chatbot from './Chatbot';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "হোস্টেলে সিট বুকিং দিতে কি কি নথিপত্র লাগবে?",
      answer: "সিট বুকিং কনফার্ম করার জন্য ১ কপি পাসপোর্ট সাইজের ছবি এবং এনআইডি (NID) কার্ড অথবা জন্মনিবন্ধনের ফটোকপি জমা দিতে হবে। স্টুডেন্টদের ক্ষেত্রে স্টুডেন্ট আইডি কার্ডের ফটোকপি গ্রহণযোগ্য।"
    },
    {
      question: "ভাড়ার সাথে কি বিদ্যুৎ ও অন্যান্য বিল অন্তর্ভুক্ত?",
      answer: "হ্যাঁ, আমাদের প্যাকেজগুলোর ভাড়ার মধ্যেই ৩ বেলা খাবার, ওয়াইফাই, পানি, গ্যাস এবং জেনারেটর বিল অন্তর্ভুক্ত। তবে এসি রুমের ক্ষেত্রে বিদ্যুৎ বিল আলাদা মিটারে হিসেব করা হয়।"
    },
    {
      question: "হোস্টেলের গেট বন্ধ হওয়ার সময় কখন?",
      answer: "নিরাপত্তার স্বার্থে আমাদের হোস্টেলের গেট রাত ১০:৩০ মিনিটে বন্ধ করে দেওয়া হয়। তবে বিশেষ প্রয়োজনে (যেমন: অফিস বা ক্লাস) কর্তৃপক্ষের পূর্ব অনুমতি সাপেক্ষে বিষয়টি বিবেচনা করা হয়।"
    },
    {
      question: "খাবারের মেনু বা মান কেমন?",
      answer: "আমরা ঘরোয়া পরিবেশে স্বাস্থ্যসম্মত খাবার পরিবেশন করি। সপ্তাহে মাছ, মাংস, ডিম, ভর্তা, ভাজি ও ডাল রুটিন অনুযায়ী থাকে। বিশেষ দিনগুলোতে স্পেশাল খাবারের ব্যবস্থা থাকে।"
    },
    {
      question: "গেস্ট বা অভিভাবক কি রাতে থাকতে পারবে?",
      answer: "হ্যাঁ, অভিভাবক (মা/বোন) বা ফিমেল গেস্টদের জন্য আমাদের আলাদা থাকার ব্যবস্থা আছে। সেক্ষেত্রে নামমাত্র ভাড়ায় (২৫০-৩০০ টাকা/দিন) থাকা ও খাওয়ার সুবিধা রয়েছে।"
    },
    {
      question: "সিকিউরিটি ডিপোজিট বা অগ্রিম কত দিতে হয়?",
      answer: "সাধারণত চলতি মাসের ভাড়াই অগ্রিম হিসেবে নেওয়া হয়। তবে সিট বা রুম ভেদে নামমাত্র সিকিউরিটি মানি জমা রাখা হতে পারে যা হোস্টেল ছাড়ার সময় ফেরতযোগ্য।"
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-8 md:py-16 bg-gray-50 scroll-mt-20 md:scroll-mt-28 border-b border-gray-200" id="faq">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-6 md:mb-10">
          <div className="inline-flex items-center justify-center p-2 md:p-3 bg-white rounded-full shadow-sm mb-2 md:mb-4">
            <HelpCircle className="w-4 h-4 md:w-6 md:h-6 text-teal-600" />
          </div>
          <h2 className="text-lg md:text-3xl font-bold text-gray-900 mb-1 md:mb-3">সচরাচর জিজ্ঞাসিত প্রশ্ন</h2>
          <div className="w-12 md:w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          <p className="mt-2 md:mt-4 text-gray-600 max-w-2xl mx-auto font-medium text-[10px] md:text-sm">
            আপনার মনের সাধারণ প্রশ্নগুলোর উত্তর এখানে দেওয়া হলো। এছাড়াও বিস্তারিত জানতে আমাদের এআই অ্যাসিস্ট্যান্টের সাথে কথা বলুন।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start max-w-6xl mx-auto">
          {/* FAQ Accordion */}
          <div className="space-y-2 md:space-y-3">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-md border transition-colors ${
                  openIndex === index 
                    ? 'border-teal-500 shadow-sm' 
                    : 'border-gray-200 shadow-sm hover:border-teal-300'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-3 md:p-4 text-left focus:outline-none"
                >
                  <span className={`text-xs md:text-base font-bold ${openIndex === index ? 'text-teal-700' : 'text-gray-800'}`}>
                    {faq.question}
                  </span>
                  <span className={`ml-3 flex-shrink-0 p-0.5 md:p-1 rounded transition-colors ${openIndex === index ? 'bg-teal-50 text-teal-600' : 'bg-gray-50 text-gray-500'}`}>
                    {openIndex === index ? <Minus size={14} className="md:w-4 md:h-4" /> : <Plus size={14} className="md:w-4 md:h-4" />}
                  </span>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-3 md:p-4 pt-0 text-[10px] md:text-sm text-gray-600 leading-relaxed border-t border-gray-100 mt-1">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chatbot Column */}
          <div className="lg:sticky lg:top-24">
             <div className="mb-3 md:mb-4 flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4">
                <div className="text-center sm:text-left">
                  <h3 className="text-base md:text-xl font-bold text-gray-800 mb-0.5 md:mb-1">এআই অ্যাসিস্ট্যান্ট</h3>
                  <p className="text-gray-600 text-[10px] md:text-sm">আপনার অন্য কোনো প্রশ্ন থাকলে সরাসরি জিজ্ঞাসা করুন।</p>
                </div>
                <a
                  href={`https://wa.me/8801345200218?text=${encodeURIComponent("আসসালামু আলাইকুম, আমি নিবেদিকা হোস্টেল সম্পর্কে বিস্তারিত জানতে চাই।")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 flex items-center gap-1.5 md:gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-3 py-1.5 md:px-4 md:py-2 rounded-md font-bold shadow-sm transition-colors text-[10px] md:text-sm"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
             </div>
             <Chatbot />
          </div>
        </div>
        
        {/* Still have questions? */}
        <div className="text-center mt-10 md:mt-16 border-t border-gray-200 pt-6 md:pt-10">
          <p className="text-gray-600 mb-3 md:mb-4 text-[10px] md:text-sm">আরও কিছু জানার আছে?</p>
          <a 
            href="tel:01345200218"
            className="inline-flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 md:px-6 md:py-2.5 rounded-md font-bold transition-colors shadow-sm text-xs md:text-sm"
          >
            সরাসরি কল করুন
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;