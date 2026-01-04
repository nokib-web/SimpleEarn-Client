import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import Container from '../components/Container';

const Contact = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        alert('Message sent successfully! We will get back to you soon.');
        reset();
    };

    return (
        <div className="py-16 md:py-24">
            <Container>
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">Get In <span className="text-indigo-600 dark:text-indigo-400">Touch</span></h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">Have questions? We are here to help you 24/7.</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white dark:bg-[#1E293B] p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                            <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Email Us</h3>
                            <p className="text-gray-600 dark:text-gray-300">support@simpleearn.com</p>
                        </div>

                        <div className="bg-white dark:bg-[#1E293B] p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                            <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Visit Us</h3>
                            <p className="text-gray-600 dark:text-gray-300">123 Tech Square, Silicon Valley, CA</p>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <motion.form
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            onSubmit={handleSubmit(onSubmit)}
                            className="bg-white dark:bg-[#1E293B] p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 space-y-6"
                        >
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                                    <input
                                        {...register("name", { required: true })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-[#0F172A] text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 outline-none transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                                    <input
                                        {...register("email", { required: true })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-[#0F172A] text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 outline-none transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                                <input
                                    {...register("subject", { required: true })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-[#0F172A] text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 outline-none transition-all"
                                    placeholder="How can we help?"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Message</label>
                                <textarea
                                    {...register("message", { required: true })}
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-[#0F172A] text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 outline-none transition-all"
                                    placeholder="Your message here..."
                                ></textarea>
                            </div>
                            <button className="w-full py-4 bg-indigo-600 text-white font-black text-lg rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-none">
                                Send Message
                            </button>
                        </motion.form>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Contact;
