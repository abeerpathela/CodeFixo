import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import {
    ArrowLeft,
    ChevronRight,
    Play,
    CheckCircle,
    Loader2,
    Sparkles,
    Info,
    AlertCircle,
    Clock,
    Zap
} from 'lucide-react';
import practiceService from '../services/practiceService';

const QuestionPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [question, setQuestion] = useState(null);
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('cpp'); // Default C++
    const [analysis, setAnalysis] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [marking, setMarking] = useState(false);
    const [error, setError] = useState('');
    const [isSolved, setIsSolved] = useState(false);

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const data = await practiceService.getQuestionById(id);
                setQuestion(data);

                // Reset code based on language template
                const snippet = data.snippets?.find(s => s.langSlug === language);

                if (snippet) {
                    setCode(snippet.code);
                } else {
                    if (language === 'cpp') {
                        setCode('class Solution {\npublic:\n    void solve(vector<int>& nums) {\n        // Your code here\n    }\n};');
                    } else if (language === 'java') {
                        setCode('class Solution {\n    public void solve(int[] nums) {\n        // Your code here\n    }\n}');
                    } else {
                        setCode('void solve(int* nums, int numsSize) {\n    // Your code here\n}');
                    }
                }

                // Check if already solved
                const progress = await practiceService.getUserProgress();
                const solved = progress.find(p => p.questionId === id && p.solved);
                if (solved) setIsSolved(true);

            } catch (err) {
                setError('Failed to load question.');
            } finally {
                setLoading(false);
            }
        };
        fetchQuestion();
    }, [id, language]);

    const handleSubmit = async () => {
        setSubmitting(true);
        setAnalysis('');
        try {
            const data = await practiceService.submitCode(id, code, language);
            setAnalysis(data.analysis);
        } catch (err) {
            setError('Analysis failed. Try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleMarkSolved = async () => {
        setMarking(true);
        try {
            await practiceService.markSolved(id);
            setIsSolved(true);
        } catch (err) {
            setError('Failed to mark as solved.');
        } finally {
            setMarking(false);
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center h-[70vh]">
            <Loader2 className="w-10 h-10 animate-spin text-dark-accent mb-4" />
            <p className="text-dark-muted">Loading challenge details...</p>
        </div>
    );

    return (
        <div className="flex flex-col h-full -mt-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <Link to="/practice" className="flex items-center text-dark-muted hover:text-dark-text transition gap-2 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition" />
                    <span className="text-sm font-bold uppercase tracking-wider">Back to Practice</span>
                </Link>
                <div className="flex items-center gap-3">
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="bg-dark-card border border-dark-border rounded-xl px-4 py-2 text-xs font-bold outline-none focus:border-dark-accent"
                    >
                        <option value="cpp">C++ (Default)</option>
                        <option value="java">Java</option>
                        <option value="c">C</option>
                        <option value="python">Python (Not Supported)</option>
                    </select>
                    {language === 'python' && (
                        <span className="text-rose-400 text-[10px] font-bold uppercase tracking-tighter">Not Supported</span>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 min-h-0">
                {/* Left: Description & Analysis */}
                <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar max-h-[calc(100vh-180px)]">
                    <div className="bg-dark-card border border-dark-border p-8 rounded-3xl shadow-xl">
                        <div className="flex items-start justify-between mb-4">
                            <h1 className="text-2xl font-bold">{question.title}</h1>
                            <span className={`text-[10px] uppercase tracking-widest font-extrabold px-3 py-1 rounded-full border ${question.difficulty === 'Easy' ? 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10' :
                                question.difficulty === 'Medium' ? 'text-amber-400 border-amber-400/30 bg-amber-400/10' :
                                    'text-rose-400 border-rose-400/30 bg-rose-400/10'
                                }`}>
                                {question.difficulty}
                            </span>
                        </div>
                        <div className="prose prose-invert max-w-none text-sm text-dark-muted leading-relaxed">
                            {question.description}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                            <div className="space-y-2">
                                <span className="text-[10px] font-extrabold uppercase text-dark-muted tracking-widest flex items-center gap-2">
                                    <Info className="w-3 h-3" /> Sample Input
                                </span>
                                <div className="bg-dark-bg p-4 rounded-xl border border-dark-border font-mono text-xs">
                                    {question.sampleInput || 'No sample input'}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <span className="text-[10px] font-extrabold uppercase text-dark-muted tracking-widest flex items-center gap-2">
                                    <CheckCircle className="w-3 h-3 text-emerald-400" /> Sample Output
                                </span>
                                <div className="bg-dark-bg p-4 rounded-xl border border-dark-border font-mono text-xs">
                                    {question.sampleOutput || 'No sample output'}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AI Analysis Modal-like Inline Section */}
                    {(analysis || submitting) && (
                        <div className="bg-dark-card border border-dark-accent/30 p-8 rounded-3xl shadow-2xl animate-in slide-in-from-bottom-5 duration-500">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold flex items-center gap-2">
                                    <Sparkles className="text-dark-accent w-5 h-5" />
                                    AI Logic Review
                                </h3>
                                {submitting && <Loader2 className="w-5 h-5 animate-spin text-dark-accent" />}
                            </div>

                            {submitting ? (
                                <div className="space-y-3">
                                    <div className="h-4 bg-dark-bg/50 rounded-full w-full animate-pulse"></div>
                                    <div className="h-4 bg-dark-bg/50 rounded-full w-3/4 animate-pulse"></div>
                                    <div className="h-4 bg-dark-bg/50 rounded-full w-5/6 animate-pulse"></div>
                                </div>
                            ) : (
                                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    {(() => {
                                        try {
                                            // Try to parse as JSON
                                            const result = JSON.parse(analysis);
                                            const isCorrect = result.isCorrect;

                                            return (
                                                <>
                                                    <div className={`p-4 rounded-xl border ${isCorrect ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                                                        <h4 className={`text-lg font-bold flex items-center gap-2 ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                                                            {isCorrect ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                                                            {result.title || (isCorrect ? "Code Matches Requirements" : "Logic Issues Found")}
                                                        </h4>
                                                        <p className="text-dark-muted mt-2 text-sm">{result.summary}</p>
                                                    </div>

                                                    {result.details && result.details.length > 0 && (
                                                        <div className="bg-dark-bg/50 rounded-xl p-4 border border-dark-border">
                                                            <h5 className="font-bold text-dark-text mb-3 text-sm uppercase tracking-wide">Detailed Analysis</h5>
                                                            <ul className="space-y-3">
                                                                {result.details.map((point, idx) => (
                                                                    <li key={idx} className="flex gap-3 text-sm text-dark-muted">
                                                                        <span className="text-dark-accent font-bold">•</span>
                                                                        <span>{point}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </>
                                            );
                                        } catch (e) {
                                            // Fallback to plain text if JSON parse fails
                                            return (
                                                <div className="text-sm text-dark-text leading-relaxed whitespace-pre-wrap font-sans prose prose-invert">
                                                    {analysis}
                                                </div>
                                            );
                                        }
                                    })()}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Right: Code Editor */}
                <div className="flex flex-col gap-6 max-h-[calc(100vh-180px)]">
                    <div className="flex-1 bg-dark-card rounded-3xl border border-dark-border overflow-hidden flex flex-col shadow-2xl">
                        <div className="bg-dark-bg/50 px-6 py-4 border-b border-dark-border flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4 text-dark-accent fill-current" />
                                <span className="text-xs font-bold uppercase tracking-widest text-dark-muted">Editor</span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-dark-muted">
                                <Clock className="w-3 h-3" /> Auto-save enabled
                            </div>
                        </div>
                        <div className="flex-1">
                            <Editor
                                height="100%"
                                language={language === 'cpp' ? 'cpp' : language}
                                theme="vs-dark"
                                value={code}
                                onChange={(value) => setCode(value)}
                                options={{
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    lineNumbers: 'on',
                                    padding: { top: 15 },
                                    automaticLayout: true,
                                }}
                            />
                        </div>

                        <div className="p-6 bg-dark-bg/30 border-t border-dark-border flex items-center justify-between">
                            <button
                                onClick={handleMarkSolved}
                                disabled={marking || isSolved}
                                className={`flex items-center gap-2 font-bold px-5 py-2.5 rounded-xl transition ${isSolved
                                    ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 cursor-default'
                                    : 'bg-dark-bg border border-dark-border hover:border-dark-accent/50 text-dark-muted hover:text-dark-text'
                                    }`}
                            >
                                {marking ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                                {isSolved ? 'Completed' : 'Mark as Solved'}
                            </button>

                            <button
                                onClick={handleSubmit}
                                disabled={submitting || language === 'python'}
                                className="bg-dark-accent hover:bg-dark-accentHover text-white px-8 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-xl shadow-indigo-500/20 transition disabled:opacity-30"
                            >
                                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
                                Submit Review
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-2xl flex items-center gap-3 text-rose-400">
                            <AlertCircle className="w-5 h-5" />
                            <p className="text-xs font-bold">{error}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuestionPage;
