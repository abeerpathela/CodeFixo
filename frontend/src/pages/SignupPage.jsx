import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Code, Mail, Lock, User, Loader2 } from 'lucide-react';

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signup(name, email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = 'https://codefixo.onrender.com/api/auth/google';
    };

    return (
        <div className="min-h-screen bg-dark-bg flex items-center justify-center p-6 text-dark-text">
            <div className="w-full max-w-md bg-dark-card rounded-3xl border border-dark-border p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center bg-dark-accent p-3 rounded-2xl mb-4">
                        <Code className="text-white w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-bold">Create Account</h2>
                    <p className="text-dark-muted mt-2">Start your journey with CodeFixo today</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-muted" />
                            <input
                                type="text"
                                required
                                className="w-full bg-dark-bg border border-dark-border rounded-xl py-3 pl-11 pr-4 focus:border-dark-accent outline-none transition"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-muted" />
                            <input
                                type="email"
                                required
                                className="w-full bg-dark-bg border border-dark-border rounded-xl py-3 pl-11 pr-4 focus:border-dark-accent outline-none transition"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-muted" />
                            <input
                                type="password"
                                required
                                className="w-full bg-dark-bg border border-dark-border rounded-xl py-3 pl-11 pr-4 focus:border-dark-accent outline-none transition"
                                placeholder="Min 6 characters"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-dark-accent hover:bg-dark-accentHover text-white py-3 rounded-xl font-bold transition flex items-center justify-center disabled:opacity-50 mt-4"
                    >
                        {loading ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : 'Get Started'}
                    </button>
                </form>

                <div className="relative my-8 text-center">
                    <hr className="border-dark-border" />
                    <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-dark-card px-4 text-sm text-dark-muted">Or signup with</span>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    className="w-full bg-white text-gray-900 py-3 rounded-xl font-bold transition flex items-center justify-center hover:bg-gray-100 mb-6"
                >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5 mr-3" alt="Google" />
                    Sign up with Google
                </button>

                <p className="text-center text-dark-muted text-sm">
                    Already have an account? <Link to="/login" className="text-dark-accent hover:underline font-semibold">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
