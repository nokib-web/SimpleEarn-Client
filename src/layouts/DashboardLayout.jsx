import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';

const DashboardLayout = () => {
  const { userData, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  const workerRoutes = [
    { path: '/dashboard/worker-home', label: 'Home', icon: '🏠' },
    { path: '/dashboard/task-list', label: 'Task List', icon: '📋' },
    { path: '/dashboard/my-submissions', label: 'My Submissions', icon: '📝' },
    { path: '/dashboard/withdrawals', label: 'Withdrawals', icon: '💰' }
  ];

  const buyerRoutes = [
    { path: '/dashboard/buyer-home', label: 'Home', icon: '🏠' },
    { path: '/dashboard/add-task', label: 'Add new Tasks', icon: '➕' },
    { path: '/dashboard/my-tasks', label: "My Task's", icon: '📋' },
    { path: '/dashboard/task-review', label: 'Task To Review', icon: '✅' },
    { path: '/dashboard/purchase-coin', label: 'Purchase Coin', icon: '💳' },
    { path: '/dashboard/payment-history', label: 'Payment history', icon: '📊' }
  ];

  const adminRoutes = [
    { path: '/dashboard/admin-home', label: 'Home', icon: '🏠' },
    { path: '/dashboard/manage-users', label: 'Manage Users', icon: '👥' },
    { path: '/dashboard/manage-tasks', label: 'Manage Tasks', icon: '📋' },
    { path: '/dashboard/withdraw-requests', label: 'Withdraw Request', icon: '💸' }
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
    // Redirect to appropriate home based on role
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
    // Refresh notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [userData]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-2xl font-bold text-indigo-600">SimpleEarn</Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-gray-700">
              Coins: <span className="font-bold text-indigo-600">{userData.coin}</span>
            </div>
            
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-700 hover:text-indigo-600"
              >
                🔔
                {notificationCount > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold">Notifications</h3>
                  </div>
                  {notifications.length === 0 ? (
                    <div className="p-4 text-sm text-gray-500">No notifications</div>
                  ) : (
                    <div className="divide-y">
                      {notifications.map((notification) => (
                        <div
                          key={notification._id}
                          className={`p-4 hover:bg-gray-50 cursor-pointer ${!notification.isRead ? 'bg-blue-50' : ''}`}
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
                          <p className="text-sm">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(notification.time).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <img
                src={userData.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}`}
                alt={userData.name}
                className="w-8 h-8 rounded-full"
              />
              <div className="hidden md:block">
                <div className="text-sm font-medium">{userData.name}</div>
                <div className="text-xs text-gray-500 capitalize">{userData.role}</div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`bg-white shadow-md w-64 min-h-screen transition-all ${sidebarOpen ? 'block' : 'hidden md:block'}`}>
          <nav className="p-4">
            <ul className="space-y-2">
              {getRoutes().map((route) => (
                <li key={route.path}>
                  <Link
                    to={route.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                      location.pathname === route.path
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span>{route.icon}</span>
                    <span>{route.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed bottom-4 right-4 md:hidden bg-indigo-600 text-white p-3 rounded-full shadow-lg"
      >
        {sidebarOpen ? '✕' : '☰'}
      </button>

      {/* Click outside to close notifications */}
      {showNotifications && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowNotifications(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;

