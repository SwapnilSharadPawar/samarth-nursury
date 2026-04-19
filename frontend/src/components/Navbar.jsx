import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Leaf } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Vegetables & Seeds', path: '/products?category=seeds' },
        { name: 'Organic Fertilizer', path: '/products?category=fertilizer' },
        { name: 'Blogs', path: '/blogs' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav className="bg-white text-zinc-900 shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <Leaf className="h-8 w-8 text-eco-500" />
                        <Link to="/" className="text-xl md:text-2xl font-bold tracking-tight text-eco-900">
                            Sri Swami Samarth
                        </Link>
                    </div>
                    
                    {/* Desktop Menu */}
                    <div className="hidden lg:flex space-x-6 items-center">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.name} 
                                to={link.path}
                                className="text-sm font-medium text-zinc-600 hover:text-eco-500 transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-zinc-600 hover:text-eco-500">
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden bg-white border-t border-zinc-100 shadow-lg absolute w-full">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.name} 
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className="block px-3 py-2 text-base font-medium text-zinc-600 hover:bg-eco-50 hover:text-eco-600 rounded-md"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

