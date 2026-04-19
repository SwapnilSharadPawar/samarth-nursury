import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Image as ImageIcon, Video, Plus, Trash2, Images } from 'lucide-react';

const BannersTab = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [type, setType] = useState('hero'); // hero, promo, etc
  const [media, setMedia] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchBanners = async () => {
    try {
      const res = await axios.get('https://samarth-nursury.onrender.com/api/banners');
      setBanners(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleAddBanner = async (e) => {
    e.preventDefault();
    if (!media) return alert('Please select a media file');
    
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('type', type);
    formData.append('isActive', 'true');
    formData.append('media', media);

    try {
      await axios.post('https://samarth-nursury.onrender.com/api/banners', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      // Reset form
      setType('hero');
      setMedia(null);
      // Refresh list
      fetchBanners();
    } catch (err) {
      console.error(err);
      alert('Error adding banner: ' + (err.response?.data?.error || err.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;
    try {
      await axios.delete(`https://samarth-nursury.onrender.com/api/banners/${id}`);
      fetchBanners();
    } catch (err) {
      console.error(err);
    }
  };

  const isVideo = (url) => {
    return url && url.match(/\.(mp4|webm|ogg|mov|avi|mkv|flv|wmv|m4v)$/i) != null;
  };

  return (
    <div className="space-y-8">
      {/* Add Banner Form */}
      <div className="bg-white rounded-xl shadow-sm border border-eco-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-eco-50 rounded-lg text-eco-600">
            <Plus size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Upload Banner/Background</h2>
        </div>

        <form onSubmit={handleAddBanner} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Banner Type</label>
            <select 
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500"
            >
              <option value="hero">Hero Background (Top)</option>
              <option value="promo">Promotional Banner</option>
              <option value="gallery">Gallery Image</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Media File (Image or Video)</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-eco-300 border-dashed rounded-lg cursor-pointer bg-eco-50 hover:bg-eco-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <div className="flex gap-2 text-eco-500 mb-2">
                    <ImageIcon className="w-8 h-8" />
                    <Video className="w-8 h-8" />
                  </div>
                  <p className="mb-2 text-sm text-gray-500 font-semibold">{media ? media.name : "Click to upload Image or Video"}</p>
                </div>
                <input type="file" className="hidden" accept="image/*,video/*" onChange={(e) => setMedia(e.target.files[0])} />
              </label>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-eco-600 hover:bg-eco-700 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {isSubmitting ? 'Uploading...' : 'Upload Media'}
          </button>
        </form>
      </div>

      {/* Banner List */}
      <div className="bg-white rounded-xl shadow-sm border border-eco-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-eco-50 rounded-lg text-eco-600">
            <Images size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Manage Banners</h2>
        </div>

        {loading ? (
          <div className="py-8 text-center text-eco-600">Loading banners...</div>
        ) : banners.length === 0 ? (
          <div className="py-8 text-center text-gray-500 bg-eco-50 rounded-lg">No banners uploaded yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {banners.map(banner => (
              <div key={banner._id} className="border border-eco-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group relative">
                <div className="h-48 bg-zinc-100 relative">
                  {banner.mediaUrl && isVideo(banner.mediaUrl) ? (
                    <video src={`https://samarth-nursury.onrender.com${banner.mediaUrl}`} className="w-full h-full object-cover" muted loop autoPlay playsInline />
                  ) : banner.mediaUrl ? (
                    <img src={`https://samarth-nursury.onrender.com${banner.mediaUrl}`} className="w-full h-full object-cover" alt="Banner" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">No Media</div>
                  )}
                  
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button 
                      onClick={() => handleDelete(banner._id)}
                      className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transform hover:scale-105 transition-all"
                      title="Delete Banner"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                <div className="p-3 bg-white border-t border-eco-50 flex justify-between items-center">
                  <span className="font-medium text-gray-700 capitalize">Type: {banner.type}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${banner.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {banner.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BannersTab;

