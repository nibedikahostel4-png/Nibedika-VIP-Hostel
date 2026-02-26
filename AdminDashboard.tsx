import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Settings, Image as ImageIcon, LogOut, Save, Trash2, Plus, Lock, Mail, Home } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<'pricing' | 'gallery'>('pricing');
  const [packages, setPackages] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newImageUrl, setNewImageUrl] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token === 'admin-token-123') {
      setIsAuthenticated(true);
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        setIsAuthenticated(true);
        fetchData();
      } else {
        setLoginError('ইমেইল বা পাসওয়ার্ড ভুল হয়েছে।');
      }
    } catch (error) {
      setLoginError('লগইন করতে সমস্যা হয়েছে।');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [pkgRes, galRes] = await Promise.all([
        fetch('/api/packages'),
        fetch('/api/gallery')
      ]);
      const pkgData = await pkgRes.json();
      const galData = await galRes.json();
      setPackages(pkgData);
      setGallery(galData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePackageChange = (index: number, field: string, value: any) => {
    const updatedPackages = [...packages];
    updatedPackages[index] = { ...updatedPackages[index], [field]: value };
    setPackages(updatedPackages);
  };

  const handleFeatureChange = (pkgIndex: number, featureIndex: number, value: string) => {
    const updatedPackages = [...packages];
    updatedPackages[pkgIndex].features[featureIndex] = value;
    setPackages(updatedPackages);
  };

  const savePackage = async (pkg: any) => {
    try {
      await fetch(`/api/packages/${pkg.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pkg)
      });
      alert('প্যাকেজ আপডেট করা হয়েছে!');
    } catch (error) {
      alert('আপডেট করতে সমস্যা হয়েছে।');
    }
  };

  const addImage = async () => {
    if (!newImageUrl) return;
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: newImageUrl })
      });
      const newImg = await res.json();
      setGallery([...gallery, newImg]);
      setNewImageUrl('');
    } catch (error) {
      alert('ছবি যুক্ত করতে সমস্যা হয়েছে।');
    }
  };

  const deleteImage = async (id: string) => {
    if (!confirm('আপনি কি নিশ্চিত যে এই ছবিটি ডিলিট করতে চান?')) return;
    try {
      await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      setGallery(gallery.filter(img => img.id !== id));
    } catch (error) {
      alert('ছবি ডিলিট করতে সমস্যা হয়েছে।');
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">অ্যাডমিন লগইন</h2>
            <p className="text-gray-500 text-sm mt-2">ড্যাশবোর্ডে প্রবেশ করতে লগইন করুন</p>
          </div>
          
          {loginError && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 text-center border border-red-100">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ইমেইল</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">পাসওয়ার্ড</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2.5 rounded-lg transition-colors duration-200"
            >
              লগইন করুন
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <Link to="/" className="text-teal-600 hover:text-teal-700 text-sm font-medium flex items-center justify-center gap-2">
              <Home size={16} /> মূল ওয়েবসাইটে ফিরে যান
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold text-teal-400">Admin Panel</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab('pricing')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'pricing' ? 'bg-teal-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <Settings size={20} />
            ভাড়া ও প্যাকেজ
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'gallery' ? 'bg-teal-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <ImageIcon size={20} />
            গ্যালারি ছবি
          </button>
        </nav>
        <div className="p-4 border-t border-gray-800 space-y-2">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-red-500 hover:text-white transition-colors"
          >
            <LogOut size={20} />
            লগআউট করুন
          </button>
          <Link to="/" className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
            <Home size={20} />
            মূল ওয়েবসাইটে যান
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        {activeTab === 'pricing' && (
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">ভাড়া ও প্যাকেজ ম্যানেজমেন্ট</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {packages.map((pkg, index) => (
                <div key={pkg.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <input
                      type="text"
                      value={pkg.title}
                      onChange={(e) => handlePackageChange(index, 'title', e.target.value)}
                      className="text-lg font-bold text-gray-800 border-b border-gray-300 focus:border-teal-500 focus:outline-none px-1 py-1 w-2/3"
                    />
                    <button
                      onClick={() => savePackage(pkg)}
                      className="flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
                    >
                      <Save size={16} /> সেভ করুন
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-gray-600 font-medium">ভাড়া (৳):</span>
                    <input
                      type="text"
                      value={pkg.price}
                      onChange={(e) => handlePackageChange(index, 'price', e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 w-24 focus:border-teal-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={pkg.period}
                      onChange={(e) => handlePackageChange(index, 'period', e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 w-20 focus:border-teal-500 focus:outline-none"
                    />
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-700 mb-2">সুযোগ-সুবিধা সমূহ:</h4>
                    <div className="space-y-2">
                      {pkg.features.map((feature: string, fIndex: number) => (
                        <input
                          key={fIndex}
                          type="text"
                          value={feature}
                          onChange={(e) => handleFeatureChange(index, fIndex, e.target.value)}
                          className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:border-teal-500 focus:outline-none"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">গ্যালারি ম্যানেজমেন্ট</h1>
            
            {/* Add New Image */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
              <h3 className="text-lg font-semibold mb-4">নতুন ছবি যুক্ত করুন</h3>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="ছবির URL দিন (যেমন: Google Drive Thumbnail URL)"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:border-teal-500 focus:outline-none"
                />
                <button
                  onClick={addImage}
                  disabled={!newImageUrl}
                  className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  <Plus size={20} /> যুক্ত করুন
                </button>
              </div>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map((img) => (
                <div key={img.id} className="relative group rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                  <img src={img.url} alt="Gallery" className="w-full h-40 object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => deleteImage(img.id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                      title="ডিলিট করুন"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
