import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const Button = forwardRef(({
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    className = '',
    ...props
}, ref) => {
    const baseStyles = 'font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden';

    const variants = {
        primary: 'bg-gradient-to-r from-primary to-orange-500 hover:from-primary-dark hover:to-orange-600 text-white glow-hover',
        secondary: 'glass glass-hover text-white border border-white/20',
        outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    return (
        <motion.button
            ref={ref}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={loading}
            {...props}
        >
            {loading ? (
                <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Loading...
                </span>
            ) : (
                children
            )}
        </motion.button>
    );
});

Button.displayName = 'Button';

export default Button;
