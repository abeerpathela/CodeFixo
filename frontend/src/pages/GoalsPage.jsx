import { useState, useEffect } from 'react';
import { Target, CheckCircle2, Trophy, Loader2, ArrowRight } from 'lucide-react';
import dashboardService from '../services/dashboardService';

const GoalsPage = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await dashboardService.getStats();
                setStats(data);
            } catch (err) {
                console.error('Failed to fetch goals', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return (
        <div className="flex flex-col items-center justify-center h-[70vh]">
            <Loader2 className="w-10 h-10 animate-spin text-dark-accent mb-4" />
            <p className="text-dark-muted">Loading your achievements...</p>
        </div>
    );

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                    <Target className="text-emerald-400 w-8 h-8" />
                    Learning Goals
                </h1>
                <p className="text-dark-muted mt-1">Track your milestones and unlock your full potential.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-dark-card border border-dark-border p-6 rounded-3xl">
                    <p className="text-dark-muted text-sm font-medium mb-1">Total Goals</p>
                    <p className="text-3xl font-bold font-mono text-white">{stats?.goals?.length || 0}</p>
                </div>
                <div className="bg-dark-card border border-dark-border p-6 rounded-3xl">
                    <p className="text-dark-muted text-sm font-medium mb-1">Achieved</p>
                    <p className="text-3xl font-bold font-mono text-emerald-400">
                        {stats?.goals?.filter(g => g.achieved).length || 0}
                    </p>
                </div>
                <div className="bg-dark-card border border-dark-border p-6 rounded-3xl">
                    <p className="text-dark-muted text-sm font-medium mb-1">Completion Rate</p>
                    <p className="text-3xl font-bold font-mono text-indigo-400">{stats?.targetAchieved || 0}%</p>
                </div>
            </div>

            <div className="grid gap-4">
                {stats?.goals?.map((goal) => (
                    <div
                        key={goal.id}
                        className={`bg-dark-card border p-6 rounded-3xl flex flex-col md:flex-row md:items-center gap-6 transition duration-300 ${goal.achieved ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-dark-border'
                            }`}
                    >
                        <div className={`p-4 rounded-2xl shrink-0 ${goal.achieved ? 'bg-emerald-500/20 text-emerald-500' : 'bg-dark-bg text-dark-muted'
                            }`}>
                            {goal.achieved ? <Trophy className="w-8 h-8" /> : <Target className="w-8 h-8" />}
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-bold">{goal.title}</h3>
                                {goal.achieved && (
                                    <span className="bg-emerald-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">
                                        Completed
                                    </span>
                                )}
                            </div>
                            <p className="text-dark-muted text-sm">Solve {goal.target} {goal.module} questions to achieve this milestone.</p>
                        </div>

                        <div className="md:w-64 space-y-2">
                            <div className="flex justify-between text-xs font-bold mb-1">
                                <span>Progress</span>
                                <span className={goal.achieved ? 'text-emerald-500' : 'text-dark-muted'}>
                                    {goal.current} / {goal.target}
                                </span>
                            </div>
                            <div className="h-2 bg-dark-bg rounded-full overflow-hidden border border-dark-border">
                                <div
                                    className={`h-full rounded-full transition-all duration-1000 ${goal.achieved ? 'bg-emerald-500' : 'bg-dark-accent'
                                        }`}
                                    style={{ width: `${Math.min(100, (goal.current / goal.target) * 100)}%` }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GoalsPage;
