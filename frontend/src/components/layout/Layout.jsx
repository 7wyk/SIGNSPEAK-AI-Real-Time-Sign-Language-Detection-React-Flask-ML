import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import AnimatedBackground from '../AnimatedBackground';
import { ROUTES } from '../../utils/constants';

const Layout = ({ children }) => {
    const location = useLocation();
    const isLandingPage = location.pathname === ROUTES.HOME;

    return (
        <div className="min-h-screen flex flex-col">
            <AnimatedBackground showHeroImage={isLandingPage} />
            <Navbar />
            <main className="flex-1 pt-16">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
