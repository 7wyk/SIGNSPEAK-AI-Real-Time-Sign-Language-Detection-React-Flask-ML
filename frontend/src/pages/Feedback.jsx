import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { feedbackAPI } from '../services/api';

const Feedback = () => {
    const [feedback, setFeedback] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!feedback.trim()) {
            toast.error('Please enter your feedback');
            return;
        }

        setLoading(true);
        try {
            const response = await feedbackAPI.submit(feedback);
            if (response.data.success) {
                toast.success('Thank you for your feedback!');
                setFeedback('');
            } else {
                toast.error('Failed to submit feedback');
            }
        } catch (error) {
            toast.error('Failed to submit feedback. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <div className="flex items-center justify-center gap-3 mb-4">
                    <MessageSquare className="text-primary" size={40} />
                    <h1 className="text-4xl md:text-5xl font-bold text-gradient">
                        Feedback
                    </h1>
                </div>
                <p className="text-xl text-white/70">
                    Help us improve SignSpeak AI with your valuable feedback
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <Card hover={false}>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-white/90 mb-2">
                                Your Feedback
                            </label>
                            <textarea
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                placeholder="Share your thoughts, suggestions, or report issues..."
                                rows={8}
                                className="w-full px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-300 resize-none"
                            />
                        </div>

                        <Button type="submit" loading={loading} size="lg" className="w-full group">
                            <Send className="mr-2 group-hover:translate-x-1 transition-transform" size={20} />
                            Submit Feedback
                        </Button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-white/10">
                        <h3 className="text-lg font-bold mb-4">What we'd love to hear about:</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                '✨ Feature requests',
                                '🐛 Bug reports',
                                '💡 Improvement suggestions',
                                '🎨 UI/UX feedback',
                                '🚀 Performance issues',
                                '📱 Mobile experience',
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-2 text-white/70">
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
};

export default Feedback;
