import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, MessageSquare, Package, Images, LogOut, LayoutDashboard, Settings, BookOpen, Globe } from 'lucide-react';
import MessagesTab from './MessagesTab';
import ProductsTab from './ProductsTab';
import BannersTab from './BannersTab';
import SettingsTab from './SettingsTab';
import BlogsTab from './BlogsTab';
import OverviewTab from './OverviewTab';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const renderTab = () => {
    switch(activeTab) {
      case 'messages': return <MessagesTab />;
      case 'products': return <ProductsTab />;
      case 'banners': return <BannersTab />;
      case 'settings': return <SettingsTab />;
      case 'blogs': return <BlogsTab />;
      default: return <OverviewTab setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-eco-100 h-screen sticky top-0 flex flex-col shadow-sm">
        <div className="p-6 border-b border-eco-50">
          <div className="flex items-center gap-3 text-eco-700">
            <Leaf size={28} />
            <span className="text-xl font-bold tracking-tight">Admin Panel</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-eco-50 text-eco-800 font-semibold' : 'text-gray-600 hover:bg-eco-50/50'}`}>
            <LayoutDashboard size={20} /> Overview
          </button>
          <button onClick={() => setActiveTab('messages')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'messages' ? 'bg-eco-50 text-eco-800 font-semibold' : 'text-gray-600 hover:bg-eco-50/50'}`}>
            <MessageSquare size={20} /> Customer Inquiries
          </button>
          <button onClick={() => setActiveTab('products')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'products' ? 'bg-eco-50 text-eco-800 font-semibold' : 'text-gray-600 hover:bg-eco-50/50'}`}>
            <Package size={20} /> Products
          </button>
          <button onClick={() => setActiveTab('banners')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'banners' ? 'bg-eco-50 text-eco-800 font-semibold' : 'text-gray-600 hover:bg-eco-50/50'}`}>
            <Images size={20} /> Banners & Media
          </button>
          <button onClick={() => setActiveTab('blogs')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'blogs' ? 'bg-eco-50 text-eco-800 font-semibold' : 'text-gray-600 hover:bg-eco-50/50'}`}>
            <BookOpen size={20} /> Blog Management
          </button>
          <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors border-t border-gray-100 ${activeTab === 'settings' ? 'bg-eco-50 text-eco-800 font-semibold' : 'text-gray-600 hover:bg-eco-50/50'}`}>
            <Settings size={20} /> Contact Details
          </button>
        </nav>

        <div className="p-4 border-t border-eco-50 mt-auto space-y-2">
          <button onClick={() => navigate('/')} className="w-full flex items-center justify-center gap-2 px-4 py-3 text-eco-700 bg-eco-50 hover:bg-eco-100 rounded-lg transition-colors font-bold border border-eco-200 shadow-sm">
            <Globe size={20} /> Go to Front Page
          </button>
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium border border-transparent hover:border-red-100">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content window */}
      <div className="flex-1 p-10 overflow-auto">
        <div className="max-w-5xl mx-auto">
          {renderTab()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
