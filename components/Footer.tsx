import React from 'react';
import { Phone, Facebook, MessageCircle, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  // Using the thumbnail endpoint which is more reliable for embedding images
  const logoUrl = "https://drive.google.com/thumbnail?id=1uz9QaBPFZMproVL4pJyQPvquVBoYXTtX&sz=s200";

  return (
    <footer id="footer" className="bg-gray-900 text-white pt-16 pb-8 border-t-4 border-teal-500 scroll-mt-28">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
               <img 
                  src={logoUrl} 
                  alt="Nibedika Hostel Logo" 
                  className="w-14 h-14 object-cover rounded-full shadow-lg border-2 border-gray-700"
                  referrerPolicy="no-referrer"
               />
               <div className="flex flex-col">
                <span className="font-bold text-2xl tracking-wide leading-none">
                  Nibedika <span className="text-teal-400">Hostel</span>
                </span>
                <span className="text-sm text-gray-400 mt-1">Best Hostel in Dhaka</span>
               </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              ৩৫ বছরের বিশ্বস্ত সেবায় আমরা প্রদান করছি নিরাপদ, পরিষ্কার ও মনোরম আবাসন ব্যবস্থা। ছাত্র ও কর্মজীবী নারীদের জন্য ঢাকার বুকে একটি নিরাপদ আশ্রয়।
            </p>
            <div className="flex gap-4">
               <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-[#1877F2] transition-colors">
                 <Facebook size={20} />
               </a>
               <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-[#25D366] transition-colors">
                 <MessageCircle size={20} />
               </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2 inline-block">যোগাযোগ করুন</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="bg-teal-600 text-white p-2 rounded-full">
                   <Phone size={18} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">হটলাইন / বুকিং</p>
                  <a href="tel:01345200218" className="font-bold text-lg hover:text-teal-400">01345-200218</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-gray-800 text-gray-300 p-2 rounded-full">
                   <Phone size={18} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">মেয়েদের হোস্টেল ইনচার্জ</p>
                  <p className="font-medium">01714-063178</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-gray-800 text-gray-300 p-2 rounded-full">
                   <Phone size={18} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">ছেলেদের হোস্টেল ইনচার্জ</p>
                  <p className="font-medium">01714-063032</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Quick Links / Tags */}
          <div>
            <h3 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2 inline-block">গুরুত্বপূর্ণ এলাকা</h3>
            <div className="flex flex-wrap gap-2">
              {['ফার্মগেট', 'পান্থপথ', 'গ্রীন রোড', 'রাজাবাজার', 'কাঠালবাগান', 'ধানমন্ডি'].map((tag) => (
                <span key={tag} className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm hover:bg-teal-600 hover:text-white transition-colors cursor-default">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="mt-8">
               <h4 className="font-bold mb-2 text-teal-400">অফিস সময়:</h4>
               <p className="text-gray-400">সকাল ৯:০০ - রাত ৯:০০</p>
               <p className="text-gray-400 text-sm mt-1">(পরিদর্শনের জন্য আগে যোগাযোগ করুন)</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500 text-sm mb-2">
            © {new Date().getFullYear()} Nibedika Hostel. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs flex items-center justify-center gap-1">
            Created by <span className="text-teal-500 font-semibold tracking-wide">Jubayer Sardar</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;