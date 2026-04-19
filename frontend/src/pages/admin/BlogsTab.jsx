import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BookOpen, Plus, Trash2, Video, Image as ImageIcon, Link as LinkIcon, PlayCircle } from 'lucide-react';

const BlogsTab = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('image'); // image, video, youtube
  const [media, setMedia] = useState(null); // Used for image/video upload
  const [youtubeUrl, setPlayCircleUrl] = useState(''); // Used for youtube type
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('https://samarth-nursury.onrender.com/api/blogs');
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleAddBlog = async (e) => {
    e.preventDefault();
    if (type !== 'youtube' && !media) return alert('Please select a media file');
    if (type === 'youtube' && !youtubeUrl) return alert('Please enter a YouTube link');
    
    setIsSubmitting(true);
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('type', type);
    
    if (type === 'youtube') {
        formData.append('youtubeUrl', youtubeUrl);
    } else {
        formData.append('media', media);
    }

    try {
      await axios.post('https://samarth-nursury.onrender.com/api/blogs', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      // Reset form
      setTitle('');
      setDescription('');
      setType('image');
      setMedia(null);
      setPlayCircleUrl('');
      // Refresh list
      fetchBlogs();
    } catch (err) {
      console.error(err);
      alert('Error adding blog: ' + (err.response?.data?.error || err.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog post?")) return;
    try {
      await axios.delete(`https://samarth-nursury.onrender.com/api/blogs/${id}`);
      fetchBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Add Blog Form */}
      <div className="bg-white rounded-xl shadow-sm border border-eco-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-eco-50 rounded-lg text-eco-600">
            <BookOpen size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Publish New Blog / Insight</h2>
        </div>

        <form onSubmit={handleAddBlog} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Blog Title</label>
              <input 
                type="text" required
                value={title} onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500"
                placeholder="E.g., Benefits of Organic Farming"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Media Type</label>
              <select 
                value={type} onChange={(e) => setType(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500"
              >
                <option value="image">Local Image</option>
                <option value="video">Local Video (MP4)</option>
                <option value="youtube">YouTube Embed Link</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description / Content</label>
            <textarea 
              required rows="3"
              value={description} onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500"
              placeholder="Write the full blog short content here..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {type === 'youtube' ? 'YouTube Link' : 'Media Upload'}
            </label>
            
            {type === 'youtube' ? (
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <PlayCircle className="h-5 w-5 text-red-500" />
                    </div>
                    <input 
                        type="url" required
                        value={youtubeUrl} onChange={(e) => setPlayCircleUrl(e.target.value)}
                        className="w-full pl-10 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500"
                        placeholder="https://www.youtube.com/watch?v=..."
                    />
                </div>
            ) : (
                <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-eco-300 border-dashed rounded-lg cursor-pointer bg-eco-50 hover:bg-eco-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <div className="flex gap-2 text-eco-500 mb-2">
                        {type === 'video' ? <Video className="w-8 h-8" /> : <ImageIcon className="w-8 h-8" />}
                    </div>
                    <p className="mb-2 text-sm text-gray-500 font-semibold">{media ? media.name : `Click to upload ${type}`}</p>
                    </div>
                    <input type="file" className="hidden" accept={type === 'image' ? 'image/*' : 'video/*'} onChange={(e) => setMedia(e.target.files[0])} />
                </label>
                </div>
            )}
          </div>

          <button 
            type="submit" disabled={isSubmitting}
            className="bg-eco-600 hover:bg-eco-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center gap-2 mt-4"
          >
            <Plus size={20} />
            {isSubmitting ? 'Publishing...' : 'Publish Blog'}
          </button>
        </form>
      </div>

      {/* Blog List */}
      <div className="bg-white rounded-xl shadow-sm border border-eco-100 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-eco-50 pb-4">Manage Blogs</h2>
        {loading ? (
          <div className="py-8 text-center text-eco-600">Loading blogs...</div>
        ) : blogs.length === 0 ? (
          <div className="py-8 text-center text-gray-500 bg-eco-50 rounded-lg">No blogs published yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-eco-50 text-eco-800">
                  <th className="p-4 rounded-tl-lg font-semibold">Media Type</th>
                  <th className="p-4 font-semibold">Title</th>
                  <th className="p-4 font-semibold">Preview Content</th>
                  <th className="p-4 rounded-tr-lg font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map(blog => (
                  <tr key={blog._id} className="border-b border-eco-50 hover:bg-eco-50/30 transition-colors">
                    <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                            ${blog.type === 'youtube' ? 'bg-red-100 text-red-700' : 
                              blog.type === 'video' ? 'bg-blue-100 text-blue-700' : 
                              'bg-green-100 text-green-700'}`}>
                            {blog.type === 'youtube' && <Youtube size={14} />}
                            {blog.type}
                        </span>
                    </td>
                    <td className="p-4 font-medium text-gray-800">{blog.title}</td>
                    <td className="p-4 text-sm text-gray-600 max-w-xs truncate">{blog.description}</td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => handleDelete(blog._id)}
                        className="p-2 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors border border-transparent hover:border-red-100"
                        title="Delete Blog"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsTab;

