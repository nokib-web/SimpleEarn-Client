import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BasicLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-[#F9FAFB] font-sans selection:bg-[#7C3AED]/10 selection:text-[#7C3AED]">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default BasicLayout;
