import React, { useState, useEffect } from 'react';
import { Loader2, X, Maximize2 } from 'lucide-react';

const Gallery: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // ==========================================
  // অটোমেটিক গ্যালারি সেটআপ (ডেভেলপারদের জন্য)
  // ==========================================
  // যদি আপনি Google Drive ফোল্ডার থেকে অটোমেটিক ছবি আনতে চান:
  // ১. Google Apps Script সেটআপ করুন এবং Web App URL তৈরি করুন।
  // ২. নিচের 'APPS_SCRIPT_URL' ভেরিয়েবলে সেই URL টি বসান।
  
  const APPS_SCRIPT_URL = ""; 
  
  // ফলবুক ইমেজ: যতক্ষণ না স্ক্রিপ্ট সেট করা হচ্ছে, ততক্ষণ এই ছবিগুলো দেখাবে।
  const MANUAL_IMAGES = [
    // Previous 12 images
    "https://drive.google.com/thumbnail?id=1jZSPOIiB6-WnpndR3JuBKjERKTx0ebZl&sz=w1000",
    "https://drive.google.com/thumbnail?id=1O0FcLtv-60SzrhmArzO4kHCCeEQ6BXPD&sz=w1000",
    "https://drive.google.com/thumbnail?id=1-olRuQ_mOShxydZpuRX9BsqJdG6oVsKJ&sz=w1000",
    "https://drive.google.com/thumbnail?id=1GUAadgvzSmZFIpdtgqbzOSWbbiXc6s1A&sz=w1000",
    "https://drive.google.com/thumbnail?id=1pOvrS80BbcbQ0JKM7qXW0jq773k_b5pS&sz=w1000",
    "https://drive.google.com/thumbnail?id=1UMiXfx6Xvs5f-dMf9dzoH1ei361fhhwJ&sz=w1000",
    "https://drive.google.com/thumbnail?id=1ewvgHNxs88qmJBPP7FrfqOR-LvoBzRsg&sz=w1000",
    "https://drive.google.com/thumbnail?id=1wI8wUBFqJr8wjpoHAuHulyQJGmi0xkVE&sz=w1000",
    "https://drive.google.com/thumbnail?id=1avvk7_icSkIPKTFBr6S0RXsP21tPq71P&sz=w1000",
    "https://drive.google.com/thumbnail?id=1lxq78JAmcwFSNei9Lq8YKvhWAhdxCr91&sz=w1000",
    "https://drive.google.com/thumbnail?id=1mQCkhDFA_ZIobuCb-a6FENOIlui7YDlx&sz=w1000",
    "https://drive.google.com/thumbnail?id=1OaLYB_-01C4Da_8XydaW7dwJlY6_nhum&sz=w1000",
    // New 10 images
    "https://drive.google.com/thumbnail?id=1jmRCb0TB_7gmTaNburdF3q3aeQTfL52m&sz=w1000",
    "https://drive.google.com/thumbnail?id=1HEf3-d0_DE2y2mMTSloMLt9ajRIbyFVq&sz=w1000",
    "https://drive.google.com/thumbnail?id=1uohqpwKO0ElUG_mjIsUzOfISbPdmoEr3&sz=w1000",
    "https://drive.google.com/thumbnail?id=1rorPU9puHxx9sNaJ8yA0DGP4ClXs7il2&sz=w1000",
    "https://drive.google.com/thumbnail?id=1VRfdW25HG_7t-NEZjTxx9okaj0eA6Bjb&sz=w1000",
    "https://drive.google.com/thumbnail?id=1dMb6c2opjRMZnf28tUwRrzlGPks1BRVo&sz=w1000",
    "https://drive.google.com/thumbnail?id=1kYBcJt2m0DtXcYP0gX2NzoEIlZyItJw2&sz=w1000",
    "https://drive.google.com/thumbnail?id=1S0IAFN56x5cLqZQO2KQng2UF33xSpGP3&sz=w1000",
    "https://drive.google.com/thumbnail?id=1V8Dv8z4XJUjN3D7Ne-7OhbANKK0nMNLH&sz=w1000",
    "https://drive.google.com/thumbnail?id=1c59YRW6ppjOtgOifjH_UtHeeeni0Z7T4&sz=w1000"
  ];

  useEffect(() => {
    const fetchImages = async () => {
      // যদি URL সেট না থাকে, ম্যানুয়াল ইমেজ দেখান
      if (!APPS_SCRIPT_URL) {
        setImages(MANUAL_IMAGES);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(APPS_SCRIPT_URL);
        const data = await response.json();
        
        if (Array.isArray(data) && data.length > 0) {
           // Google Drive Thumbnail Link Format
           const formattedImages = data.map((id: string) => 
            `https://drive.google.com/thumbnail?id=${id}&sz=w1000`
          );
          setImages(formattedImages);
        } else {
           setImages(MANUAL_IMAGES);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
        setImages(MANUAL_IMAGES);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <section id="gallery" className="py-8 md:py-16 bg-white scroll-mt-20 md:scroll-mt-28 border-b border-gray-200 relative">
      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
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
            className="max-w-full max-h-[90vh] object-contain rounded-md shadow-lg"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}

      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-lg md:text-3xl font-bold text-gray-900 mb-1 md:mb-3">হোস্টেলের পরিবেশ</h2>
          <div className="w-12 md:w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          <p className="mt-2 md:mt-4 text-gray-600 max-w-2xl mx-auto font-medium text-[10px] md:text-sm">
            আমাদের পরিষ্কার-পরিচ্ছন্ন রুম, ডাইনিং এবং মনোরম পরিবেশের কিছু চিত্র।
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 md:py-20 bg-gray-50 rounded-md">
            <Loader2 className="w-8 h-8 md:w-10 md:h-10 text-teal-600 animate-spin mb-4" />
            <p className="text-gray-500 font-medium text-xs md:text-sm">গ্যালারি লোড হচ্ছে...</p>
          </div>
        ) : (
          /* Masonry Layout for Original Ratio - Mobile: 3 columns, Desktop: 4 columns */
          <div className="columns-3 md:columns-4 gap-1.5 md:gap-4 max-w-7xl mx-auto">
            {images.map((src, index) => (
              <div 
                key={index} 
                className="break-inside-avoid mb-1.5 md:mb-4 group relative overflow-hidden rounded-md bg-gray-100 cursor-pointer shadow-sm hover:shadow transition-shadow border border-gray-200"
                onClick={() => setSelectedImage(src)}
              >
                <img
                  src={src}
                  alt={`Gallery ${index + 1}`}
                  /* w-full h-auto keeps original aspect ratio */
                  className="w-full h-auto object-cover block"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="bg-white/90 p-1.5 md:p-2 rounded-full">
                     <Maximize2 size={14} className="text-gray-900 md:w-4 md:h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;