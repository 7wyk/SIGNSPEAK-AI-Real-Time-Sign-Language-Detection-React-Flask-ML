import { createContext, useContext, useState, useEffect } from 'react';
import { TOKEN_KEY } from '../utils/constants';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem(TOKEN_KEY);
        if (storedToken) {
            setToken(storedToken);
        }
        setLoading(false);
    }, []);

    const login = (newToken) => {
        localStorage.setItem(TOKEN_KEY, newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
    };

    const isAuthenticated = () => !!token;

    return (
        <AuthContext.Provider value={{ token, login, logout, isAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
