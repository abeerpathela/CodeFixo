import { Link } from 'react-router-dom';
import { Shield, Zap, TrendingUp, Code, ArrowRight } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="bg-dark-bg min-h-screen text-dark-text">
            {/* Navbar */}
            <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
                <div className="flex items-center space-x-2">
                    <div className="bg-dark-accent p-2 rounded-lg">
                        <Code className="text-white w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight">CodeFixo</span>
                </div>
                <div className="hidden md:flex space-x-8 text-dark-muted font-medium">
                    <a href="#features" className="hover:text-dark-text transition">Features</a>
                    <a href="#how-it-works" className="hover:text-dark-text transition">How it Works</a>
                </div>
                <Link
                    to="/signup"
                    className="bg-dark-accent hover:bg-dark-accentHover text-white px-6 py-2 rounded-full font-semibold transition shadow-lg shadow-indigo-500/20"
                >
                    Get Started
                </Link>
            </nav>

            {/* Hero Section */}
            <header className="max-w-7xl mx-auto px-6 pt-20 pb-32 text-center">
                <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    AI-Powered Code Review <br /> & Learning Platform
                </h1>
                <p className="text-xl text-dark-muted mb-10 max-w-2xl mx-auto">
                    Analyze any code for bugs, learn DSA with structured modules, and track your progress in a professional, developer-first environment.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/signup"
                        className="w-full sm:w-auto bg-dark-accent hover:bg-dark-accentHover text-white px-10 py-4 rounded-xl font-bold text-lg transition flex items-center justify-center"
                    >
                        Start Analyzing <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                    <a
                        href="#features"
                        className="w-full sm:w-auto border border-dark-border hover:bg-dark-card px-10 py-4 rounded-xl font-bold text-lg transition"
                    >
                        Learn More
                    </a>
                </div>
            </header>

            {/* Features Section */}
            <section id="features" className="max-w-7xl mx-auto px-6 py-24 border-t border-dark-border/50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="bg-dark-card p-8 rounded-3xl border border-dark-border hover:border-dark-accent/50 transition duration-300">
                        <div className="bg-indigo-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                            <Shield className="text-dark-accent w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Code Analysis</h3>
                        <p className="text-dark-muted leading-relaxed">
                            Detect logical errors, syntax issues, and edge cases in seconds using our advanced AI reasoning engine. Supports all major languages.
                        </p>
                    </div>
                    <div className="bg-dark-card p-8 rounded-3xl border border-dark-border hover:border-dark-accent/50 transition duration-300">
                        <div className="bg-purple-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                            <Zap className="text-purple-400 w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">DSA Practice</h3>
                        <p className="text-dark-muted leading-relaxed">
                            60+ hand-picked questions in Arrays and Strings. Get detailed AI feedback on your logic and complexity without manual testing.
                        </p>
                    </div>
                    <div className="bg-dark-card p-8 rounded-3xl border border-dark-border hover:border-dark-accent/50 transition duration-300">
                        <div className="bg-emerald-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                            <TrendingUp className="text-emerald-400 w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Progress Tracking</h3>
                        <p className="text-dark-muted leading-relaxed">
                            Visualize your learning journey with a personal dashboard. Track solved questions by module and difficulty level.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Footer */}
            <section className="bg-dark-card py-20 mt-20 text-center border-t border-dark-border">
                <h2 className="text-4xl font-bold mb-6">Ready to improve your code?</h2>
                <p className="text-dark-muted mb-10 max-w-xl mx-auto">
                    Join thousands of developers using CodeFixo to build better software and master data structures.
                </p>
                <Link
                    to="/signup"
                    className="bg-dark-accent hover:bg-dark-accentHover text-white px-12 py-4 rounded-xl font-bold text-lg transition inline-flex items-center"
                >
                    Sign Up Now <Code className="ml-2 w-5 h-5" />
                </Link>
            </section>

            <footer className="py-10 text-center text-dark-muted border-t border-dark-border/30">
                <p>© 2026 CodeFixo. Built with ❤️ for developers.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
