import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BasicLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-[#F9FAFB] dark:bg-[#0F172A] font-sans selection:bg-[#7C3AED]/10 dark:selection:bg-[#7C3AED]/30 selection:text-[#7C3AED] dark:selection:text-[#A78BFA]">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default BasicLayout;
