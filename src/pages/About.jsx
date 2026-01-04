import { motion } from 'framer-motion';
import Container from '../components/Container';

const About = () => {
    return (
        <div className="py-16 md:py-24">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">About <span className="text-indigo-600">SimpleEarn</span></h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        We are building the largest micro-tasking community where everyone can turn their spare time into real earnings.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                        <p className="text-gray-600 mb-4 text-lg">
                            SimpleEarn was founded with a simple goal: to democratize digital earning. We believe that small tasks can lead to big opportunities. Whether you are a student looking for pocket money or a professional seeking side income, our platform is designed for you.
                        </p>
                        <p className="text-gray-600 text-lg">
                            For businesses and buyers, we provide a scalable workforce to complete micro-tasks quickly, accurately, and at a fraction of the cost of traditional methods.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="bg-indigo-600 rounded-3xl p-8 text-white shadow-2xl shadow-indigo-200"
                    >
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <div className="text-4xl font-black mb-1">50K+</div>
                                <div className="text-indigo-100 font-semibold uppercase tracking-wider text-xs">Active Workers</div>
                            </div>
                            <div>
                                <div className="text-4xl font-black mb-1">1M+</div>
                                <div className="text-indigo-100 font-semibold uppercase tracking-wider text-xs">Tasks Completed</div>
                            </div>
                            <div>
                                <div className="text-4xl font-black mb-1">$500K</div>
                                <div className="text-indigo-100 font-semibold uppercase tracking-wider text-xs">Paid Out</div>
                            </div>
                            <div>
                                <div className="text-4xl font-black mb-1">99.9%</div>
                                <div className="text-indigo-100 font-semibold uppercase tracking-wider text-xs">Buyer Satisfaction</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </div>
    );
};

export default About;
