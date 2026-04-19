import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BookOpen, PlayCircle } from 'lucide-react';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/blogs');
                setBlogs(res.data);
            } catch (err) {
                console.error("Error fetching blogs:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    const getPlayCircleEmbedUrl = (url) => {
        if (!url) return '';
        const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&]{11})/);
        return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : url;
    };

    return (
        <div className="bg-zinc-50 min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4 tracking-tight">Farming Insights & Blogs</h1>
                    <p className="text-lg text-zinc-600 max-w-2xl mx-auto">Explore our latest tips, guides, and updates on organic farming, plant care, and sustainable agriculture.</p>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex justify-center items-center py-24">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-eco-600"></div>
                    </div>
                ) : blogs.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-3xl border border-zinc-100 shadow-sm max-w-3xl mx-auto">
                        <BookOpen size={64} className="mx-auto text-zinc-200 mb-6" />
                        <h3 className="text-2xl font-bold text-zinc-800 mb-2">No Articles Yet</h3>
                        <p className="text-zinc-500 text-lg">We're working on some great content. Check back soon!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog) => (
                            <article key={blog._id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all border border-zinc-100 flex flex-col group">
                                <div className="h-64 overflow-hidden bg-zinc-100 relative shrink-0">
                                    {blog.type === 'youtube' ? (
                                        <div className="w-full h-full relative">
                                            <iframe 
                                                src={getPlayCircleEmbedUrl(blog.mediaUrl)} 
                                                title={blog.title}
                                                className="absolute inset-0 w-full h-full"
                                                frameBorder="0" 
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                                allowFullScreen
                                            ></iframe>
                                            <div className="absolute top-4 left-4 bg-red-600/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-bold shadow-sm flex items-center gap-1 z-10 pointer-events-none">
                                                <PlayCircle size={14} /> Video
                                            </div>
                                        </div>
                                    ) : blog.type === 'video' ? (
                                        <div className="w-full h-full relative">
                                            <video 
                                                src={`http://localhost:5000${blog.mediaUrl}`} 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                                controls 
                                                playsInline 
                                            />
                                            <div className="absolute top-4 left-4 bg-blue-600/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-bold shadow-sm z-10 pointer-events-none">
                                                Local Video
                                            </div>
                                        </div>
                                    ) : blog.mediaUrl ? (
                                        <div className="w-full h-full relative">
                                            <img 
                                                src={`http://localhost:5000${blog.mediaUrl}`} 
                                                alt={blog.title} 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                            />
                                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-eco-700 text-xs px-3 py-1 rounded-full font-bold shadow-sm z-10 pointer-events-none">
                                                Article
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400">
                                            <BookOpen size={48} className="mb-3 opacity-30" />
                                            <span className="text-sm font-medium uppercase tracking-widest text-zinc-400">No Media Attached</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-8 flex-1 flex flex-col">
                                    <div className="text-xs text-zinc-400 font-medium mb-3 uppercase tracking-wider">
                                        {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </div>
                                    <h3 className="text-2xl font-bold text-zinc-900 mb-4 group-hover:text-eco-600 transition-colors leading-tight">
                                        {blog.title}
                                    </h3>
                                    <p className="text-zinc-600 leading-relaxed max-w-prose whitespace-pre-wrap flex-1 text-sm md:text-base">
                                        {blog.description}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blogs;
