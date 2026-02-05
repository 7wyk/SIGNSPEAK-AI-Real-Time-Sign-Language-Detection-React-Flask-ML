import { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';

const Input = forwardRef(({
    label,
    error,
    icon: Icon,
    className = '',
    ...props
}, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-semibold text-white/90 mb-2">
                    {label}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
                        <Icon size={20} />
                    </div>
                )}
                <motion.input
                    ref={ref}
                    animate={{
                        borderColor: isFocused ? 'rgba(255, 107, 74, 0.5)' : 'rgba(255, 255, 255, 0.1)',
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`
            w-full px-4 py-3 ${Icon ? 'pl-12' : ''} 
            bg-white/5 backdrop-blur-xl 
            border border-white/10 
            rounded-xl 
            text-white placeholder:text-white/40
            focus:outline-none focus:ring-2 focus:ring-primary/30
            transition-all duration-300
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
                    {...props}
                />
            </div>
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-red-400"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
