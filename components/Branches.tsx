import React, { useState } from 'react';
import { Phone, Building2, CalendarCheck, MapPin, X, Maximize2 } from 'lucide-react';

interface Branch {
  name: string;
  address: string;
  image: string;
  mapLink: string;
  isHeadOffice?: boolean;
}

const BranchCard: React.FC<{ branch: Branch; onImageClick: (img: string) => void }> = ({ branch, onImageClick }) => {
  // WhatsApp Message for specific branch
  const waLink = `https://wa.me/8801345200218?text=${encodeURIComponent(`আসসালামু আলাইকুম, আমি ${branch.name} -এ সিট বুকিং দিতে চাই।`)}`;

  return (
    <div className={`bg-white rounded-xl p-3 md:p-4 border shadow-sm hover:shadow-md transition-all flex flex-row items-center gap-3 md:gap-5 ${branch.isHeadOffice ? 'border-teal-500 ring-2 ring-teal-500/20 relative overflow-hidden' : 'border-gray-200'}`}>
      
      {/* Decorative Background for Head Office */}
      {branch.isHeadOffice && (
         <div className="absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24 bg-teal-50 rounded-bl-full -mr-8 -mt-8 md:-mr-12 md:-mt-12 z-0 pointer-events-none"></div>
      )}

      {/* Left: Text Information & Buttons */}
      <div className="flex-1 flex flex-col justify-between min-w-0 relative z-10 h-full py-1">
        <div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1.5">
              <h4 className="text-sm md:text-lg font-bold text-gray-800 leading-tight">{branch.name}</h4>
              {branch.isHeadOffice && (
                  <span className="inline-flex items-center gap-1 bg-gradient-to-r from-teal-600 to-teal-800 text-white text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full shadow-lg ring-1 ring-teal-300 animate-[pulse_3s_ease-in-out_infinite]">
                      <Building2 className="w-3 h-3 md:w-3.5 md:h-3.5 text-yellow-300" />
                      হেড অফিস
                  </span>
              )}
          </div>
          <p className="text-gray-600 leading-relaxed text-[11px] md:text-sm font-medium whitespace-pre-line break-words mb-2 md:mb-3 line-clamp-3 md:line-clamp-none">
            {branch.address}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 mt-auto">
          {/* Book Now Button (Yellow) */}
          <a 
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#fcd34d] hover:bg-[#fbbf24] text-gray-900 text-[10px] md:text-sm font-bold px-2.5 py-1.5 md:px-4 md:py-2 rounded-full shadow-sm transition-transform active:scale-95 border border-yellow-400"
          >
            <CalendarCheck className="w-3 h-3 md:w-4 md:h-4" />
            Book Now
          </a>

          {/* Location Button (Highlighted with Icon) */}
          <a 
            href={branch.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 md:gap-2 bg-white hover:bg-gray-50 border border-gray-200 hover:border-blue-200 text-gray-700 px-2.5 py-1.5 md:px-4 md:py-2 rounded-full shadow-sm hover:shadow-md transition-all active:scale-95 group"
            title="গুগল ম্যাপে দেখুন"
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/a/aa/Google_Maps_icon_%282020%29.svg" 
              alt="Google Maps" 
              className="w-3 h-3 md:w-4 md:h-4 group-hover:scale-110 transition-transform"
            />
            <span className="text-[10px] md:text-sm font-bold group-hover:text-blue-600">Location</span>
          </a>
        </div>
      </div>

      {/* Right: Image Only */}
      <div className="w-24 md:w-40 shrink-0 self-center relative z-10">
        <div 
          className="aspect-[3/4] overflow-hidden rounded-lg border border-gray-100 shadow-sm w-full group cursor-zoom-in relative"
          onClick={() => onImageClick(branch.image)}
        >
           <img 
            src={branch.image} 
            alt={branch.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
           />
           {/* Zoom Hint Overlay */}
           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
              <div className="bg-white/90 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm scale-75 group-hover:scale-100">
                <Maximize2 size={14} className="text-gray-700" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const Branches: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const femaleBranches: Branch[] = [
    {
      name: 'ফার্মগেট ব্রাঞ্চ',
      address: '17 ক, মরিচা গার্ডেন, পূর্ব রাজাবাজার।\n(ফার্মগেট মেট্রো স্টেশন সংলগ্ন)',
      image: 'https://drive.google.com/thumbnail?id=1J-7REyaotvGrroXIBz9lnw-b_RFyEe59&sz=w800',
      mapLink: 'https://maps.app.goo.gl/eWEwU9xLpkv3kd7v5',
      isHeadOffice: true
    },
    {
      name: 'পান্থপথ ব্রাঞ্চ',
      address: '57-1/4, পারভীন পাল, পান্থপথ।\n(রেটিনা আই হসপিটালের পাশের গলি)',
      image: 'https://drive.google.com/thumbnail?id=1WYXqp-9jo-7-Np3QUPIqFVnAC7Ju8gvJ&sz=w800',
      mapLink: 'https://maps.app.goo.gl/C6knCFoHQF2TFdpY8'
    },
    {
      name: 'গ্রীন রোড ব্রাঞ্চ',
      address: '153/1, সেঞ্চুরি আহমেদ ভিলা।\n(গ্রীন লাইফ হসপিটালের পাশের গলি)',
      image: 'https://drive.google.com/thumbnail?id=1mLE0ZbZdKw8LGdBTcAAmgV52Ps_MYuzc&sz=w800',
      mapLink: 'https://maps.app.goo.gl/8Gi4FpD4NtkmVC9F7'
    },
  ];

  const maleBranches: Branch[] = [
    {
      name: 'কাঠালবাগান ব্রাঞ্চ - ১',
      address: '11/8/C কাঠালবাগান ফ্রি স্কুল স্ট্রিট।\n(বসুন্ধরা শপিং সেন্টারের বিপরীত পাশে)',
      image: 'https://drive.google.com/thumbnail?id=15NJpXwJRPvbv_uyVbVhSlSFB6gbMBArx&sz=w800',
      mapLink: 'https://maps.app.goo.gl/vyqzE75LezdXRK6Q8'
    },
    {
      name: 'পান্থপথ/ধানমন্ডি ব্রাঞ্চ',
      address: '59 ফ্রি স্কুল স্ট্রিট, বক্স কালভার্ট রোড।\n(বসুন্ধরা শপিং সেন্টার ওভার ব্রিজের দক্ষিণ পাশে)',
      image: 'https://drive.google.com/thumbnail?id=1FZyIfhIqkfpN4CdIJruwMcfQUBihKhX2&sz=w800',
      mapLink: 'https://maps.app.goo.gl/wCJd4LDeseHZNB9JA'
    },
    {
      name: 'কাঠালবাগান ব্রাঞ্চ - ২',
      address: '88 কাঞ্চন টাওয়ার, কাঠালবাগান কাঁচা বাজার।',
      image: 'https://drive.google.com/thumbnail?id=1eXjycyN7Zs9wiBmuyp-gV7E8Jxplblbg&sz=w800',
      mapLink: 'https://maps.app.goo.gl/bYTpkU9bMnQ3Hp1C6'
    },
  ];

  return (
    <section id="branches" className="py-16 bg-white scroll-mt-28">
      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all"
            onClick={() => setSelectedImage(null)}
          >
            <X size={24} />
          </button>
          <img 
            src={selectedImage} 
            alt="Full View" 
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
            referrerPolicy="no-referrer"
            onClick={(e) => e.stopPropagation()} // Allow clicking image without closing
          />
        </div>
      )}

      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">আমাদের ব্রাঞ্চসমূহ</h2>
          <div className="w-16 md:w-24 h-1 bg-[#fcd34d] mx-auto rounded-full"></div>
          
          <p className="mt-3 text-gray-600 text-sm md:text-lg font-medium max-w-2xl mx-auto">
            ঢাকার যাতায়াত সুবিধাসম্পন্ন প্রাইম লোকেশনগুলোতে আমাদের সুসজ্জিত ব্রাঞ্চসমূহ।
          </p>

          <div className="mt-5 flex justify-center">
             <a 
                href="tel:01332719549" 
                className="inline-flex items-center gap-2 bg-[#fcd34d] text-gray-900 px-5 py-2.5 rounded-full font-bold shadow-md hover:bg-[#fbbf24] transition-all hover:scale-105 border border-yellow-400 text-sm md:text-base"
              >
                <Phone size={18} className="fill-current" />
                স্টাফ: 01332-719549
             </a>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Female Branches Section */}
          <div className="relative">
            {/* Header Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-teal-600 text-white px-6 py-1.5 rounded-full font-bold shadow-md z-10 whitespace-nowrap text-xs md:text-sm">
              মহিলা হোস্টেল
            </div>
            
            <div className="border border-teal-100 bg-teal-50/20 rounded-2xl p-3 md:p-6 pt-8">
              <div className="flex justify-center mb-5 mt-1">
                 <a 
                    href="tel:01714063178" 
                    className="inline-flex items-center gap-2 bg-white text-teal-700 px-3 py-1 md:px-4 md:py-1.5 rounded-full font-bold shadow-sm border border-teal-200 hover:bg-teal-50 transition-colors text-xs md:text-sm"
                  >
                    <Phone size={14} className="fill-current" />
                    ইনচার্জ: 01714-063178
                 </a>
              </div>

              <div className="grid grid-cols-1 gap-3 md:gap-5">
                {femaleBranches.map((branch, index) => (
                  <BranchCard key={index} branch={branch} onImageClick={setSelectedImage} />
                ))}
              </div>
            </div>
          </div>

          {/* Male Branches Section */}
          <div className="relative">
            {/* Header Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-1.5 rounded-full font-bold shadow-md z-10 whitespace-nowrap text-xs md:text-sm">
              পুরুষ হোস্টেল
            </div>

            <div className="border border-gray-200 bg-gray-50 rounded-2xl p-3 md:p-6 pt-8">
              <div className="flex justify-center mb-5 mt-1">
                 <a 
                    href="tel:01714063032" 
                    className="inline-flex items-center gap-2 bg-white text-gray-800 px-3 py-1 md:px-4 md:py-1.5 rounded-full font-bold shadow-sm border border-gray-200 hover:bg-gray-100 transition-colors text-xs md:text-sm"
                  >
                    <Phone size={14} className="fill-current" />
                    ইনচার্জ: 01714-063032
                 </a>
              </div>

              <div className="grid grid-cols-1 gap-3 md:gap-5">
                {maleBranches.map((branch, index) => (
                  <BranchCard key={index} branch={branch} onImageClick={setSelectedImage} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Branches;