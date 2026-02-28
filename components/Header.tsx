import React, { useState, useEffect } from 'react';
import { Menu, X, MapPin, FileText, Phone } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      // Trigger effect after scrolling down 50px
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleMobileClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    // Wait for state update to unlock body scroll before scrolling to element
    setTimeout(() => {
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
    }, 100);
  };

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const navLinks = [
    { name: 'হোম', href: '#home' },
    { name: 'ব্রাঞ্চসমূহ', href: '#branches' },
    { name: 'গ্যালারি', href: '#gallery' },
    { name: 'ভাড়া ও খরচ', href: '#pricing' },
    { name: 'যোগাযোগ', href: '#footer' },
  ];

  // Using the thumbnail endpoint which is more reliable for embedding images
  const logoUrl = "https://drive.google.com/thumbnail?id=1uz9QaBPFZMproVL4pJyQPvquVBoYXTtX&sz=s200";

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white shadow-sm py-0' 
            : 'bg-white/90 shadow-sm py-1 md:py-2'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <a href="#home" onClick={scrollToTop} className="flex items-center gap-2 md:gap-3 group cursor-pointer">
                <img 
                  src={logoUrl} 
                  alt="Nibedika Hostel Logo" 
                  className={`object-cover rounded-full border border-gray-100 transition-all duration-300 ${
                    isScrolled ? 'w-8 h-8 md:w-12 md:h-12' : 'w-9 h-9 md:w-14 md:h-14'
                  }`}
                  referrerPolicy="no-referrer"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-base md:text-xl text-gray-800 leading-none">
                    Nibedika <span className="text-teal-600">Hostel</span>
                  </span>
                  <span className="text-[9px] md:text-xs text-gray-500 tracking-wider font-medium">Best Hostel in Dhaka</span>
                </div>
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <nav className="flex space-x-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-gray-700 hover:text-teal-600 px-2 py-2 text-[15px] font-medium transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
              {/* Desktop Hotline Button - Horizontal Layout */}
              <a 
                href="tel:01345200218" 
                className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-5 py-2.5 rounded-md transition-colors shadow-sm"
              >
                <Phone size={18} className="fill-current text-gray-900" />
                <span className="text-sm font-extrabold uppercase tracking-wide opacity-90">Hotline:</span>
                <span className="font-bold text-lg leading-none">01345-200218</span>
              </a>
            </div>

            {/* Mobile Menu Button & Hotline Icon */}
            <div className="flex items-center gap-2 md:hidden">
              <a 
                href="tel:01345200218" 
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-colors bg-yellow-400 text-gray-900 shadow-sm"
              >
                <Phone size={14} className="fill-current" />
                <span className="text-[10px] font-bold uppercase tracking-wide">Hotline</span>
              </a>
              <button
                onClick={() => setIsOpen(true)}
                className="transition-colors focus:outline-none p-1 text-gray-800 hover:text-teal-600"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white md:hidden flex flex-col animate-in fade-in duration-200">
          {/* Mobile Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-white">
             <div className="flex items-center gap-3">
                <img 
                  src={logoUrl} 
                  alt="Nibedika Hostel Logo" 
                  className="w-12 h-12 object-cover rounded-full shadow-md border border-gray-100"
                  referrerPolicy="no-referrer"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-xl text-gray-800 leading-none">
                    Nibedika <span className="text-teal-400">Hostel</span>
                  </span>
                  <span className="text-xs text-gray-500 tracking-wider font-medium">Best Hostel in Dhaka</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-600 hover:text-gray-800 focus:outline-none p-1"
              >
                <X size={32} />
              </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 flex flex-col bg-gray-50/50">
             {/* Links */}
             <div className="space-y-2 mb-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleMobileClick(e, link.href)}
                  className="block text-gray-700 hover:text-teal-600 px-2 py-3 text-lg font-medium transition-colors border-b border-gray-100 last:border-0"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Mobile Menu Bottom Buttons */}
            <div className="space-y-4 mt-auto pt-6">
              {/* Hotline in Mobile Menu */}
               <a 
                 href="tel:01345200218" 
                 className="flex items-center justify-center gap-2 w-full bg-teal-600 text-white py-4 rounded-full font-bold shadow-lg hover:bg-teal-700 active:scale-95 transition-all text-lg"
               >
                  <Phone size={22} />
                  কল করুন: 01345-200218
               </a>
               <div className="flex gap-3">
                 <a 
                   href="#branches" 
                   onClick={(e) => handleMobileClick(e, '#branches')}
                   className="flex-1 flex items-center justify-center gap-2 bg-[#fcd34d] text-gray-900 py-3 rounded-xl font-bold shadow hover:bg-[#fbbf24] active:scale-95 transition-all"
                 >
                    <MapPin size={20} />
                    ব্রাঞ্চসমূহ
                 </a>
                 <a 
                   href="#pricing" 
                   onClick={(e) => handleMobileClick(e, '#pricing')}
                   className="flex-1 flex items-center justify-center gap-2 bg-white border border-[#fcd34d] text-gray-900 py-3 rounded-xl font-bold shadow hover:bg-[#fefce8] active:scale-95 transition-all"
                 >
                    <FileText size={20} />
                    ভাড়া
                 </a>
               </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;