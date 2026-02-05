import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Zap, Globe, Star, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { ROUTES } from '../utils/constants';
import { useAuth } from '../context/AuthContext';

const Landing = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleGetStarted = () => {
        if (isAuthenticated()) {
            navigate(ROUTES.DETECTION);
        } else {
            navigate(ROUTES.LOGIN);
        }
    };

    const features = [
        {
            icon: Zap,
            title: 'Real-Time Processing',
            description: 'Instant sign language recognition and translation with advanced AI algorithms for seamless communication.',
            gradient: 'from-blue-500 to-cyan-500',
        },
        {
            icon: Globe,
            title: 'Multilingual Support',
            description: 'Support for multiple languages including Hindi, Kannada, Malayalam, and English.',
            gradient: 'from-purple-500 to-pink-500',
        },
        {
            icon: Star,
            title: 'Accessibility First',
            description: 'Breaking communication barriers and making technology accessible for the deaf and hard-of-hearing community.',
            gradient: 'from-orange-500 to-red-500',
        },
    ];

    const steps = [
        { number: '01', title: 'Register & Login', description: 'Create your account to access the detection system' },
        { number: '02', title: 'Start Detection', description: 'Allow camera access and begin real-time sign detection' },
        { number: '03', title: 'Get Translation', description: 'Receive instant text and audio translation in your preferred language' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-20 min-h-[70vh] flex flex-col items-center justify-center"
            >
                <motion.h1
                    className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient drop-shadow-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{
                        textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                        fontFamily: "'Poppins', 'Inter', sans-serif",
                        letterSpacing: '0.02em'
                    }}
                >
                    Bridging human expression
                    <br />
                    with artificial intelligence.
                </motion.h1>

                <motion.p
                    className="text-xl md:text-2xl text-white mb-10 max-w-3xl mx-auto backdrop-blur-sm bg-dark-900/30 px-6 py-3 rounded-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.7)' }}
                >
                    Revolutionary real-time sign language translation system powered by AI
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <Button onClick={handleGetStarted} size="lg" className="group shadow-2xl">
                        Get Started
                    </Button>
                </motion.div>
            </motion.div>

            {/* Features Grid */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="grid md:grid-cols-3 gap-8 mb-20"
            >
                {features.map((feature, index) => (
                    <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 + index * 0.1 }}
                    >
                        <Card className="h-full text-center">
                            <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}>
                                <feature.icon size={32} className="text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-white/70 leading-relaxed">{feature.description}</p>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>

            {/* How It Works */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mb-20"
            >
                <h2 className="text-4xl font-bold text-center mb-12 text-gradient">
                    How It Works
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.number}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.3 + index * 0.1 }}
                        >
                            <Card className="text-center">
                                <div className="text-6xl font-bold text-gradient mb-4">{step.number}</div>
                                <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                                <p className="text-white/60 text-sm">{step.description}</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
            >
                <Card className="text-center py-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Ready to break communication barriers?
                    </h2>
                    <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                        Join thousands of users making the world more accessible through AI-powered sign language translation.
                    </p>
                    <Button onClick={handleGetStarted} size="lg">
                        Start Translating Now
                    </Button>
                </Card>
            </motion.div>
        </div>
    );
};

export default Landing;
