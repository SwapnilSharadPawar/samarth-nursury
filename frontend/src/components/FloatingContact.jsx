import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Phone, CalendarCheck } from 'lucide-react';

const FloatingContact = () => {
    const [isOpen, setIsOpen] = useState(false); // Minimized by default or Open by default? User said "showing on every web page like a chatbot... user can close it". Let's make it OPEN initially, or closed with an attention grabbing badge.
    const [phone, setPhone] = useState('+91 8459528669');
    const navigate = useNavigate();

    // Fetch dynamic contact number
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/settings');
                if (res.data && res.data.phone) {
                    setPhone(res.data.phone);
                }
            } catch (err) {
                console.error("Error fetching contact settings for widget:", err);
            }
        };
        fetchSettings();

        // Reveal the chat box automatically after a brief delay
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-2xl shadow-2xl border border-eco-100 p-5 mb-4 w-72 origin-bottom-right"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-start mb-4 border-b border-eco-50 pb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-eco-500 rounded-full flex items-center justify-center text-white shrink-0">
                                    <img src="/about_image.png" alt="Avatar" className="w-full h-full object-cover rounded-full" onError={(e) => { e.target.style.display='none'; }}/>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800 text-sm leading-tight">Sri Swami Samarth Nursery</h4>
                                    <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest flex items-center gap-1 mt-1">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                        Online
                                    </span>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Body Container */}
                        <div className="space-y-4">
                            <div className="bg-eco-50 rounded-xl p-3 text-sm text-gray-700 leading-relaxed border border-eco-100">
                                Hello! 👋 Looking for organic agriculture solutions? 
                                <br/><br/>
                                Give us a call or book directly below.
                            </div>

                            {/* Contact Display */}
                            <div className="flex items-center justify-center gap-2 text-eco-700 font-bold bg-white border border-eco-200 py-2 rounded-lg">
                                <Phone size={16} />
                                {phone}
                            </div>

                            {/* Book Now Action */}
                            <button 
                                onClick={() => {
                                    setIsOpen(false);
                                    navigate('/contact');
                                }}
                                className="w-full bg-eco-600 hover:bg-eco-700 text-white font-semibold py-3 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm"
                            >
                                <CalendarCheck size={18} />
                                Book Now
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-white transition-colors duration-300 ${isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-eco-600 hover:bg-eco-700'}`}
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
            </motion.button>
        </div>
    );
};

export default FloatingContact;
