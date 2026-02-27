import React from 'react';
import { MapPin, Banknote, Star, ShieldCheck } from 'lucide-react';

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
    <section id="home" className="relative min-h-[80vh] flex items-center justify-center pt-28 pb-16 md:pt-40 md:pb-24 overflow-hidden scroll-mt-20">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://drive.google.com/thumbnail?id=1OaLYB_-01C4Da_8XydaW7dwJlY6_nhum&sz=w1920")',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      
      {/* Very Light Dark Teal Gradient Overlay - Just enough for text readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-teal-900/30 via-teal-900/40 to-teal-950/60"></div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-3xl flex flex-col items-center text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 bg-black/20 backdrop-blur-sm border border-white/20 text-white text-[9px] md:text-xs font-bold px-3 py-1 md:px-4 md:py-1.5 rounded-full mb-4 md:mb-6 shadow-sm">
          <span className="flex h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-[#FCD34D] animate-pulse"></span>
          সর্বনিম্ন মাত্র ৪,৬০০ টাকা থেকে
        </div>

        {/* Headline */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.3] mb-3 md:mb-5 text-white tracking-tight drop-shadow-lg">
          থাকা + খাওয়া <br />
          <span className="text-[#FCD34D]">
            সবকিছু একসাথে!
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-[11px] sm:text-xs md:text-sm text-gray-100 font-medium mb-8 md:mb-10 max-w-xl leading-relaxed drop-shadow-md">
          ছাত্র-ছাত্রী ও কর্মজীবী নারী-পুরুষের জন্য ঢাকার প্রাইম লোকেশনে আধুনিক ও নিরাপদ আবাসন ব্যবস্থা। ৩৫ বছরের অভিজ্ঞতায় আমরাই সেরা।
        </p>

        {/* Buttons - Exact 2x2 Grid on Mobile */}
        <div className="flex flex-wrap justify-center gap-2 max-w-[300px] md:max-w-md mx-auto mb-10 md:mb-12">
          <a
            href="#branches"
            onClick={(e) => handleScroll(e, '#branches')}
            className="flex items-center justify-center gap-1.5 bg-white border border-transparent text-teal-800 hover:bg-gray-100 px-3 py-1.5 md:px-4 md:py-2 rounded-full font-bold text-[10px] md:text-xs transition-all shadow-md min-w-[130px] md:min-w-[140px]"
          >
            <MapPin size={12} className="md:w-3.5 md:h-3.5" />
            আমাদের ব্রাঞ্চসমূহ
          </a>

          <a
            href="#pricing"
            onClick={(e) => handleScroll(e, '#pricing')}
            className="flex items-center justify-center gap-1.5 bg-[#FCD34D] hover:bg-[#fbbf24] text-gray-900 px-3 py-1.5 md:px-4 md:py-2 rounded-full font-bold text-[10px] md:text-xs transition-all shadow-md min-w-[130px] md:min-w-[140px]"
          >
            <Banknote size={12} className="md:w-3.5 md:h-3.5" />
            আমাদের ভাড়া তালিকা
          </a>
          


          <a
            href={`https://wa.me/8801345200218?text=${encodeURIComponent("আসসালামু আলাইকুম, আমি নিবেদিকা হোস্টেল সম্পর্কে বিস্তারিত জানতে চাই।")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full font-bold text-[10px] md:text-xs transition-all shadow-md min-w-[130px] md:min-w-[140px]"
          >
            <svg viewBox="0 0 24 24" className="w-3 h-3 md:w-3.5 md:h-3.5 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="pt-5 md:pt-6 border-t border-white/20 flex items-center justify-center gap-4 md:gap-6 w-full max-w-sm md:max-w-md mx-auto">
              <div className="flex flex-col items-center gap-1">
                <div className="flex text-[#FCD34D]">
                  <Star size={12} className="fill-current md:w-4 md:h-4" /><Star size={12} className="fill-current md:w-4 md:h-4" /><Star size={12} className="fill-current md:w-4 md:h-4" /><Star size={12} className="fill-current md:w-4 md:h-4" /><Star size={12} className="fill-current md:w-4 md:h-4" />
                </div>
                <span className="text-[9px] md:text-xs font-semibold text-gray-200 tracking-wide drop-shadow-sm">৩৫ বছরের অভিজ্ঞতা</span>
              </div>
              <div className="w-px h-8 bg-white/30"></div>
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1 text-teal-300">
                  <ShieldCheck size={14} className="md:w-5 md:h-5" />
                  <span className="font-bold text-xs md:text-sm text-white drop-shadow-sm">১০০%</span>
                </div>
                <span className="text-[9px] md:text-xs font-semibold text-gray-200 tracking-wide drop-shadow-sm">নিরাপদ পরিবেশ</span>
              </div>
            </div>

          </div>
    </section>
  );
};

export default Hero;