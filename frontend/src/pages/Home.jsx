import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight, Leaf, ShieldCheck, Sprout, Mail, Phone, MapPin, Send, BookOpen } from 'lucide-react';

const Home = () => {
    const navigate = useNavigate();

    // Blog State
    const [blogs, setBlogs] = useState([]);
    const [loadingBlogs, setLoadingBlogs] = useState(true);

    // Banner State
    const [heroBanners, setHeroBanners] = useState([{ mediaUrl: 'https://images.unsplash.com/photo-1592424005688-573e5dc79d28?q=80&w=2070&auto=format&fit=crop', _id: 'default' }]);
    const [currentBannerIdx, setCurrentBannerIdx] = useState(0);

    // Contact & Settings State
    const [formData, setFormData] = useState({ name: '', contact: '', message: '' });
    const [status, setStatus] = useState('');
    const [contactDetails, setContactDetails] = useState({ phone: '+91 8459528669', email: 'contact@sriswami.com' });

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get('https://samarth-nursury.onrender.com/api/blogs');
                setBlogs(res.data.slice(0, 3)); // Only show latest 3
            } catch (err) {
                console.error("Error fetching blogs:", err);
            } finally {
                setLoadingBlogs(false);
            }
        };

        const fetchBanners = async () => {
            try {
                const res = await axios.get('https://samarth-nursury.onrender.com/api/banners');
                const activeHeroes = res.data.filter(b => b.type === 'hero' && b.isActive);
                if (activeHeroes.length > 0) {
                    setHeroBanners(activeHeroes.map(b => ({ ...b, mediaUrl: `https://samarth-nursury.onrender.com${b.mediaUrl}` })));
                }
            } catch (err) {
                console.error("Error fetching banners:", err);
            }
        };

        const fetchSettings = async () => {
            try {
                const res = await axios.get('https://samarth-nursury.onrender.com/api/settings');
                if (res.data && res.data.phone) {
                    setContactDetails({ phone: res.data.phone, email: res.data.email });
                }
            } catch (err) {
                console.error("Error fetching settings:", err);
            }
        };

        fetchBlogs();
        fetchBanners();
        fetchSettings();
    }, []);

    useEffect(() => {
        if (heroBanners.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentBannerIdx((prev) => (prev + 1) % heroBanners.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [heroBanners.length]);

    const isVideo = (url) => {
        return url && url.match(/\.(mp4|webm|ogg|mov|avi|mkv|flv|wmv|m4v)$/i) != null;
    };

    const getYoutubeEmbedUrl = (url) => {
        if (!url) return '';
        // Convert watch?v= format to embed/ format
        const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&]{11})/);
        return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : url;
    };

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                name: formData.name,
                message: formData.message,
                email: formData.contact.includes('@') ? formData.contact : '',
                phone: !formData.contact.includes('@') ? formData.contact : ''
            };
            await axios.post('https://samarth-nursury.onrender.com/api/messages', payload);
            setStatus('Message sent successfully!');
            setFormData({ name: '', contact: '', message: '' });
        } catch (err) {
            setStatus('Error sending message. Please try again.');
        }
    };



    const categories = [
        { name: 'Vegetables', icon: <Sprout size={32} />, desc: 'Fresh local vegetable plants' },
        { name: 'Seeds', icon: <Leaf size={32} />, desc: 'High-yield farming seeds' },
        { name: 'Flowers', icon: <Sprout size={32} />, desc: 'Beautiful ornamental plants' },
        { name: 'Organic Fertilizer', icon: <ShieldCheck size={32} />, desc: '100% organic fertilizers' },
    ];

    return (
        <div>
            {/* Hero Section */}
            <div className="relative h-[80vh] bg-zinc-900 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <AnimatePresence initial={false}>
                        <motion.div
                            key={currentBannerIdx}
                            initial={{ x: '100%', opacity: 0.5 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: '-100%', opacity: 0.5 }}
                            transition={{ duration: 1.5, ease: 'easeInOut' }}
                            className="absolute inset-0"
                        >
                            {isVideo(heroBanners[currentBannerIdx]?.mediaUrl) ? (
                                <video
                                    src={heroBanners[currentBannerIdx]?.mediaUrl}
                                    className="w-full h-full object-cover opacity-60"
                                    muted loop autoPlay playsInline
                                />
                            ) : (
                                <img
                                    src={heroBanners[currentBannerIdx]?.mediaUrl}
                                    alt="Nursery banner"
                                    className="w-full h-full object-cover opacity-60"
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg tracking-tight"
                    >
                        Welcome to Sri Swami Samarth Nursery
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-eco-100 mb-8 drop-shadow-md"
                    >
                        Cultivating the finest plants, seeds, and organic solutions for a greener tomorrow.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <Link
                            to="/products"
                            className="inline-flex items-center gap-2 bg-eco-500 hover:bg-eco-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
                        >
                            Explore Our Products
                            <ArrowRight size={20} />
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* What We Offer / Categories Section */}
            <section className="py-20 bg-eco-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-eco-900 mb-4 tracking-tight">What We Offer</h2>
                        <p className="text-lg text-zinc-600 max-w-2xl mx-auto">Discover our wide range of agricultural products tailored for your farming and gardening needs. Click any category to view our catalog.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {categories.map((cat, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -10 }}
                                onClick={() => navigate(`/products?category=${encodeURIComponent(cat.name)}`)}
                                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-eco-100 text-center group cursor-pointer"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-eco-100 text-eco-600 mb-6 group-hover:bg-eco-500 group-hover:text-white transition-colors">
                                    {cat.icon}
                                </div>
                                <h3 className="text-xl font-bold text-zinc-900 mb-2 group-hover:text-eco-600 transition-colors">{cat.name}</h3>
                                <p className="text-zinc-600">{cat.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="w-full lg:w-1/2 relative">
                            <div className="absolute inset-0 bg-eco-100 rounded-[3rem] transform -rotate-3 scale-105 -z-10"></div>
                            <img
                                src="/about_image.png"
                                alt="Organic Nursery Planting"
                                className="rounded-[3rem] shadow-xl w-full h-[400px] md:h-[500px] object-cover"
                            />
                        </div>
                        <div className="w-full lg:w-1/2 space-y-6">
                            <div className="inline-flex items-center gap-2 text-eco-600 font-semibold bg-eco-50 px-4 py-2 rounded-full">
                                <Leaf size={18} />
                                About Us
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 leading-tight">
                                Growing the future of organic agriculture.
                            </h2>
                            <p className="text-lg text-zinc-600 leading-relaxed">
                                Sri Swami Samarth Nursery has been at the forefront of providing exceptional agricultural solutions. We specialize in robust, high-yield seeds and pristine nursery plants built to endure and thrive.
                            </p>
                            <p className="text-lg text-zinc-600 leading-relaxed mb-6">
                                We believe in organic, sustainable farming techniques. Our fertilizers are 100% natural, ensuring your crops are healthy without compromising the integrity of the soil.
                            </p>
                            <Link to="/about" className="inline-flex items-center gap-2 text-eco-600 font-bold hover:text-eco-700 transition-colors">
                                Learn More About Our Journey <ArrowRight size={20} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recent Blogs Section */}
            <section className="py-20 bg-zinc-50 border-t border-zinc-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4 tracking-tight">Our Latest Insights</h2>
                            <p className="text-lg text-zinc-600 max-w-xl">Learn tips, tricks, and the latest news in farming and organic plant care.</p>
                        </div>
                        <Link to="/blogs" className="hidden md:inline-flex items-center gap-2 text-eco-600 font-semibold hover:text-eco-700">
                            View All Articles <ArrowRight size={20} />
                        </Link>
                    </div>

                    {loadingBlogs ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-eco-600"></div>
                        </div>
                    ) : blogs.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-2xl border border-zinc-100">
                            <BookOpen size={40} className="mx-auto text-zinc-300 mb-4" />
                            <p className="text-zinc-500">More blogs coming soon!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {blogs.map((blog) => (
                                <div key={blog._id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-zinc-100 group">
                                    <div className="h-48 overflow-hidden bg-zinc-100 relative">
                                        {blog.type === 'youtube' ? (
                                            <iframe
                                                src={getYoutubeEmbedUrl(blog.mediaUrl)}
                                                title={blog.title}
                                                className="w-full h-full"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        ) : blog.type === 'video' ? (
                                            <video src={`https://samarth-nursury.onrender.com${blog.mediaUrl}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" muted loop autoPlay playsInline />
                                        ) : blog.mediaUrl ? (
                                            <img src={`https://samarth-nursury.onrender.com${blog.mediaUrl}`} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400">
                                                <BookOpen size={32} className="mb-2 opacity-50" />
                                                <span className="text-sm font-medium">No Media</span>
                                            </div>
                                        )}
                                        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-eco-700 text-xs px-3 py-1 rounded-full font-bold shadow-sm z-10 pointer-events-none">
                                            {blog.type === 'youtube' ? 'Video' : blog.type || 'Blog'}
                                        </span>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-zinc-900 mb-3 line-clamp-2 group-hover:text-eco-600 transition-colors">{blog.title}</h3>
                                        <p className="text-zinc-600 text-sm line-clamp-3 mb-4">{blog.description}</p>
                                        <Link to="/blogs" className="text-eco-600 font-semibold text-sm flex items-center gap-1 hover:text-eco-700">
                                            Read More <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-eco-900 rounded-[3rem] p-8 md:p-16 shadow-2xl overflow-hidden relative">
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-eco-800 rounded-full blur-3xl opacity-50"></div>
                        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-eco-700 rounded-full blur-3xl opacity-50"></div>

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="text-white space-y-8">
                                <div>
                                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's Grow Together!</h2>
                                    <p className="text-eco-100 text-lg max-w-md">Whether you need bulk seeds or expert organic farming advice, our team is here to help.</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                                            <Phone className="text-eco-100" />
                                        </div>
                                        <div>
                                            <p className="text-eco-200 text-sm">Call Us Anytime</p>
                                            <p className="font-semibold text-lg">{contactDetails.phone}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                                            <Mail className="text-eco-100" />
                                        </div>
                                        <div>
                                            <p className="text-eco-200 text-sm">Send us an Email</p>
                                            <p className="font-semibold text-lg">{contactDetails.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl p-8 shadow-xl">
                                <h3 className="text-2xl font-bold text-zinc-900 mb-6">Send a Message</h3>
                                <form onSubmit={handleContactSubmit} className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-700 mb-1">Your Name</label>
                                        <input
                                            type="text" required
                                            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-eco-500 focus:outline-none transition-all"
                                            placeholder="John"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-700 mb-1">Email / Mobile Number</label>
                                        <input
                                            type="text" required
                                            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-eco-500 focus:outline-none transition-all"
                                            placeholder="john@example.com or 9876543210"
                                            value={formData.contact}
                                            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-zinc-700 mb-1">Message</label>
                                        <textarea
                                            required rows="4"
                                            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-eco-500 focus:outline-none transition-all resize-none"
                                            placeholder="How can we help?"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="w-full bg-eco-600 hover:bg-eco-700 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2">
                                        <Send size={20} />
                                        Send Message
                                    </button>
                                    {status && <p className="text-center mt-2 text-eco-600 font-medium text-sm">{status}</p>}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

