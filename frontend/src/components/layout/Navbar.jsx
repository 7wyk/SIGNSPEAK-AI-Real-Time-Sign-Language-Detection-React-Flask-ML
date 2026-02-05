import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Home, LogIn, UserPlus, MessageSquare, Video } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ROUTES, APP_NAME } from '../../utils/constants';
import Button from '../ui/Button';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate(ROUTES.HOME);
    };

    const navLinks = [
        { to: ROUTES.HOME, label: 'Home', icon: Home },
        ...(isAuthenticated()
            ? [{ to: ROUTES.DETECTION, label: 'Detection', icon: Video }]
            : [
                { to: ROUTES.LOGIN, label: 'Login', icon: LogIn },
                { to: ROUTES.REGISTER, label: 'Register', icon: UserPlus },
            ]
        ),
        { to: ROUTES.FEEDBACK, label: 'Feedback', icon: MessageSquare },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to={ROUTES.HOME} className="flex items-center space-x-2">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="text-2xl font-bold text-gradient"
                        >
                            {APP_NAME}
                        </motion.div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navLinks.map(({ to, label, icon: Icon }) => (
                            <Link
                                key={to}
                                to={to}
                                className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
                            >
                                <Icon size={18} />
                                <span>{label}</span>
                            </Link>
                        ))}
                        {isAuthenticated() && (
                            <Button onClick={handleLogout} size="sm" variant="outline">
                                Logout
                            </Button>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-white p-2"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden glass border-t border-white/10"
                >
                    <div className="px-4 py-4 space-y-3">
                        {navLinks.map(({ to, label, icon: Icon }) => (
                            <Link
                                key={to}
                                to={to}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors py-2"
                            >
                                <Icon size={18} />
                                <span>{label}</span>
                            </Link>
                        ))}
                        {isAuthenticated() && (
                            <Button onClick={handleLogout} size="sm" variant="outline" className="w-full">
                                Logout
                            </Button>
                        )}
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
};

export default Navbar;
