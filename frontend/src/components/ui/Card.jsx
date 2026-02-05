import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = true, ...props }) => {
    return (
        <motion.div
            whileHover={hover ? { y: -5 } : {}}
            className={`
        glass rounded-2xl p-6 
        border border-white/10
        shadow-xl
        transition-all duration-300
        ${className}
      `}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
