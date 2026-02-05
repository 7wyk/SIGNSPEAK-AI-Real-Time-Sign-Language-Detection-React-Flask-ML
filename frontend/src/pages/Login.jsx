import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../utils/constants';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
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
            const response = await authAPI.login(formData.username, formData.password);
            if (response.data.success) {
                login(response.data.token);
                toast.success('Login successful!');
                navigate(ROUTES.DETECTION);
            } else {
                toast.error(response.data.message || 'Login failed');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Invalid credentials');
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
                        <h1 className="text-3xl font-bold mb-2 text-gradient">Welcome Back</h1>
                        <p className="text-white/60">Sign in to continue to SignSpeak AI</p>
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

                        <Button type="submit" loading={loading} className="w-full">
                            Sign In
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-white/60">
                            Don't have an account?{' '}
                            <Link to={ROUTES.REGISTER} className="text-primary hover:text-primary-light transition-colors">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
};

export default Login;
