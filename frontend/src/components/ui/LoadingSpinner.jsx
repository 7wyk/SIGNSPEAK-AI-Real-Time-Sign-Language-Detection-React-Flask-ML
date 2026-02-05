import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'md', className = '' }) => {
    const sizes = {
        sm: 'w-4 h-4 border-2',
        md: 'w-8 h-8 border-3',
        lg: 'w-12 h-12 border-4',
    };

    return (
        <div className={`flex items-center justify-center ${className}`}>
            <motion.div
                className={`${sizes[size]} border-white/30 border-t-primary rounded-full`}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
        </div>
    );
};

export default LoadingSpinner;
