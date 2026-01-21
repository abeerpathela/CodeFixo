import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Code, Mail, Lock, Loader2, Github } from 'lucide-react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, loginWithToken } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Handle Google OAuth callback token from URL
        const handleGoogleCallback = async () => {
            const params = new URLSearchParams(location.search);
            const token = params.get('token');
            if (token) {
                setLoading(true);
                try {
                    await loginWithToken(token);
                    navigate('/dashboard');
                } catch (err) {
                    setError('Failed to complete Google authentication.');
                } finally {
                    setLoading(false);
                }
            }

            const urlError = params.get('error');
            if (urlError === 'auth_failed') {
                setError('Google Authentication failed. Please try again.');
            }
        };

        handleGoogleCallback();
    }, [location, loginWithToken, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        // Redirect to backend Google Auth route
        window.location.href = 'https://codefixo.onrender.com/api/auth/google';
    };

    return (
        <div className="min-h-screen bg-dark-bg flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-dark-card rounded-3xl border border-dark-border p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center bg-dark-accent p-3 rounded-2xl mb-4">
                        <Code className="text-white w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-bold">Welcome Back</h2>
                    <p className="text-dark-muted mt-2">Continue your coding journey with CodeFixo</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-dark-text">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-muted" />
                            <input
                                type="email"
                                required
                                className="w-full bg-dark-bg border border-dark-border rounded-xl py-3 pl-11 pr-4 focus:border-dark-accent outline-none transition text-dark-text"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-dark-text">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-muted" />
                            <input
                                type="password"
                                required
                                className="w-full bg-dark-bg border border-dark-border rounded-xl py-3 pl-11 pr-4 focus:border-dark-accent outline-none transition text-dark-text"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-dark-accent hover:bg-dark-accentHover text-white py-3 rounded-xl font-bold transition flex items-center justify-center disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : 'Sign In'}
                    </button>
                </form>

                <div className="relative my-8 text-center">
                    <hr className="border-dark-border" />
                    <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-dark-card px-4 text-sm text-dark-muted">Or continue with</span>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    className="w-full bg-white text-gray-900 py-3 rounded-xl font-bold transition flex items-center justify-center hover:bg-gray-100 mb-6"
                >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5 mr-3" alt="Google" />
                    Sign in with Google
                </button>

                <p className="text-center text-dark-muted text-sm">
                    Don't have an account? <Link to="/signup" className="text-dark-accent hover:underline font-semibold">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
