import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', contact: '', message: '' });
    const [status, setStatus] = useState('');
    const [contactDetails, setContactDetails] = useState({ phone: '+91 8459528669', email: 'contact@sriswami.com' });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await axios.get('https://samarth-nursury.onrender.com/api/settings');
                if (res.data && res.data.phone) {
                    setContactDetails({ phone: res.data.phone, email: res.data.email });
                }
            } catch (err) {
                console.error("Error fetching contact settings:", err);
            }
        };
        fetchSettings();
    }, []);

    const handleSubmit = async (e) => {
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
    }

    return (
        <div className="bg-zinc-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-eco-900 mb-4">Contact Us</h1>
                    <p className="text-lg text-zinc-600 max-w-2xl mx-auto">Have questions about our plants or organic products? We'd love to hear from you.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Left: Info & Map */}
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100">
                            <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-eco-100 p-3 rounded-full text-eco-600"><MapPin /></div>
                                    <div>
                                        <h4 className="font-medium text-zinc-900">Visit Us</h4>
                                        <p className="text-zinc-600">Vadner Khurd, Tal Shirur, District Pune </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-eco-100 p-3 rounded-full text-eco-600"><Phone /></div>
                                    <div>
                                        <h4 className="font-medium text-zinc-900">Call Us</h4>
                                        <p className="text-zinc-600">{contactDetails.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-eco-100 p-3 rounded-full text-eco-600"><Mail /></div>
                                    <div>
                                        <h4 className="font-medium text-zinc-900">Email Us</h4>
                                        <p className="text-zinc-600">{contactDetails.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Map Embed Placeholder */}
                        <div className="h-64 rounded-2xl overflow-hidden shadow-sm border border-zinc-100 bg-zinc-200">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d777.5018006894661!2d74.21777506556485!3d18.96328714665531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTjCsDU3JzQ3LjciTiA3NMKwMTMnMDYuMyJF!5e1!3m2!1sen!2sin!4v1776583004612!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Sri Swami Samarth Map"
                            ></iframe>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100">
                        <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-2">Your Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-eco-500 focus:border-eco-500 outline-none transition-all"
                                    placeholder="John "
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-2">Email / Mobile Number</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-eco-500 focus:border-eco-500 outline-none transition-all"
                                    placeholder="john@example.com or 9876543210"
                                    value={formData.contact}
                                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 mb-2">Message</label>
                                <textarea
                                    required
                                    rows="5"
                                    className="w-full px-4 py-3 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-eco-500 focus:border-eco-500 outline-none transition-all resize-none"
                                    placeholder="How can we help you?"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-eco-500 hover:bg-eco-600 text-white font-semibold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                <Send size={20} />
                                Send Message
                            </button>
                            {status && <p className="text-center mt-4 text-eco-600 font-medium">{status}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;

