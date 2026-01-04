import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import { HiOutlineUserPlus, HiOutlineClipboardDocumentList, HiOutlineCheckBadge, HiOutlineBanknotes } from 'react-icons/hi2';

const HowItWorks = () => {
    const steps = [
        {
            title: "Register Your Account",
            desc: "Join as a Worker or a Buyer. Workers get 10 coins, and Buyers get 50 coins instantly.",
            icon: <HiOutlineUserPlus className="w-10 h-10" />
        },
        {
            title: "Complete/Post Tasks",
            desc: "Workers browse tasks and submit proof. Buyers post tasks and set requirements.",
            icon: <HiOutlineClipboardDocumentList className="w-10 h-10" />
        },
        {
            title: "Earn/Get Results",
            desc: "Buyers review and approve. Workers get paid in coins instantly for every approved task.",
            icon: <HiOutlineCheckBadge className="w-10 h-10" />
        },
        {
            title: "Withdraw Earnings",
            desc: "Convert your earned coins into real rewards once you reach the threshold.",
            icon: <HiOutlineBanknotes className="w-10 h-10" />
        }
    ];

    return (
        <div className="py-16 md:py-24">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">How <span className="text-indigo-600">SimpleEarn</span> Works</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">Your step-by-step guide to starting your earning journey today.</p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-indigo-50/20 text-center group hover:bg-indigo-600 transition-all duration-500"
                        >
                            <div className="mb-6 flex justify-center text-[#7C3AED] group-hover:text-white transition-colors duration-500">{step.icon}</div>
                            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-white mb-4">{step.title}</h3>
                            <p className="text-gray-500 group-hover:text-indigo-100 leading-relaxed font-medium">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="bg-indigo-600 rounded-[3rem] p-12 text-center text-white shadow-2xl shadow-indigo-200 overflow-hidden relative"
                >
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-black mb-8">Level up your earning potential.</h2>
                        <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">Join thousands of others already earning on the platform.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/register" className="px-10 py-4 bg-white text-indigo-600 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all">
                                Get Started Now
                            </Link>
                            <Link to="/about" className="px-10 py-4 bg-indigo-500 text-white rounded-2xl font-bold text-lg hover:bg-indigo-400 transition-all border border-indigo-400">
                                Learn More
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </Container>
        </div>
    );
};

export default HowItWorks;
