import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    BarChart3,
    CheckCircle2,
    Zap,
    Trophy,
    Target,
    ArrowUpRight,
    Loader2,
    BookOpen,
    Sparkles
} from 'lucide-react';
import dashboardService from '../services/dashboardService';

const UserDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await dashboardService.getStats();
                setStats(data);
            } catch (err) {
                console.error('Failed to fetch dashboard stats', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return (
        <div className="flex flex-col items-center justify-center h-[70vh]">
            <Loader2 className="w-10 h-10 animate-spin text-dark-accent mb-4" />
            <p className="text-dark-muted">Aggregating your progress...</p>
        </div>
    );

    const StatCard = ({ title, value, sub, icon, color }) => (
        <div className="bg-dark-card border border-dark-border p-6 rounded-3xl shadow-xl hover:border-dark-accent/30 transition duration-300">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${color} bg-opacity-10`}>
                    {icon}
                </div>
                <div className="flex items-center text-xs font-bold text-dark-muted uppercase tracking-wider">
                    Daily Goal <ArrowUpRight className="ml-1 w-3 h-3" />
                </div>
            </div>
            <h3 className="text-dark-muted text-sm font-medium">{title}</h3>
            <div className="flex items-end gap-2 mt-1">
                <span className="text-3xl font-bold font-mono">{value}</span>
                {sub && <span className="text-dark-muted text-sm mb-1">{sub}</span>}
            </div>
        </div>
    );

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <BarChart3 className="text-dark-accent w-8 h-8" />
                        Your Dashboard
                    </h1>
                    <p className="text-dark-muted mt-1">Track your progress and keep the coding streak alive.</p>
                </div>
                <Link
                    to="/practice"
                    className="bg-dark-accent hover:bg-dark-accentHover text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition shadow-lg shadow-indigo-500/20"
                >
                    <Zap className="w-4 h-4 fill-current" />
                    Continue Practice
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Questions Solved"
                    value={stats?.totalSolved || 0}
                    sub={`/ ${stats?.totalQuestions || 5000}`}
                    icon={<CheckCircle2 className="text-indigo-400 w-6 h-6" />}
                    color="bg-indigo-400"
                />
                <StatCard
                    title="Global Rank"
                    value="Ranked"
                    sub="#12,402"
                    icon={<Trophy className="text-amber-400 w-6 h-6" />}
                    color="bg-amber-400"
                />
                <StatCard
                    title="Current Streak"
                    value="0"
                    sub="Days"
                    icon={<Zap className="text-rose-400 w-6 h-6" />}
                    color="bg-rose-400"
                />
                <StatCard
                    title="Target Achieved"
                    value="0%"
                    sub="Weekly"
                    icon={<Target className="text-emerald-400 w-6 h-6" />}
                    color="bg-emerald-400"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Progress Breakdown */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-dark-card border border-dark-border rounded-3xl p-8">
                        <h3 className="text-xl font-bold mb-8">Module Breakdown</h3>
                        <div className="space-y-6">
                            {Object.entries(stats?.solvedByModule || {}).map(([name, count]) => (
                                <div key={name} className="space-y-2">
                                    <div className="flex justify-between text-sm font-bold">
                                        <span className="flex items-center gap-2">
                                            <BookOpen className="w-4 h-4 text-dark-accent" /> {name}
                                        </span>
                                        <span>{count} Solved</span>
                                    </div>
                                    <div className="h-2.5 bg-dark-bg rounded-full overflow-hidden border border-dark-border">
                                        <div
                                            className="h-full bg-dark-accent rounded-full transition-all duration-1000"
                                            style={{ width: `${Math.min(100, (count / 30) * 100)}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-dark-card border border-dark-border rounded-3xl p-8">
                        <h3 className="text-xl font-bold mb-6">Recently Solved</h3>
                        <div className="space-y-2">
                            {stats?.recentlySolved?.length > 0 ? (
                                stats.recentlySolved.map(q => (
                                    <Link
                                        key={q._id}
                                        to={`/practice/question/${q._id}`}
                                        className="flex items-center justify-between p-4 rounded-2xl hover:bg-dark-bg transition border border-transparent hover:border-dark-border group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="bg-emerald-400/10 p-2 rounded-lg">
                                                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                            </div>
                                            <span className="font-bold group-hover:text-white">{q.title}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded border ${q.difficulty === 'Easy' ? 'text-emerald-400 border-emerald-400/20' :
                                                q.difficulty === 'Medium' ? 'text-amber-400 border-amber-400/20' :
                                                    'text-rose-400 border-rose-400/20'
                                                }`}>
                                                {q.difficulty}
                                            </span>
                                            <ArrowUpRight className="w-4 h-4 text-dark-muted group-hover:text-dark-accent" />
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="text-center py-10 opacity-50">
                                    <p className="text-sm italic">You haven't solved any questions yet. Start practicing!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Level Stats */}
                <div className="space-y-8">
                    <div className="bg-dark-card border border-dark-border rounded-3xl p-8">
                        <h3 className="text-xl font-bold mb-6">Difficulty Distribution</h3>
                        <div className="space-y-6">
                            {['Easy', 'Medium', 'Hard'].map(diff => (
                                <div key={diff} className="flex items-center justify-between">
                                    <span className={`text-sm font-bold ${diff === 'Easy' ? 'text-emerald-400' :
                                        diff === 'Medium' ? 'text-amber-400' :
                                            'text-rose-400'
                                        }`}>{diff}</span>
                                    <span className="font-mono font-bold">{stats?.solvedByDifficulty?.[diff] || 0}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold mb-2">Upgrade to Pro</h3>
                            <p className="text-white/80 text-sm mb-6">Unlock advanced AI hints, priority support, and detailed system design modules.</p>
                            <button className="bg-white text-indigo-600 px-6 py-2 rounded-xl font-bold text-sm hover:bg-gray-100 transition">Coming Soon</button>
                        </div>
                        <Sparkles className="absolute -bottom-4 -right-4 w-24 h-24 text-white/10 rotate-12" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
