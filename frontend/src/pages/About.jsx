import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Sprout, ShieldCheck, HeartPulse, Recycle, Droplets } from 'lucide-react';

const About = () => {
    const coreValues = [
        { title: "Organic Farming", icon: <Leaf size={28} />, desc: "Strictly avoiding harmful synthetic fertilizers." },
        { title: "Highest Quality", icon: <Sprout size={28} />, desc: "Ensuring superior germination and robust plants." },
        { title: "Sustainability", icon: <Recycle size={28} />, desc: "Practices that restore and protect our soil." },
        { title: "Purity Checks", icon: <ShieldCheck size={28} />, desc: "Laboratory checked seeds for optimal results." },
        { title: "Water Conscious", icon: <Droplets size={28} />, desc: "Drought-resistant species and smart irrigation." },
        { title: "Healthy Produce", icon: <HeartPulse size={28} />, desc: "Maximizing the nutritional value of harvest." }
    ];

  return (
    <div className="bg-zinc-50 min-h-screen pb-20">
        {/* Header Section */}
        <div className="bg-eco-900 pt-32 pb-20 px-4 text-center border-b-[16px] border-eco-500">
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center justify-center p-4 bg-eco-800 rounded-full mb-6 shadow-xl"
            >
                <Leaf size={48} className="text-eco-400" />
            </motion.div>
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
                About Our Nursery
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-eco-100 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed"
            >
                Committed to nurturing the earth, empowering farmers, and bringing organic greenery into every home since our inception.
            </motion.p>
        </div>

        {/* Story Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-24">
            <div className="flex flex-col lg:flex-row items-center gap-16">
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="w-full lg:w-1/2"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-eco-200 rounded-[3rem] transform rotate-3 scale-105 -z-10 shadow-inner"></div>
                        <img 
                            src="/about_image.png" 
                            alt="Nursery rows" 
                            className="rounded-[3rem] shadow-2xl w-full h-[400px] md:h-[500px] object-cover"
                        />
                    </div>
                </motion.div>
                
                <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="w-full lg:w-1/2 space-y-6"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 leading-tight">
                        Cultivating Life from the Soil Up
                    </h2>
                    <div className="w-20 h-2 bg-eco-500 rounded-full"></div>
                    <p className="text-lg text-zinc-600 leading-relaxed font-medium">
                        Sri Swami Samarth Nursery was founded with a singular mission: to make pure, organic agricultural products accessible to both large-scale farmers and urban balcony gardeners.
                    </p>
                    <p className="text-lg text-zinc-600 leading-relaxed">
                        We understand that the success of a harvest entirely depends on the quality of the seed and the vitality of the soil. That's why every plant we nurture and every seed we sell undergoes rigorous quality checks. 
                    </p>
                    <p className="text-lg text-zinc-600 leading-relaxed">
                        By utilizing 100% natural fertilizers and promoting sustainable eco-friendly practices, we aren't just selling agricultural suppliesâ€”we are preserving the future of our ecosystem. Let's build a greener world together.
                    </p>
                </motion.div>
            </div>
        </div>

        {/* Core Values */}
        <div className="bg-white py-24 mt-24 border-y border-zinc-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">Our Core Values</h2>
                    <p className="text-lg text-zinc-500 max-w-2xl mx-auto">These principles guide everything we grow, sell, and support.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {coreValues.map((val, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-8 rounded-3xl bg-zinc-50 hover:bg-eco-50 border border-zinc-100 hover:border-eco-200 transition-colors group cursor-default"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-zinc-100 flex items-center justify-center text-eco-600 mb-6 group-hover:bg-eco-600 group-hover:text-white transition-colors">
                                {val.icon}
                            </div>
                            <h3 className="text-xl font-bold text-zinc-900 mb-3">{val.title}</h3>
                            <p className="text-zinc-600">{val.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default About;

