import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import api from '../utils/api';
import { motion } from 'framer-motion';

const Home = () => {
  const [topWorkers, setTopWorkers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopWorkers = async () => {
      try {
        const response = await api.get('/users/top-workers');
        setTopWorkers(response.data);
      } catch (error) {
        console.error('Error fetching top workers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopWorkers();
  }, []);

  const testimonials = [
    {
      name: 'John Doe',
      photo: 'https://i.pravatar.cc/150?img=1',
      quote: 'SimpleEarn has changed my life! I can now earn money in my free time by completing simple tasks.',
      rating: 5
    },
    {
      name: 'Jane Smith',
      photo: 'https://i.pravatar.cc/150?img=2',
      quote: 'As a buyer, I found it very easy to post tasks and get them completed quickly. Great platform!',
      rating: 5
    },
    {
      name: 'Mike Johnson',
      photo: 'https://i.pravatar.cc/150?img=3',
      quote: 'The withdrawal process is smooth and payments are always on time. Highly recommended!',
      rating: 5
    },
    {
      name: 'Sarah Williams',
      photo: 'https://i.pravatar.cc/150?img=4',
      quote: 'I love how user-friendly the platform is. Made earning extra income so simple.',
      rating: 5
    }
  ];

  const heroSlides = [
    {
      title: 'Earn Money Online',
      subtitle: 'Complete Simple Tasks and Get Paid',
      description: 'Join thousands of workers earning money by completing micro-tasks'
    },
    {
      title: 'Post Tasks Easily',
      subtitle: 'Get Your Work Done Fast',
      description: 'Buyers can post tasks and get them completed by skilled workers'
    },
    {
      title: 'Secure & Reliable',
      subtitle: 'Trusted Payment System',
      description: 'Safe and secure payment processing with instant withdrawals'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="h-96"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="flex items-center justify-center h-full px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center"
                >
                  <h1 className="text-5xl font-bold mb-4">{slide.title}</h1>
                  <h2 className="text-3xl mb-4">{slide.subtitle}</h2>
                  <p className="text-xl">{slide.description}</p>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Best Workers Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Top Earners</h2>
            <p className="text-xl text-gray-600">Meet our highest earning workers</p>
          </motion.div>
          
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topWorkers.map((worker, index) => (
                <motion.div
                  key={worker._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md p-6 text-center"
                >
                  <img
                    src={worker.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(worker.name)}`}
                    alt={worker.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold mb-2">{worker.name}</h3>
                  <p className="text-2xl font-bold text-indigo-600">{worker.coin} Coins</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600">Real feedback from our community</p>
          </motion.div>

          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="pb-12"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-lg p-6 h-full"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.photo}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                      <div className="flex text-yellow-400">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose SimpleEarn?</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Easy to Use',
                description: 'Simple and intuitive interface that anyone can use',
                icon: '✨'
              },
              {
                title: 'Fast Payments',
                description: 'Get paid quickly through secure payment methods',
                icon: '💳'
              },
              {
                title: '24/7 Support',
                description: 'Our team is always ready to help you',
                icon: '🛟'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 text-center shadow-md"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Sign Up', description: 'Create your account as a worker or buyer' },
              { step: '2', title: 'Browse Tasks', description: 'Workers can browse available tasks' },
              { step: '3', title: 'Complete & Earn', description: 'Complete tasks and earn coins' },
              { step: '4', title: 'Withdraw', description: 'Cash out your earnings easily' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Platform Statistics</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '10,000+', label: 'Active Users' },
              { number: '50,000+', label: 'Tasks Completed' },
              { number: '$500K+', label: 'Total Paid Out' },
              { number: '4.9/5', label: 'User Rating' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-xl">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
