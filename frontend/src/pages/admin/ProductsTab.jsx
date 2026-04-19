import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, Plus, Trash2, Image as ImageIcon } from 'lucide-react';

const ProductsTab = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Vegetables');
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!name || !description || !image) return alert('Please fill all fields');
    
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('image', image);

    try {
      await axios.post('http://localhost:5000/api/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      // Reset form
      setName('');
      setDescription('');
      setCategory('Vegetables');
      setImage(null);
      // Refresh list
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert('Error adding product: ' + (err.response?.data?.error || err.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Add Product Form */}
      <div className="bg-white rounded-xl shadow-sm border border-eco-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-eco-50 rounded-lg text-eco-600">
            <Plus size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
        </div>

        <form onSubmit={handleAddProduct} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500"
                placeholder="e.g., Rose Plant"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500"
              >
                <option value="Vegetables">Vegetables</option>
                <option value="Seeds">Seeds</option>
                <option value="Flowers">Flowers</option>
                <option value="Organic Fertilizer">Organic Fertilizer</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-500"
              rows="3"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-eco-300 border-dashed rounded-lg cursor-pointer bg-eco-50 hover:bg-eco-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <ImageIcon className="w-8 h-8 text-eco-500 mb-2" />
                  <p className="mb-2 text-sm text-gray-500 font-semibold">{image ? image.name : "Click to upload image"}</p>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
              </label>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-eco-600 hover:bg-eco-700 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {isSubmitting ? 'Adding...' : 'Add Product'}
          </button>
        </form>
      </div>

      {/* Product List */}
      <div className="bg-white rounded-xl shadow-sm border border-eco-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-eco-50 rounded-lg text-eco-600">
            <Package size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Manage Products</h2>
        </div>

        {loading ? (
          <div className="py-8 text-center text-eco-600">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="py-8 text-center text-gray-500 bg-eco-50 rounded-lg">No products found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <div key={product._id} className="border border-eco-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                <div className="h-48 bg-zinc-100 relative overflow-hidden">
                  {product.imageUrl ? (
                    <img src={`http://localhost:5000${product.imageUrl}`} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                  )}
                  <span className="absolute top-2 left-2 bg-eco-100 text-eco-800 text-xs px-2 py-1 rounded-md font-medium">
                    {product.category}
                  </span>
                  <button 
                    onClick={() => handleDelete(product._id)}
                    className="absolute top-2 right-2 p-2 bg-white/90 text-red-500 hover:text-red-700 hover:bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete Product"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-800 line-clamp-1">{product.name}</h3>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsTab;
