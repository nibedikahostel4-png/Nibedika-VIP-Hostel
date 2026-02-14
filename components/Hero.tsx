import React from 'react';
import { MapPin, Sun, Banknote } from 'lucide-react';

const Hero: React.FC = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 85; // Adjust for sticky header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative bg-gradient-to-b from-[#e0f2fe] via-[#ecfdf5] to-white pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden scroll-mt-28">
      
      {/* Decorative Circles (Optional, to add depth like modern designs) */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-teal-100 opacity-30 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-100 opacity-30 blur-3xl"></div>

      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#fcd34d] text-gray-900 text-sm md:text-base font-bold px-6 py-2 rounded-full mb-8 shadow-sm">
          <Sun size={18} className="text-gray-800" />
          সর্বনিম্ন মাত্র ৪,৬০০ টাকা থেকে
        </div>
        
        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold leading-tight mb-6 text-gray-900">
          থাকা + খাওয়া <br />
          <span className="text-[#0d9488]">সবকিছু একসাথে!</span>
        </h1>
        
        {/* Subtext */}
        <p className="text-base md:text-lg text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
          ছাত্র-ছাত্রী ও কর্মজীবী নারী-পুরুষের জন্য ঢাকার প্রাইম লোকেশনে আধুনিক ও নিরাপদ আবাসন ব্যবস্থা।
          <br className="hidden md:block" /> ৩৫ বছরের অভিজ্ঞতায় আমরাই সেরা।
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
          <a
            href="#pricing"
            onClick={(e) => handleScroll(e, '#pricing')}
            className="flex items-center justify-center gap-2 bg-[#fcd34d] hover:bg-[#fbbf24] text-gray-900 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_4px_14px_0_rgba(252,211,77,0.39)] hover:shadow-[0_6px_20px_rgba(252,211,77,0.23)] hover:-translate-y-1 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-white opacity-20 transform -skew-x-12 -translate-x-full group-hover:animate-[shimmer_1s_infinite]"></div>
            <Banknote size={20} />
            আমাদের ভাড়া তালিকা
          </a>
          <a
            href="#branches"
            onClick={(e) => handleScroll(e, '#branches')}
            className="flex items-center justify-center gap-2 bg-white border-2 border-[#0d9488] text-[#0d9488] hover:bg-[#0d9488] hover:text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-md hover:shadow-lg hover:-translate-y-1"
          >
            <MapPin size={20} />
            আমাদের ব্রাঞ্চসমূহ
          </a>
        </div>
      </div>
      
      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;