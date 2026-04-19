import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-eco-900 text-eco-50 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <Leaf className="h-8 w-8 text-eco-500" />
                            <span className="text-2xl font-bold tracking-tight text-white">
                                Sri Swami Samarth
                            </span>
                        </div>
                        <p className="text-eco-100 max-w-md mb-6 leading-relaxed">
                            Providing the highest quality vegetables, seeds, flowers, and organic fertilizers. Cultivating nature's best to bring life to your gardens and farms.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-eco-100 hover:text-white transition-colors p-2 bg-eco-800 rounded-full"><Leaf size={20} /></a>
                            <a href="#" className="text-eco-100 hover:text-white transition-colors p-2 bg-eco-800 rounded-full"><Leaf size={20} /></a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-3 shrink-0">
                            <li><Link to="/" className="text-eco-100 hover:text-white transition-colors">Home</Link></li>
                            <li><Link to="/about" className="text-eco-100 hover:text-white transition-colors">About Us</Link></li>
                            <li><Link to="/products" className="text-eco-100 hover:text-white transition-colors">Products</Link></li>
                            <li><Link to="/blogs" className="text-eco-100 hover:text-white transition-colors">Farmer Reviews</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="text-eco-500 shrink-0 mt-1" size={20} />
                                <span className="text-eco-100">Vadner Khurd, Tal Shirur, District Pune </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="text-eco-500 shrink-0" size={20} />
                                <span className="text-eco-100">+91 8459528669</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="text-eco-500 shrink-0" size={20} />
                                <span className="text-eco-100">swamisamarth@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-eco-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-eco-200 text-sm">
                        &copy; {new Date().getFullYear()} Sri Swami Samarth Nursery. All rights reserved.
                    </p>
                    <div className="flex gap-4 text-sm text-eco-200">
                        <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link to="/admin" className="hover:text-white transition-colors font-medium">Admin</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
