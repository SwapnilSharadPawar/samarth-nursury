import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MessageSquare, Package, Images, BookOpen } from 'lucide-react';

const OverviewTab = ({ setActiveTab }) => {
  const [stats, setStats] = useState({
    messages: 0,
    products: 0,
    banners: 0,
    blogs: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('https://samarth-nursury.onrender.com/api/stats');
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    {
      title: 'Total Messages',
      count: stats.messages,
      icon: <MessageSquare size={36} className="text-emerald-500" />,
      bg: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
      tab: 'messages'
    },
    {
      title: 'Total Products',
      count: stats.products,
      icon: <Package size={36} className="text-blue-500" />,
      bg: 'bg-blue-50 text-blue-600 border border-blue-100',
      tab: 'products'
    },
    {
      title: 'Total Banners',
      count: stats.banners,
      icon: <Images size={36} className="text-purple-500" />,
      bg: 'bg-purple-50 text-purple-600 border border-purple-100',
      tab: 'banners'
    },
    {
      title: 'Total Blogs',
      count: stats.blogs,
      icon: <BookOpen size={36} className="text-amber-500" />,
      bg: 'bg-amber-50 text-amber-600 border border-amber-100',
      tab: 'blogs'
    }
  ];

  if(loading) {
     return (
        <div className="flex justify-center items-center h-64">
           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-eco-600"></div>
        </div>
     );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
         <h2 className="text-3xl font-bold text-gray-800 mb-2">Platform Overview</h2>
         <p className="text-gray-500 font-medium">Quickly monitor and access your live platform statistics directly. Click a section to jump there.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card, idx) => (
          <div 
            key={idx}
            onClick={() => setActiveTab(card.tab)}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex items-center justify-between cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative"
          >
            <div className="absolute right-0 top-0 w-32 h-32 rounded-full transform translate-x-12 -translate-y-12 bg-gray-50 group-hover:scale-125 transition-transform duration-500 pointer-events-none -mr-8 -mt-8 opacity-50"></div>
            <div className="relative z-10">
              <p className="text-gray-500 font-bold uppercase tracking-wider text-sm mb-3 group-hover:text-gray-700 transition-colors">{card.title}</p>
              <h3 className="text-5xl font-black text-gray-800 group-hover:text-eco-600 transition-colors">{card.count}</h3>
            </div>
            <div className={`p-4 rounded-2xl shadow-sm relative z-10 ${card.bg}`}>
              {card.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewTab;

