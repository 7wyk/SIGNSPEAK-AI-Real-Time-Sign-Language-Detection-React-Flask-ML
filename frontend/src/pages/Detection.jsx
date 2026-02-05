import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, VideoOff, Languages, Play, Square } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { detectionAPI, translationAPI } from '../services/api';
import { usePrediction } from '../hooks/usePrediction';
import { SUPPORTED_LANGUAGES } from '../utils/constants';

const Detection = () => {
    const [isDetecting, setIsDetecting] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('hindi');
    const [translatedText, setTranslatedText] = useState('');
    const [translating, setTranslating] = useState(false);
    const { prediction } = usePrediction(isDetecting);

    // Text-to-speech
    const speak = (text) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.8;
            utterance.pitch = 1;
            utterance.volume = 0.8;
            window.speechSynthesis.speak(utterance);
        }
    };

    // Speak prediction when it changes
    useEffect(() => {
        if (prediction && isDetecting) {
            const cleanPrediction = prediction.replace(/_/g, ' ');
            speak(cleanPrediction);
        }
    }, [prediction, isDetecting]);

    const handleStartDetection = async () => {
        setLoading(true);
        try {
            const response = await detectionAPI.start();
            if (response.data.success) {
                setIsDetecting(true);
                toast.success('Detection started! Make signs in front of the camera.');
            } else {
                toast.error(response.data.message || 'Failed to start detection');
            }
        } catch (error) {
            toast.error('Failed to start detection. Please check camera permissions.');
        } finally {
            setLoading(false);
        }
    };

    const handleStopDetection = async () => {
        try {
            const response = await detectionAPI.stop();
            if (response.data.success) {
                setIsDetecting(false);
                setTranslatedText('');
                toast.success('Detection stopped');
            }
        } catch (error) {
            toast.error('Failed to stop detection');
        }
    };

    const handleTranslate = async () => {
        if (!prediction) {
            toast.error('No sign detected yet!');
            return;
        }

        setTranslating(true);
        try {
            const cleanPrediction = prediction.replace(/_/g, ' ');
            const response = await translationAPI.translate(cleanPrediction, selectedLanguage);
            if (response.data.success) {
                setTranslatedText(response.data.translated_text);
                speak(response.data.translated_text);
                toast.success(`Translated to ${selectedLanguage}!`);
            } else {
                toast.error('Translation failed');
            }
        } catch (error) {
            toast.error('Translation failed. Please check your internet connection.');
        } finally {
            setTranslating(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
                    Sign Language Detection
                </h1>
                <p className="text-xl text-white/70">
                    Real-time sign language recognition and translation
                </p>
            </motion.div>

            {/* Controls */}
            <Card className="mb-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex gap-4">
                        {!isDetecting ? (
                            <Button onClick={handleStartDetection} loading={loading} size="lg">
                                <Play className="mr-2" size={20} />
                                Start Detection
                            </Button>
                        ) : (
                            <Button onClick={handleStopDetection} variant="secondary" size="lg">
                                <Square className="mr-2" size={20} />
                                Stop Detection
                            </Button>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <select
                            value={selectedLanguage}
                            onChange={(e) => setSelectedLanguage(e.target.value)}
                            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary/30"
                        >
                            {SUPPORTED_LANGUAGES.map((lang) => (
                                <option key={lang.code} value={lang.code} className="bg-dark-800">
                                    {lang.flag} {lang.label}
                                </option>
                            ))}
                        </select>

                        <Button
                            onClick={handleTranslate}
                            loading={translating}
                            disabled={!isDetecting || !prediction}
                            variant="secondary"
                        >
                            <Languages className="mr-2" size={20} />
                            Translate
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Video Feed */}
            <Card className="mb-8">
                <div className="relative aspect-video bg-dark-800 rounded-xl overflow-hidden">
                    {isDetecting ? (
                        <img
                            src={detectionAPI.getVideoFeed()}
                            alt="Video feed"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white/40">
                            <VideoOff size={64} className="mb-4" />
                            <p className="text-xl">Camera feed will appear here</p>
                        </div>
                    )}
                </div>
            </Card>

            {/* Results */}
            <div className="grid md:grid-cols-2 gap-8">
                {/* Detected Sign */}
                <Card>
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Video className="text-primary" size={24} />
                            <h3 className="text-2xl font-bold">Detected Sign</h3>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={prediction || 'waiting'}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="min-h-[100px] flex items-center justify-center"
                            >
                                <p className="text-3xl font-bold text-gradient">
                                    {prediction ? prediction.replace(/_/g, ' ') : 'Waiting for detection...'}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        <p className="text-white/60 text-sm mt-4">
                            Perform sign language gestures in front of the camera
                        </p>
                    </div>
                </Card>

                {/* Translation */}
                <Card>
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Languages className="text-green-500" size={24} />
                            <h3 className="text-2xl font-bold">Translation</h3>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={translatedText || 'empty'}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="min-h-[100px] flex items-center justify-center"
                            >
                                <p className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                                    {translatedText || 'Click translate to see translation'}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        <p className="text-white/60 text-sm mt-4">
                            Select your preferred language above
                        </p>
                    </div>
                </Card>
            </div>

            {/* Instructions */}
            <Card className="mt-8">
                <h3 className="text-2xl font-bold text-center mb-6 text-gradient">
                    How to Use
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { step: '1', title: 'Start Detection', desc: 'Click "Start Detection" to activate your camera' },
                        { step: '2', title: 'Perform Signs', desc: 'Make clear hand gestures in front of the camera' },
                        { step: '3', title: 'Get Translation', desc: 'Select language and click translate for instant translation' },
                    ].map((item) => (
                        <div key={item.step} className="text-center">
                            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center text-2xl font-bold">
                                {item.step}
                            </div>
                            <h4 className="font-bold mb-2">{item.title}</h4>
                            <p className="text-white/60 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default Detection;
