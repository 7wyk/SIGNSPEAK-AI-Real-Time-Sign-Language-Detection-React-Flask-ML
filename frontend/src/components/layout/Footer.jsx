import { Github, Twitter, Linkedin } from 'lucide-react';
import { APP_NAME } from '../../utils/constants';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="glass border-t border-white/10 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-white/60 text-sm">
                        © {currentYear} {APP_NAME}. Breaking barriers, one sign at a time.
                    </div>

                    <div className="flex items-center space-x-6">
                        <a href="#" className="text-white/60 hover:text-primary transition-colors">
                            <Github size={20} />
                        </a>
                        <a href="#" className="text-white/60 hover:text-primary transition-colors">
                            <Twitter size={20} />
                        </a>
                        <a href="#" className="text-white/60 hover:text-primary transition-colors">
                            <Linkedin size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
