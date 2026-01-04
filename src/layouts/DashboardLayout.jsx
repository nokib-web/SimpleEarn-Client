import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';
import api from '../utils/api';
import Logo from '../components/Logo';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineHome,
  HiOutlineClipboardDocumentList,
  HiOutlineDocumentText,
  HiOutlineBanknotes,
  HiOutlinePlusCircle,
  HiOutlineQueueList,
  HiOutlineClipboardDocumentCheck,
  HiOutlineCreditCard,
  HiOutlineChartBar,
  HiOutlineUsers,
  HiOutlinePencilSquare,
  HiOutlineCurrencyDollar,
  HiOutlineNewspaper
} from 'react-icons/hi2';

const DashboardLayout = () => {
  const { userData, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  const workerRoutes = [
    { path: '/dashboard/worker-home', label: 'Home', icon: <HiOutlineHome /> },
    { path: '/dashboard/task-list', label: 'Task List', icon: <HiOutlineClipboardDocumentList /> },
    { path: '/dashboard/my-submissions', label: 'My Submissions', icon: <HiOutlineDocumentText /> },
    { path: '/dashboard/withdrawals', label: 'Withdrawals', icon: <HiOutlineBanknotes /> }
  ];

  const buyerRoutes = [
    { path: '/dashboard/buyer-home', label: 'Home', icon: <HiOutlineHome /> },
    { path: '/dashboard/add-task', label: 'Add new Tasks', icon: <HiOutlinePlusCircle /> },
    { path: '/dashboard/my-tasks', label: "My Task's", icon: <HiOutlineQueueList /> },
    { path: '/dashboard/task-review', label: 'Task To Review', icon: <HiOutlineClipboardDocumentCheck /> },
    { path: '/dashboard/purchase-coin', label: 'Purchase Coin', icon: <HiOutlineCreditCard /> },
    { path: '/dashboard/payment-history', label: 'Payment history', icon: <HiOutlineChartBar /> }
  ];

  const adminRoutes = [
    { path: '/dashboard/admin-home', label: 'Home', icon: <HiOutlineHome /> },
    { path: '/dashboard/manage-users', label: 'Manage Users', icon: <HiOutlineUsers /> },
    { path: '/dashboard/manage-tasks', label: 'Manage Tasks', icon: <HiOutlinePencilSquare /> },
    { path: '/dashboard/manage-blogs', label: 'Manage Blogs', icon: <HiOutlineNewspaper /> },
    { path: '/dashboard/withdraw-requests', label: 'Withdraw Request', icon: <HiOutlineCurrencyDollar /> }
  ];

  const getRoutes = () => {
    if (userData?.role === 'worker') return workerRoutes;
    if (userData?.role === 'buyer') return buyerRoutes;
    if (userData?.role === 'admin') return adminRoutes;
    return [];
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    if (location.pathname === '/dashboard') {
      if (userData?.role === 'worker') navigate('/dashboard/worker-home');
      else if (userData?.role === 'buyer') navigate('/dashboard/buyer-home');
      else if (userData?.role === 'admin') navigate('/dashboard/admin-home');
    }
  }, [location, userData, navigate]);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (userData?.email) {
        try {
          const response = await api.get(`/notifications/${userData.email}`);
          setNotifications(response.data);
          setNotificationCount(response.data.filter(n => !n.isRead).length);
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [userData]);

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFDFF]">
        <div className="w-12 h-12 border-4 border-purple-100 border-t-[#7C3AED] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-[1000] bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 mr-2 rounded-xl hover:bg-gray-100 text-[#64748B] transition-colors md:hidden"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Logo />
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden sm:flex items-center bg-[#F8FAFC] border border-[#7C3AED]/10 rounded-2xl px-4 py-2">
              <span className="w-2h-2 bg-[#7C3AED] rounded-full animate-pulse mr-2 hidden lg:block"></span>
              <span className="text-[#64748B] text-sm font-bold mr-2">Wallet:</span>
              <span className="text-[#7C3AED] font-extrabold">{userData.coin.toLocaleString()}</span>
              <span className="text-[#14B8A6] text-xs font-bold ml-1 uppercase border-l border-gray-100 pl-2">Coins</span>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-3 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 hover:shadow-md transition-all group"
              >
                <svg className="w-6 h-6 text-[#64748B] group-hover:text-[#7C3AED] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {notificationCount > 0 && (
                  <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-[#F97316] border-2 border-white rounded-full animate-bounce"></span>
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-96 bg-white rounded-3xl shadow-2xl shadow-purple-100 border border-gray-100 overflow-hidden z-50 ring-1 ring-black/5"
                  >
                    <div className="p-6 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
                      <h3 className="font-black text-[#0F172A] text-sm uppercase tracking-widest">Protocol Alerts</h3>
                      <span className="px-2.5 py-1 bg-[#7C3AED]/10 text-[#7C3AED] text-[10px] font-black rounded-lg uppercase tracking-wider">{notificationCount} New</span>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto overflow-x-hidden p-2">
                      {notifications.length === 0 ? (
                        <div className="p-12 text-center text-gray-400 font-medium">No system updates.</div>
                      ) : (
                        <div className="space-y-1">
                          {notifications.map((notification) => (
                            <div
                              key={notification._id}
                              className={`p-4 rounded-2xl hover:bg-[#F8FAFC] transition-colors cursor-pointer relative group ${!notification.isRead ? 'bg-[#7C3AED]/5' : ''}`}
                              onClick={() => {
                                if (!notification.isRead) {
                                  api.patch(`/notifications/${notification._id}/read`);
                                  setNotifications(notifications.map(n =>
                                    n._id === notification._id ? { ...n, isRead: true } : n
                                  ));
                                  setNotificationCount(prev => Math.max(0, prev - 1));
                                }
                                navigate(notification.actionRoute);
                                setShowNotifications(false);
                              }}
                            >
                              <div className="flex gap-4">
                                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${!notification.isRead ? 'bg-[#7C3AED]' : 'bg-transparent'}`}></div>
                                <div>
                                  <p className="text-sm font-bold text-[#475569] leading-snug group-hover:text-[#7C3AED] transition-colors">{notification.message}</p>
                                  <p className="text-[10px] text-[#94A3B8] font-black uppercase tracking-wider mt-2 flex items-center gap-2">
                                    <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                                    {new Date(notification.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="h-10 w-[1px] bg-gray-100 mx-2 hidden md:block"></div>

            <div className="flex items-center gap-3 bg-[#F8FAFC] p-1.5 pr-4 rounded-2xl border border-[#7C3AED]/5">
              <img
                src={userData.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}`}
                alt={userData.name}
                className="w-10 h-10 rounded-xl object-cover shadow-sm ring-2 ring-white"
              />
              <div className="hidden lg:block text-left">
                <div className="text-sm font-black text-[#0F172A] leading-none mb-1">{userData.name.split(' ')[0]}</div>
                <div className="text-[10px] text-[#7C3AED] font-black uppercase tracking-widest">{userData.role}</div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-3 text-[#64748B] hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
              title="Logout"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className="flex-grow flex flex-col md:flex-row max-w-7xl mx-auto w-full px-4 gap-8 py-8 md:py-12">
        {/* Sidebar */}
        <aside className={`
            fixed inset-0 z-[100000] md:relative md:z-10 md:block 
            w-full md:w-64 transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1)
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          {/* Mobile Overlay */}
          <div className={`fixed inset-0 bg-[#0F172A]/70 backdrop-blur-2xl md:hidden ${sidebarOpen ? 'block' : 'hidden'}`} onClick={() => setSidebarOpen(false)}></div>

          <nav className="relative h-full bg-white md:bg-transparent rounded-[3rem] p-8 md:p-0 border border-gray-100 md:border-none shadow-3xl md:shadow-none overflow-y-auto">
            <div className="mb-10 md:hidden flex justify-between items-center">
              <Logo />
              <button onClick={() => setSidebarOpen(false)} className="p-3 bg-[#F8FAFC] rounded-2xl text-[#64748B] hover:text-[#7C3AED] transition-colors">✕</button>
            </div>

            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#94A3B8] mb-8 px-5">Protocol Terminal</p>

            <ul className="space-y-3">
              {getRoutes().map((route) => {
                const isActive = location.pathname === route.path;
                return (
                  <li key={route.path}>
                    <Link
                      to={route.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`
                        flex items-center gap-5 px-6 py-5 rounded-[2rem] font-black text-sm transition-all group relative
                        ${isActive
                          ? 'bg-[#7C3AED] text-white shadow-2xl shadow-purple-200'
                          : 'text-[#64748B] hover:bg-white hover:text-[#7C3AED] border border-transparent hover:border-[#7C3AED]/10'
                        }
                      `}
                    >
                      <span className={`text-2xl transition-all duration-500 group-hover:scale-110 ${isActive ? 'text-white' : 'text-[#7C3AED] opacity-50 group-hover:opacity-100'}`}>{route.icon}</span>
                      <span className="tracking-tight">{route.label}</span>
                      {isActive && <motion.div layoutId="nav-pill" className="ml-auto w-2 h-2 bg-white rounded-full shadow-lg" />}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-16 pt-16 border-t border-gray-100 hidden md:block">
              <div className="bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#4338CA] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-purple-100 group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative z-10 text-center">
                  <span className="text-[10px] font-black text-purple-200 uppercase tracking-widest mb-3 block">Protocol Upgrade</span>
                  <h4 className="text-xl font-black mb-6 leading-tight tracking-tight">Post More,<br />Earn More.</h4>
                  <Link to="/dashboard/purchase-coin" className="inline-block w-full py-3 bg-white text-[#7C3AED] rounded-[1.25rem] font-black text-xs hover:bg-[#FDFDFF] transition-all active:scale-95 shadow-lg">Buy Protocol Pack</Link>
                </div>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-white rounded-[4rem] p-8 lg:p-16 border border-gray-100 shadow-sm min-h-[75vh] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F8FAFC] rounded-full blur-[100px] -mr-32 -mt-32"></div>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: 20, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: "circOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardLayout;
