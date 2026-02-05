import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import heroImage from '../assets/images/hero-bg.png';

const AnimatedBackground = ({ showHeroImage = false }) => {
    const [imageOpacity, setImageOpacity] = useState(0);

    useEffect(() => {
        if (showHeroImage) {
            // Fade in the image
            const timer = setTimeout(() => setImageOpacity(1), 300);
            return () => clearTimeout(timer);
        } else {
            setImageOpacity(0);
        }
    }, [showHeroImage]);

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-700" />

            {/* Hero Background Image with fade effect */}
            {showHeroImage && (
                <motion.div
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: imageOpacity, scale: 1 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className="absolute inset-0"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url(${heroImage})`,
                            filter: 'brightness(0.4) contrast(1.1)',
                        }}
                    />
                    {/* Gradient overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-dark-900/80 via-dark-900/60 to-dark-900/90" />
                    <div className="absolute inset-0 bg-gradient-to-r from-dark-900/70 via-transparent to-dark-900/70" />
                </motion.div>
            )}

            {/* Animated orbs - more subtle when image is shown */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.2, 1],
                    opacity: showHeroImage ? [0.05, 0.08, 0.05] : [0.1, 0.15, 0.1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            <motion.div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"
                animate={{
                    x: [0, -100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.3, 1],
                    opacity: showHeroImage ? [0.05, 0.08, 0.05] : [0.1, 0.15, 0.1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            <motion.div
                className="absolute top-1/2 left-1/2 w-96 h-96 bg-primary-light/10 rounded-full blur-3xl"
                animate={{
                    x: [0, 50, 0],
                    y: [0, -100, 0],
                    scale: [1, 1.1, 1],
                    opacity: showHeroImage ? [0.05, 0.08, 0.05] : [0.1, 0.15, 0.1],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Grid overlay - lighter when image is shown */}
            <div
                className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]"
                style={{ opacity: showHeroImage ? 0.1 : 0.2 }}
            />
        </div>
    );
};

export default AnimatedBackground;
