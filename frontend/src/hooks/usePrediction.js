import { useState, useEffect, useRef } from 'react';
import { detectionAPI } from '../services/api';
import { PREDICTION_POLL_INTERVAL } from '../utils/constants';

export const usePrediction = (isDetecting) => {
    const [prediction, setPrediction] = useState('');
    const [loading, setLoading] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isDetecting) {
            setLoading(true);

            const fetchPrediction = async () => {
                try {
                    const response = await detectionAPI.getPrediction();
                    if (response.data.prediction) {
                        setPrediction(response.data.prediction);
                    }
                } catch (error) {
                    console.error('Error fetching prediction:', error);
                } finally {
                    setLoading(false);
                }
            };

            // Start polling
            intervalRef.current = setInterval(fetchPrediction, PREDICTION_POLL_INTERVAL);

            return () => {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
            };
        } else {
            setPrediction('');
            setLoading(false);
        }
    }, [isDetecting]);

    return { prediction, loading };
};
