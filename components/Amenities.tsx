import React from 'react';
import { ShieldCheck, Wifi, Utensils, Wind, Droplets, Home, Zap, Bus } from 'lucide-react';

const Amenities: React.FC = () => {
  const features = [
    {
      icon: <Utensils className="w-8 h-8" />,
      title: '৩ বেলা স্বাস্থ্যকর খাবার',
      desc: 'মাছ, মাংস ও ডিমসহ প্রতিদিনের মেনু',
    },
    {
      icon: <Wifi className="w-8 h-8" />,
      title: 'ফ্রি হাই-স্পিড ওয়াইফাই',
      desc: 'সারাক্ষণ ইন্টারনেট সুবিধা',
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: '২৪/৭ নিরাপত্তা',
      desc: 'সিসিটিভি ও গার্ড দ্বারা নিয়ন্ত্রিত',
    },
    {
      icon: <Droplets className="w-8 h-8" />,
      title: 'বিশুদ্ধ পানি',
      desc: 'ফিল্টার পানির সুব্যবস্থা',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'বিদ্যুৎ ও জেনারেটর',
      desc: 'নিরবচ্ছিন্ন বিদ্যুৎ ব্যবস্থা',
    },
    {
      icon: <Home className="w-8 h-8" />,
      title: 'টাইলসকৃত রুম',
      desc: 'পরিষ্কার ও আধুনিক পরিবেশ',
    },
    {
      icon: <Wind className="w-8 h-8" />,
      title: 'এসি / নন-এসি',
      desc: 'আপনার পছন্দমত রুম বেছে নিন',
    },
    {
      icon: <Bus className="w-8 h-8" />,
      title: 'সহজ যাতায়াত',
      desc: 'লোকেশনগুলো মেইন রোডের কাছে',
    },
  ];

  return (
    <section id="amenities" className="py-16 md:py-24 bg-white scroll-mt-28">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 inline-block relative pb-3">
            কেন আমাদের বেছে নিবেন?
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 md:w-24 h-1 md:h-1.5 bg-[#fcd34d] rounded-full"></span>
          </h2>
        </div>

        {/* Grid - 2 columns mobile (default), 4 columns desktop (md+) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 border border-gray-100 flex flex-col items-center text-center group h-full"
            >
              <div className="w-16 h-16 bg-[#ccfbf1] rounded-full flex items-center justify-center text-[#0d9488] mb-4 group-hover:bg-[#0d9488] group-hover:text-white transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;