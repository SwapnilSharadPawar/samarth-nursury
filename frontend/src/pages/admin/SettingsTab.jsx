import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Settings, Save, Phone, Mail } from 'lucide-react';

const SettingsTab = () => {
    const [settings, setSettings] = useState({ phone: '', email: '' });
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [status, setStatus] = useState({ type: '', msg: '' });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await axios.get('https://samarth-nursury.onrender.com/api/settings');
                if (res.data) setSettings({ phone: res.data.phone, email: res.data.email });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setStatus({ type: '', msg: '' });
        
        try {
            await axios.post('https://samarth-nursury.onrender.com/api/settings', settings);
            setStatus({ type: 'success', msg: 'Settings saved successfully!' });
        } catch (err) {
            console.error(err);
            setStatus({ type: 'error', msg: 'Failed to save settings. Please try again.' });
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) return <div className="py-12 text-center text-eco-600 font-medium">Loading settings...</div>;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-eco-100 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-eco-50">
                <div className="p-3 bg-eco-50 rounded-xl text-eco-600">
                    <Settings size={28} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Manage Contact Details</h2>
                    <p className="text-gray-500 text-sm mt-1">Update the public contact information shown across the website.</p>
                </div>
            </div>

            {status.msg && (
                <div className={`p-4 rounded-lg mb-6 text-sm font-medium ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                    {status.msg}
                </div>
            )}

            <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 tracking-wide">Public Support Email</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="email"
                            required
                            value={settings.email}
                            onChange={(e) => setSettings({...settings, email: e.target.value})}
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-eco-500 focus:border-eco-500 outline-none transition-all"
                            placeholder="contact@sriswami.com"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 tracking-wide">Public Phone Number</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            required
                            value={settings.phone}
                            onChange={(e) => setSettings({...settings, phone: e.target.value})}
                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-eco-500 focus:border-eco-500 outline-none transition-all"
                            placeholder="+91 8459528669"
                        />
                    </div>
                </div>

                <div className="pt-6">
                    <button 
                        type="submit" 
                        disabled={isSaving}
                        className="flex items-center gap-2 bg-eco-600 hover:bg-eco-700 text-white px-8 py-3 rounded-xl font-semibold shadow-md shadow-eco-500/20 hover:shadow-lg hover:shadow-eco-500/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        <Save size={20} />
                        {isSaving ? 'Saving Changes...' : 'Save Settings'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SettingsTab;

