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
        <div className="glass-card p-8 rounded-[32px] hover:border-white/10 transition duration-500 group">
            <div className="flex items-center justify-between mb-6">
                <div className={`p-4 rounded-2xl ${color} bg-opacity-10 group-hover:scale-110 transition-transform`}>
                    {icon}
                </div>
                <div className="flex items-center text-[10px] font-black text-dark-muted uppercase tracking-[0.2em]">
                    Live Metric <ArrowUpRight className="ml-1 w-3 h-3 text-indigo-400" />
                </div>
            </div>
            <h3 className="text-dark-muted text-xs font-black uppercase tracking-widest mb-1">{title}</h3>
            <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black tracking-tighter">{value}</span>
                {sub && <span className="text-dark-muted text-xs font-bold">{sub}</span>}
            </div>
        </div>
    );

    return (
        <div className="space-y-12 pb-20">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                <div className="space-y-2">
                    <h1 className="text-5xl font-black tracking-tighter uppercase italic">
                        <span className="text-gradient">Performance</span> <span className="text-white">OS</span>
                    </h1>
                    <p className="text-dark-muted text-sm font-medium tracking-wide">Command center for your developmental growth.</p>
                </div>
                <Link
                    to="/practice"
                    className="accent-gradient hover:opacity-90 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition shadow-2xl shadow-indigo-500/20"
                >
                    Launch Practice
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Questions"
                    value={stats?.totalSolved || 0}
                    sub={`/ ${stats?.totalQuestions || 0}`}
                    icon={<CheckCircle2 className="text-indigo-400 w-6 h-6" />}
                    color="bg-indigo-400"
                />
                <StatCard
                    title="Rank"
                    value={stats?.globalRank?.replace('#', '') || '1'}
                    sub={`FROM ${stats?.totalUsers || 7} USERS`}
                    icon={<Trophy className="text-amber-400 w-6 h-6" />}
                    color="bg-amber-400"
                />
                <StatCard
                    title="Streak"
                    value={stats?.currentStreak || 0}
                    sub="DAYS"
                    icon={<Zap className="text-pink-400 w-6 h-6" />}
                    color="bg-pink-400"
                />
                <StatCard
                    title="Target"
                    value={`${stats?.targetAchieved || 0}%`}
                    sub="SCORE"
                    icon={<Target className="text-teal-400 w-6 h-6" />}
                    color="bg-teal-400"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Progress Breakdown */}
                <div className="lg:col-span-2 space-y-10">
                    <div className="glass-card rounded-[40px] p-10">
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="text-xl font-black uppercase tracking-tighter italic">Module <span className="text-indigo-400">Analysis</span></h3>
                            <Link to="/goals" className="text-dark-accent text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:opacity-80 transition">
                                <Target className="w-4 h-4" /> View Map
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                            {Object.entries(stats?.solvedByModule || {}).map(([name, count]) => (
                                <div key={name} className="space-y-4">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                        <span className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> {name}
                                        </span>
                                        <span className="text-indigo-400">{count} UNITS</span>
                                    </div>
                                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full accent-gradient rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                                            style={{ width: `${Math.min(100, (count / 30) * 100)}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-card rounded-[40px] p-10">
                        <h3 className="text-xl font-black uppercase tracking-tighter italic mb-10">Recent <span className="text-pink-400">Activity</span></h3>
                        <div className="space-y-4">
                            {stats?.recentlySolved?.filter(q => q).length > 0 ? (
                                stats.recentlySolved.filter(q => q).map(q => (
                                    <Link
                                        key={q._id}
                                        to={`/practice/question/${q._id}`}
                                        className="flex items-center justify-between p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 group"
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className="bg-emerald-500/10 p-3 rounded-2xl group-hover:bg-emerald-500/20 transition-colors">
                                                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                            </div>
                                            <span className="font-black text-sm tracking-tight group-hover:text-white uppercase">{q.title}</span>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <span className={`text-[8px] tracking-[0.2em] uppercase font-black px-3 py-1 rounded-full border ${q.difficulty === 'Easy' ? 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5' :
                                                q.difficulty === 'Medium' ? 'text-amber-400 border-amber-400/20 bg-amber-400/5' :
                                                    'text-pink-400 border-pink-400/20 bg-pink-400/5'
                                                }`}>
                                                {q.difficulty}
                                            </span>
                                            <ArrowUpRight className="w-4 h-4 text-dark-muted group-hover:text-white transition-colors" />
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="text-center py-20 opacity-30">
                                    <p className="text-xs font-black uppercase tracking-[0.3em]">No activity detected</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Level Stats */}
                <div className="space-y-10">
                    <div className="glass-card rounded-[40px] p-10">
                        <h3 className="text-xl font-black uppercase tracking-tighter italic mb-10">Precision <span className="text-teal-400">Dist</span></h3>
                        <div className="space-y-8">
                            {['Easy', 'Medium', 'Hard'].map(diff => (
                                <div key={diff} className="space-y-3">
                                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                                        <span className={diff === 'Easy' ? 'text-emerald-400' :
                                            diff === 'Medium' ? 'text-amber-400' :
                                                'text-pink-400'
                                        }>{diff}</span>
                                        <span>{stats?.solvedByDifficulty?.[diff] || 0}</span>
                                    </div>
                                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${diff === 'Easy' ? 'bg-emerald-400' :
                                                diff === 'Medium' ? 'bg-amber-400' :
                                                    'bg-pink-400'
                                                }`}
                                            style={{ width: `${Math.min(100, ((stats?.solvedByDifficulty?.[diff] || 0) / 20) * 100)}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="accent-gradient p-1 rounded-[40px] shadow-2xl shadow-pink-500/20 overflow-hidden group">
                        <div className="bg-dark-bg/80 backdrop-blur-3xl rounded-[38px] p-10 relative overflow-hidden">
                            <Sparkles className="absolute -right-4 -top-4 w-24 h-24 text-white/10 rotate-12 group-hover:scale-110 transition-transform" />
                            <div className="relative z-10">
                                <h3 className="text-lg font-black uppercase tracking-tighter mb-4 flex items-center gap-3 italic">
                                    <Zap className="w-5 h-5 text-amber-400 fill-amber-400" /> PRO INSIGHT
                                </h3>
                                <p className="text-dark-muted text-xs font-medium leading-relaxed mb-8">Master the Medium tier to unlock higher tier performance metrics.</p>
                                <Link to="/practice" className="text-white text-[10px] font-black uppercase tracking-widest hover:underline">
                                    Apply Insight →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
