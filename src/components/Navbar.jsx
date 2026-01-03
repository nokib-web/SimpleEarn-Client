import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

const Navbar = () => {
    const { userData, logout } = useAuth();
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const githubRepoUrl = 'https://github.com/yourusername/simpleEarn-client';

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <span className="text-2xl font-bold text-indigo-600">SimpleEarn</span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        {userData ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Dashboard
                                </Link>
                                <div className="text-gray-700 px-3 py-2 text-sm font-medium">
                                    Coins: <span className="font-bold text-indigo-600">{userData.coin}</span>
                                </div>
                                <div className="relative">
                                    <button
                                        onClick={() => setShowDropdown(!showDropdown)}
                                        className="flex items-center space-x-2 focus:outline-none"
                                    >
                                        <img
                                            src={userData.photoURL || '/default-avatar.png'}
                                            alt={userData.name}
                                            className="w-8 h-8 rounded-full"
                                            onError={(e) => {
                                                e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(userData.name);
                                            }}
                                        />
                                    </button>
                                    {showDropdown && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                            <div className="px-4 py-2 border-b">
                                                <p className="text-sm font-medium text-gray-900">{userData.name}</p>
                                                <p className="text-xs text-gray-500">{userData.email}</p>
                                            </div>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <a
                                    href={githubRepoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                                >
                                    Join as Developer
                                </a>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                                >
                                    Register
                                </Link>
                                <a
                                    href={githubRepoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                                >
                                    Join as Developer
                                </a>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {showDropdown && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowDropdown(false)}
                />
            )}
        </nav>
    );
};

export default Navbar;

