import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Sprout, ShieldCheck, Filter } from 'lucide-react';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const handleCategoryChange = (catName) => {
    setActiveCategory(catName);
    setSearchParams({ category: catName });
  };

  const categories = [
    { name: 'All', icon: <Filter size={18} /> },
    { name: 'Vegetables', icon: <Sprout size={18} /> },
    { name: 'Seeds', icon: <Leaf size={18} /> },
    { name: 'Flowers', icon: <Sprout size={18} /> },
    { name: 'Organic Fertilizer', icon: <ShieldCheck size={18} /> },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="bg-zinc-50 min-h-screen pb-20">
      {/* Header Section */}
      <div className="bg-eco-900 pt-32 pb-20 px-4 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4"
        >
          Our Products
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-eco-100 max-w-2xl mx-auto text-lg"
        >
          Browse our collection of high-quality plants, seeds, and organic farming essentials.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-sm border border-eco-100 p-4 md:p-6 mb-12">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => handleCategoryChange(cat.name)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.name 
                    ? 'bg-eco-600 text-white shadow-md transform scale-105' 
                    : 'bg-zinc-100 text-zinc-600 hover:bg-eco-100 hover:text-eco-700'
                }`}
              >
                {cat.icon}
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-eco-600"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white rounded-2xl border border-eco-100"
          >
            <Sprout size={48} className="mx-auto text-eco-300 mb-4" />
            <h3 className="text-xl font-bold text-zinc-700 mb-2">No products found</h3>
            <p className="text-zinc-500">We couldn't find any products in this category.</p>
          </motion.div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  key={product._id} 
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-eco-100 group"
                >
                  <div className="h-56 bg-zinc-100 relative overflow-hidden">
                    {product.imageUrl ? (
                      <img 
                        src={`http://localhost:5000${product.imageUrl}`} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400">
                        <Leaf size={32} className="mb-2 opacity-50" />
                        <span className="text-sm font-medium">No Image</span>
                      </div>
                    )}
                    <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-eco-700 text-xs px-3 py-1.5 rounded-full font-bold shadow-sm">
                      {product.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-xl text-zinc-800 mb-2 line-clamp-1 group-hover:text-eco-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-zinc-500 text-sm line-clamp-2 mb-4">
                      {product.description}
                    </p>
                    <button className="w-full bg-eco-50 hover:bg-eco-600 hover:text-white text-eco-700 font-semibold py-2.5 rounded-xl transition-colors">
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Products;
