import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import { authAPI } from '../services/api';
import { ROUTES } from '../utils/constants';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password.length < 5) newErrors.password = 'Password must be at least 5 characters';
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        try {
            const response = await authAPI.register(formData.username, formData.password);
            if (response.data.success) {
                toast.success('Registration successful! Please login.');
                navigate(ROUTES.LOGIN);
            } else {
                toast.error(response.data.message || 'Registration failed');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <Card hover={false}>
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold mb-2 text-gradient">Create Account</h1>
                        <p className="text-white/60">Join SignSpeak AI and start translating</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="Email"
                            type="email"
                            name="username"
                            placeholder="your@email.com"
                            value={formData.username}
                            onChange={handleChange}
                            error={errors.username}
                            icon={Mail}
                        />

                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            error={errors.password}
                            icon={Lock}
                        />

                        <Input
                            label="Confirm Password"
                            type="password"
                            name="confirmPassword"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            error={errors.confirmPassword}
                            icon={Lock}
                        />

                        <Button type="submit" loading={loading} className="w-full">
                            Create Account
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-white/60">
                            Already have an account?{' '}
                            <Link to={ROUTES.LOGIN} className="text-primary hover:text-primary-light transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
};

export default Register;
