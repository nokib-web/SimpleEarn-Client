import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-white dark:bg-[#1E293B] border border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:shadow-md hover:scale-110 active:scale-95 text-[#64748B] dark:text-[#94A3B8] relative overflow-hidden group"
            aria-label="Toggle Theme"
        >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#7C3AED]/10 to-[#14B8A6]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <AnimatePresence mode="wait" initial={false}>
                {theme === 'light' ? (
                    <motion.div
                        key="sun"
                        initial={{ y: 20, opacity: 0, rotate: -45 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: -20, opacity: 0, rotate: 45 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                        <HiOutlineSun className="w-5 h-5 text-[#F59E0B]" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="moon"
                        initial={{ y: 20, opacity: 0, rotate: -45 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: -20, opacity: 0, rotate: 45 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                        <HiOutlineMoon className="w-5 h-5 text-[#8B5CF6]" />
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    );
};

export default ThemeToggle;
