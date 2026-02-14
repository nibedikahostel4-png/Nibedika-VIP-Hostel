import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

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
    <section className="py-16 md:py-24 bg-teal-50/50 scroll-mt-28 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-sm mb-4">
            <HelpCircle className="w-6 h-6 text-teal-600" />
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">সচরাচর জিজ্ঞাসিত প্রশ্ন</h2>
          <div className="w-16 md:w-24 h-1 bg-[#fcd34d] mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto font-medium">
            আপনার মনের সাধারণ প্রশ্নগুলোর উত্তর এখানে দেওয়া হলো। এছাড়াও বিস্তারিত জানতে আমাদের হটলাইনে কল করতে পারেন।
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl border transition-all duration-300 ${
                openIndex === index 
                  ? 'border-teal-500 shadow-lg ring-1 ring-teal-500/20' 
                  : 'border-gray-200 shadow-sm hover:border-teal-300'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-4 md:p-6 text-left focus:outline-none"
              >
                <span className={`text-base md:text-lg font-bold ${openIndex === index ? 'text-teal-700' : 'text-gray-800'}`}>
                  {faq.question}
                </span>
                <span className={`ml-4 flex-shrink-0 p-1 rounded-full transition-colors ${openIndex === index ? 'bg-teal-100 text-teal-600' : 'bg-gray-100 text-gray-500'}`}>
                  {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-4 md:p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-50 mt-1">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Still have questions? */}
        <div className="text-center mt-10">
          <p className="text-gray-600 mb-4">আরও কিছু জানার আছে?</p>
          <a 
            href="tel:01345200218"
            className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-full font-bold transition-all shadow-lg hover:-translate-y-1"
          >
            সরাসরি কল করুন
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;