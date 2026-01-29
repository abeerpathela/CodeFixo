import { Link } from 'react-router-dom';
import { Shield, Zap, TrendingUp, Code, ArrowRight } from 'lucide-react';
import Logo from '../components/Logo';

const LandingPage = () => {
    return (
        <div className="bg-dark-bg min-h-screen text-dark-text">
            {/* Navbar */}
            <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
                <Logo size="md" />
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
            <header className="max-w-7xl mx-auto px-6 pt-32 pb-40">
                <div className="flex flex-col lg:flex-row items-center gap-20">
                    <div className="flex-1 space-y-10">
                        <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full">
                            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">New: AI Reasoning v2.0</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
                            BUILD <br />
                            <span className="text-gradient">BETTER</span> <br />
                            CODE.
                        </h1>
                        <p className="text-lg text-dark-muted max-w-lg leading-relaxed font-medium">
                            Elevate your development workflow with intelligent code analysis and structured learning modules. Designed for the modern engineer.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                            <Link
                                to="/signup"
                                className="w-full sm:w-auto accent-gradient hover:opacity-90 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition shadow-2xl shadow-indigo-500/40"
                            >
                                Get Started Free
                            </Link>
                            <a
                                href="#features"
                                className="w-full sm:w-auto text-sm font-black uppercase tracking-widest py-5 px-10 border border-dark-border rounded-2xl hover:bg-white/5 transition"
                            >
                                Explore Features
                            </a>
                        </div>
                    </div>

                    <div className="flex-1 relative">
                        <div className="absolute -inset-20 bg-indigo-500/20 blur-[120px] rounded-full opacity-50" />
                        <div className="relative glass-card rounded-[40px] p-2 overflow-hidden shadow-3xl">
                            <div className="bg-dark-bg/80 rounded-[38px] p-8 border border-white/5">
                                <pre className="font-mono text-sm leading-relaxed overflow-hidden">
                                    <code className="text-pink-400">function</code> <code className="text-indigo-400">solveProblem</code>(input) {'{\n'}
                                    {'  '}// AI Analysis in progress...{'\n'}
                                    {'  '}<code className="text-teal-400">return</code> input.map(x ={'>'} x * 2);{'\n'}
                                    {'}'}
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section id="features" className="max-w-7xl mx-auto px-6 py-40">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    <div className="md:col-span-8 glass-card p-12 rounded-[40px] group overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Shield className="w-40 h-40 text-indigo-400" />
                        </div>
                        <div className="relative z-10 max-w-lg">
                            <h3 className="text-4xl font-black tracking-tight mb-6 uppercase">Intelligent <br /><span className="text-indigo-400">Analysis</span></h3>
                            <p className="text-dark-muted font-medium leading-relaxed">
                                Our proprietary engine doesn't just check syntax. It reasons about logic, security flaws, and performance bottlenecks in real-time.
                            </p>
                        </div>
                    </div>

                    <div className="md:col-span-4 accent-gradient p-1 rounded-[40px]">
                        <div className="bg-dark-bg/40 backdrop-blur-xl h-full w-full rounded-[38px] p-10 flex flex-col justify-end">
                            <Zap className="w-12 h-12 text-white mb-6 animate-pulse" />
                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Instant <br />Feedback</h3>
                        </div>
                    </div>

                    <div className="md:col-span-4 glass-card p-10 rounded-[40px] hover:border-emerald-500/30 transition-colors">
                        <TrendingUp className="w-10 h-10 text-emerald-400 mb-6" />
                        <h3 className="text-xl font-bold mb-4 uppercase tracking-widest text-emerald-400">Growth Tracking</h3>
                        <p className="text-dark-muted text-sm font-medium leading-relaxed">
                            Detailed visual progress reports to keep your skills sharp and visible.
                        </p>
                    </div>

                    <div className="md:col-span-8 glass-card p-10 rounded-[40px] flex items-center justify-between border-indigo-500/20">
                        <div className="max-w-md">
                            <h3 className="text-3xl font-black tracking-tight mb-4 uppercase">Master DSA</h3>
                            <p className="text-dark-muted font-medium">60+ modules designed by engineers from top tech companies.</p>
                        </div>
                        <div className="hidden lg:flex gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center font-black text-indigo-400">A</div>
                            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center font-black text-pink-400">S</div>
                            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center font-black text-teal-400">T</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Footer */}
            <section className="max-w-7xl mx-auto px-6 mb-40">
                <div className="accent-gradient rounded-[50px] p-1">
                    <div className="bg-dark-bg/90 backdrop-blur-3xl rounded-[48px] py-24 px-10 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_50%_-20%,#6366f1,transparent)]" />
                        <div className="relative z-10">
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 uppercase">Ready to evolve?</h2>
                            <p className="text-dark-muted mb-12 max-w-xl mx-auto text-lg font-medium">
                                Join the next generation of developers using CodeFixo to build resilient software.
                            </p>
                            <Link
                                to="/signup"
                                className="inline-flex items-center gap-4 bg-white text-dark-bg px-12 py-5 rounded-2xl font-black uppercase tracking-widest transition hover:scale-105 active:scale-95"
                            >
                                Start Your Journey <Logo size="sm" showText={false} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="py-10 text-center text-dark-muted border-t border-dark-border/30">
                <p>© 2026 CodeFixo. Built with ❤️ for developers.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
