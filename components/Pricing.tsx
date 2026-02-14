import React from 'react';
import { CheckCircle2, Phone, Star } from 'lucide-react';

const Pricing: React.FC = () => {
  const commonFeatures = [
    "৩ বেলা স্বাস্থ্যকর খাবার",
    "ফ্রি হাই-স্পিড ওয়াইফাই",
    "২৪/৭ নিরাপত্তা ও সিসিটিভি",
    "ফিল্টার পানির সুব্যবস্থা",
    "জেনারেটর সুবিধা",
    "টাইলসকৃত পরিষ্কার রুম",
  ];

  const allPackages = [
    {
      title: "৪ সিট (ইকোনমি)",
      price: "৪,৬০০",
      period: "/মাস",
      features: [...commonFeatures, "বাজেট ফ্রেন্ডলি"],
      highlight: false
    },
    {
      title: "৪ সিট (স্পেশাল)",
      price: "৫,১০০",
      period: "/মাস",
      features: [...commonFeatures, "উন্নত ভেন্টিলেশন"],
      highlight: false
    },
    {
      title: "৩ সিট (ইকোনমি)",
      price: "৫,৬০০",
      period: "/মাস",
      features: [...commonFeatures, "পর্যাপ্ত আলো বাতাস"],
      highlight: false
    },
    {
      title: "৩ সিট (স্পেশাল)",
      price: "৬,১০০",
      period: "/মাস",
      features: [...commonFeatures, "সেমি-প্রাইভেট"],
      highlight: false
    },
    {
      title: "২ সিট (ইকোনমি)",
      price: "৬,৬০০",
      period: "/মাস",
      features: [...commonFeatures, "শান্তিপূর্ণ পরিবেশ"],
      highlight: true
    },
    {
      title: "২ সিট (স্পেশাল)",
      price: "৭,১০০",
      period: "/মাস",
      features: [...commonFeatures, "প্রিমিয়াম ফিনিশিং"],
      highlight: false
    },
    {
      title: "সিঙ্গেল রুম (VIP)",
      price: "৮,১০০",
      period: "/মাস",
      features: [...commonFeatures, "সম্পূর্ণ ব্যক্তিগত প্রাইভেসি"],
      highlight: false
    },
    {
      title: "ডেইলি গেস্ট",
      price: "৩০০",
      period: "/দিন",
      features: [
        "৩ বেলা খাবার আলোচনা সাপেক্ষে",
        "স্বল্পমেয়াদী থাকার ব্যবস্থা",
        "নিরাপদ পরিবেশ",
        "ওয়াইফাই ও অন্যান্য সুবিধা",
      ],
      highlight: false,
      isDaily: true
    }
  ];

  const generateWhatsAppLink = (title: string, price: string) => {
    const message = `আসসালামু আলাইকুম, আমি "${title}" (${price} টাকা) প্যাকেজটি বুকিং দিতে চাই। বিস্তারিত জানাবেন প্লিজ?`;
    return `https://wa.me/8801345200218?text=${encodeURIComponent(message)}`;
  };

  const guardianWaLink = `https://wa.me/8801345200218?text=${encodeURIComponent("আসসালামু আলাইকুম, আমি অভিভাবকদের জন্য ২৫০ টাকার প্যাকেজটি বুকিং দিতে চাই।")}`;

  return (
    <section id="pricing" className="py-16 md:py-24 bg-gray-50 scroll-mt-28">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            সাশ্রয়ী ভাড়ার তালিকা
          </h2>
          <p className="text-sm md:text-lg text-gray-600 font-medium max-w-3xl mx-auto">
            আমাদের প্রতিটি প্যাকেজে থাকা, ৩ বেলা খাওয়া এবং অন্যান্য সকল ইউটিলিটি বিল অন্তর্ভুক্ত।
          </p>
          <div className="w-16 md:w-24 h-1 bg-[#fcd34d] mx-auto rounded-full mt-3 md:mt-4"></div>
        </div>

        {/* Main Grid: 2 Columns on Mobile, 4 Columns on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-12 md:mb-20 max-w-7xl mx-auto">
          {allPackages.map((pkg, index) => (
            <div 
              key={index}
              className={`bg-white rounded-xl md:rounded-2xl p-3 md:p-6 border transition-all duration-300 flex flex-col h-full group ${
                pkg.highlight 
                  ? 'border-[#0d9488] shadow-xl scale-100 lg:scale-105 z-10 ring-1 ring-[#0d9488]/20 relative' 
                  : 'border-gray-200 shadow-sm hover:shadow-lg hover:border-[#0d9488]/50 relative'
              }`}
            >
              {pkg.highlight && (
                <div className="absolute top-0 right-0 bg-[#0d9488] text-white text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 rounded-bl-lg rounded-tr-xl shadow-sm">
                  জনপ্রিয়
                </div>
              )}
              
              <h4 className="text-sm md:text-xl font-bold text-gray-800 mb-1 md:mb-2 leading-tight">{pkg.title}</h4>
              <div className="flex flex-wrap items-baseline mb-2 md:mb-4">
                <span className={`text-lg md:text-3xl font-extrabold ${pkg.isDaily ? 'text-gray-800' : 'text-[#0d9488]'}`}>
                  ৳{pkg.price}
                </span>
                <span className="text-[10px] md:text-base text-gray-500 font-medium ml-1">{pkg.period}</span>
              </div>
              
              <div className="flex-grow">
                <div className="h-px bg-gray-100 w-full mb-3 md:mb-4 group-hover:bg-[#fcd34d]/50 transition-colors"></div>
                <ul className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-1.5 md:gap-2 text-[10px] md:text-sm text-gray-600">
                      <CheckCircle2 className={`shrink-0 mt-0.5 w-3 h-3 md:w-4 md:h-4 ${pkg.isDaily ? 'text-[#fcd34d]' : 'text-[#0d9488]'}`} />
                      <span className="leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a 
                href={generateWhatsAppLink(pkg.title, pkg.price)}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full flex items-center justify-center gap-1.5 md:gap-2 py-2 md:py-3 rounded-lg text-xs md:text-base font-bold transition-colors mt-auto shadow-sm ${
                   pkg.highlight
                    ? 'bg-[#fcd34d] hover:bg-[#fbbf24] text-gray-900'
                    : pkg.isDaily 
                        ? 'bg-[#0d9488] hover:bg-[#0f766e] text-white'
                        : 'bg-gray-900 hover:bg-black text-white'
                }`}
              >
                <Phone className="w-3 h-3 md:w-[18px] md:h-[18px]" />
                Book Now
              </a>
            </div>
          ))}
        </div>

        {/* Guardian Package Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#1e293b] rounded-2xl p-6 md:p-10 text-center shadow-2xl border border-gray-700 relative overflow-hidden">
             {/* Decorative Background Glow */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-teal-500/5 blur-3xl rounded-full pointer-events-none"></div>

             <div className="relative z-10 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-3">
                    <Star className="text-[#fcd34d] fill-[#fcd34d] w-6 h-6 md:w-7 md:h-7" />
                    <h3 className="text-xl md:text-3xl font-bold text-[#fcd34d]">
                      অভিভাবকদের জন্য বিশেষ সুবিধা
                    </h3>
                </div>
                
                <p className="text-gray-300 text-sm md:text-xl leading-relaxed max-w-2xl mb-6 md:mb-8">
                  মা অথবা মহিলা অভিভাবক মাত্র <span className="text-white font-bold text-lg md:text-2xl mx-1">২৫০ টাকায়</span> (থাকা+খাবার) বর্ডারের সাথে থাকতে পারবেন।
                </p>

                <a 
                  href={guardianWaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#fcd34d] hover:bg-[#fbbf24] text-gray-900 px-6 py-2.5 md:px-8 md:py-3 rounded-full font-bold text-sm md:text-lg transition-all shadow-lg hover:shadow-[#fcd34d]/30 hover:-translate-y-1"
                >
                  <Phone className="w-4 h-4 md:w-5 md:h-5" />
                  Book Now
                </a>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Pricing;