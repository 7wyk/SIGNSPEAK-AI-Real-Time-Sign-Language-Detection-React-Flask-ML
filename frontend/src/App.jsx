import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Detection from './pages/Detection';
import Feedback from './pages/Feedback';
import { ROUTES } from './utils/constants';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Layout>
                    <Routes>
                        <Route path={ROUTES.HOME} element={<Landing />} />
                        <Route path={ROUTES.LOGIN} element={<Login />} />
                        <Route path={ROUTES.REGISTER} element={<Register />} />
                        <Route
                            path={ROUTES.DETECTION}
                            element={
                                <ProtectedRoute>
                                    <Detection />
                                </ProtectedRoute>
                            }
                        />
                        <Route path={ROUTES.FEEDBACK} element={<Feedback />} />
                    </Routes>
                </Layout>

                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 4000,
                        style: {
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(20px)',
                            color: '#fff',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                        },
                        success: {
                            iconTheme: {
                                primary: '#ff6b4a',
                                secondary: '#fff',
                            },
                        },
                    }}
                />
            </Router>
        </AuthProvider>
    );
}

export default App;
