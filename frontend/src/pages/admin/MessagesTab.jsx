import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, MessageSquare, Clock } from 'lucide-react';

const MessagesTab = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/messages');
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/messages/${id}`);
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-8 text-eco-600">Loading messages...</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-eco-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-eco-50 rounded-lg text-eco-600">
          <MessageSquare size={24} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Customer Inquiries</h2>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-eco-50 rounded-lg">
          No messages received yet.
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg._id} className="p-5 border border-eco-50 rounded-lg hover:border-eco-200 transition-colors bg-zinc-50 relative group">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{msg.name}</h3>
                  <a href={`mailto:${msg.email}`} className="text-eco-600 hover:underline text-sm">{msg.email}</a>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Clock size={14} />
                  {new Date(msg.createdAt).toLocaleString()}
                </div>
              </div>
              <p className="text-gray-600 mt-3 whitespace-pre-wrap">{msg.message}</p>
              
              <button 
                onClick={() => handleDelete(msg._id)}
                className="absolute top-4 right-4 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                title="Delete Message"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagesTab;
