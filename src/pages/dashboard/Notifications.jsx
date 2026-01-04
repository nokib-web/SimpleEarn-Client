import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HiOutlineBellSlash } from 'react-icons/hi2';

const Notifications = () => {
    const { userData } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotifications = async () => {
            if (userData?.email) {
                try {
                    const response = await api.get(`/notifications/${userData.email}`);
                    setNotifications(response.data);
                } catch (error) {
                    console.error('Error fetching notifications:', error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchNotifications();
    }, [userData]);

    const handleRead = async (notification) => {
        if (!notification.isRead) {
            try {
                await api.patch(`/notifications/${notification._id}/read`);
                setNotifications(notifications.map(n =>
                    n._id === notification._id ? { ...n, isRead: true } : n
                ));
            } catch (error) {
                console.error("Error marking as read", error);
            }
        }
        if (notification.actionRoute) {
            navigate(notification.actionRoute);
        }
    };

    if (loading) {
        return <div className="p-8 text-center">Loading notifications...</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 md:p-8"
        >
            <h1 className="text-2xl font-black text-[#0F172A] dark:text-white mb-6 tracking-tight">Notifications</h1>

            <div className="bg-white dark:bg-[#1E293B] rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-16 text-center text-gray-400 dark:text-gray-500">
                        <HiOutlineBellSlash className="w-12 h-12 mb-4 opacity-50" />
                        <p className="font-medium">No system updates currently.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100 dark:divide-gray-800">
                        {notifications.map((notification) => (
                            <div
                                key={notification._id}
                                onClick={() => handleRead(notification)}
                                className={`p-6 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer flex gap-4 ${!notification.isRead ? 'bg-[#7C3AED]/5' : ''}`}
                            >
                                <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${!notification.isRead ? 'bg-[#7C3AED]' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                                <div>
                                    <p className={`text-sm ${!notification.isRead ? 'font-bold text-[#0F172A] dark:text-white' : 'font-medium text-gray-600 dark:text-gray-400'}`}>
                                        {notification.message}
                                    </p>
                                    <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider mt-2">
                                        {new Date(notification.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' })}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Notifications;
