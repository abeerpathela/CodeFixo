import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle, ChevronRight, Loader2, Filter } from 'lucide-react';
import practiceService from '../services/practiceService';

const PracticePage = () => {
    const [modules, setModules] = useState(['Arrays', 'Strings']);
    const [selectedModule, setSelectedModule] = useState('Arrays');
    const [selectedDifficulty, setSelectedDifficulty] = useState('All');
    const [questions, setQuestions] = useState([]);
    const [solvedIds, setSolvedIds] = useState(new Set());
    const [loading, setLoading] = useState(true);

    const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

    useEffect(() => {
        fetchData();
    }, [selectedModule, selectedDifficulty]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const difficultyParam = selectedDifficulty === 'All' ? '' : selectedDifficulty;
            const [questionsData, progressData] = await Promise.all([
                practiceService.getQuestions(selectedModule, difficultyParam),
                practiceService.getUserProgress()
            ]);

            setQuestions(questionsData);
            setSolvedIds(new Set(progressData.filter(p => p.solved).map(p => p.questionId)));
        } catch (err) {
            console.error('Failed to fetch practice data', err);
        } finally {
            setLoading(false);
        }
    };

    const getDifficultyColor = (diff) => {
        switch (diff) {
            case 'Easy': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
            case 'Medium': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
            case 'Hard': return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
            default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <BookOpen className="text-dark-accent w-8 h-8" />
                        Practice Modules
                    </h1>
                    <p className="text-dark-muted mt-1">Master data structures through AI-guided practice.</p>
                </div>

                <div className="flex items-center gap-4 bg-dark-card p-1.5 rounded-2xl border border-dark-border">
                    {modules.map(mod => (
                        <button
                            key={mod}
                            onClick={() => setSelectedModule(mod)}
                            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${selectedModule === mod
                                    ? 'bg-dark-accent text-white shadow-lg'
                                    : 'text-dark-muted hover:text-dark-text'
                                }`}
                        >
                            {mod}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
                <Filter className="w-4 h-4 text-dark-muted shrink-0" />
                {difficulties.map(diff => (
                    <button
                        key={diff}
                        onClick={() => setSelectedDifficulty(diff)}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-colors whitespace-nowrap ${selectedDifficulty === diff
                                ? 'bg-dark-border border-dark-accent text-dark-accent'
                                : 'bg-dark-card border-dark-border text-dark-muted hover:border-dark-muted'
                            }`}
                    >
                        {diff}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="w-10 h-10 animate-spin text-dark-accent mb-4" />
                    <p className="text-dark-muted font-medium">Fetching challenges...</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {questions.length > 0 ? (
                        questions.map((q) => (
                            <Link
                                key={q._id}
                                to={`/practice/question/${q._id}`}
                                className="group bg-dark-card border border-dark-border p-5 rounded-3xl flex items-center gap-4 hover:border-dark-accent/50 hover:bg-dark-accent/5 transition duration-300"
                            >
                                <div className={`p-3 rounded-2xl border ${solvedIds.has(q._id) ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-dark-bg border-dark-border opacity-50'}`}>
                                    <CheckCircle className={`w-6 h-6 ${solvedIds.has(q._id) ? 'text-emerald-500' : 'text-dark-muted'}`} />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-bold truncate group-hover:text-white transition">{q.title}</h3>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded border ${getDifficultyColor(q.difficulty)}`}>
                                            {q.difficulty}
                                        </span>
                                        <span className="text-xs text-dark-muted flex items-center gap-1">
                                            <BookOpen className="w-3 h-3" /> {q.module}
                                        </span>
                                    </div>
                                </div>

                                <ChevronRight className="w-5 h-5 text-dark-muted group-hover:text-dark-accent transition translate-x-0 group-hover:translate-x-1" />
                            </Link>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-dark-card rounded-3xl border border-dark-dashed border-dark-border">
                            <p className="text-dark-muted">No questions found for this criteria.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PracticePage;
