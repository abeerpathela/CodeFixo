import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Loader2, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import codeService from '../services/codeService';

const CodeAnalysisPage = () => {
    const [code, setCode] = useState('// Paste your code here for AI analysis...\n\nfunction helloWorld() {\n  console.log("Hello, CodeFixo!");\n}');
    const [language, setLanguage] = useState('javascript');
    const [analysis, setAnalysis] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const languages = [
        { id: 'javascript', name: 'JavaScript' },
        { id: 'python', name: 'Python' },
        { id: 'cpp', name: 'C++' },
        { id: 'java', name: 'Java' },
        { id: 'typescript', name: 'TypeScript' },
        { id: 'go', name: 'Go' },
        { id: 'rust', name: 'Rust' },
    ];

    const handleAnalyze = async () => {
        if (!code.trim()) {
            setError('Please provide some code to analyze.');
            return;
        }

        setLoading(true);
        setError('');
        setAnalysis('');

        try {
            const data = await codeService.analyzeCode(code, language);
            setAnalysis(data.analysis);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to analyze code. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <Sparkles className="text-dark-accent w-8 h-8" />
                        AI Code Analysis
                    </h1>
                    <p className="text-dark-muted mt-1">Get instant feedback on bugs, complexity, and performance.</p>
                </div>

                <div className="flex items-center gap-3">
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="bg-dark-card border border-dark-border rounded-xl px-4 py-2 text-sm font-semibold outline-none focus:border-dark-accent transition"
                    >
                        {languages.map((lang) => (
                            <option key={lang.id} value={lang.id}>{lang.name}</option>
                        ))}
                    </select>

                    <button
                        onClick={handleAnalyze}
                        disabled={loading}
                        className="bg-dark-accent hover:bg-dark-accentHover text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
                        Analyze Code
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[600px]">
                {/* Editor Container */}
                <div className="bg-dark-card rounded-2xl border border-dark-border overflow-hidden flex flex-col shadow-xl">
                    <div className="bg-dark-bg/50 px-6 py-3 border-b border-dark-border flex items-center justify-between">
                        <span className="text-sm font-bold text-dark-muted flex items-center gap-2">
                            <Code2 className="w-4 h-4" /> Source Code
                        </span>
                    </div>
                    <div className="flex-1 min-h-[500px]">
                        <Editor
                            height="100%"
                            defaultLanguage={language}
                            language={language}
                            theme="vs-dark"
                            value={code}
                            onChange={(value) => setCode(value)}
                            options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                                fontFamily: 'Fira Code',
                                padding: { top: 20 },
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                            }}
                        />
                    </div>
                </div>

                {/* Results Container */}
                <div className="bg-dark-card rounded-2xl border border-dark-border p-6 overflow-y-auto flex flex-col shadow-xl">
                    <h3 className="text-sm font-bold text-dark-muted mb-6 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-dark-accent" /> AI Insights
                    </h3>

                    {!loading && !analysis && !error && (
                        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                            <div className="bg-dark-bg p-6 rounded-full">
                                <Sparkles className="w-12 h-12" />
                            </div>
                            <p className="max-w-xs text-sm">Paste your code and click "Analyze Code" to receive AI-powered feedback.</p>
                        </div>
                    )}

                    {loading && (
                        <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                            <Loader2 className="w-10 h-10 animate-spin text-dark-accent" />
                            <p className="text-dark-muted animate-pulse">Running AI analysis engine...</p>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl flex items-start gap-3">
                            <AlertCircle className="text-red-500 w-5 h-5 mt-0.5 shrink-0" />
                            <div>
                                <p className="text-red-500 text-sm font-bold">Analysis Failed</p>
                                <p className="text-red-400 text-xs mt-1">{error}</p>
                            </div>
                        </div>
                    )}

                    {analysis && (
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
                                                    {isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                                                    {result.title || (isCorrect ? "Code is 100% Correct" : "Improvements Needed")}
                                                </h4>
                                                <p className="text-dark-muted mt-2 text-sm">{result.summary}</p>
                                            </div>

                                            {result.details && result.details.length > 0 && (
                                                <div className="bg-dark-bg/50 rounded-xl p-4 border border-dark-border">
                                                    <h5 className="font-bold text-dark-text mb-3 text-sm uppercase tracking-wide">Detailed Insights</h5>
                                                    <ul className="space-y-3">
                                                        {result.details.map((point, idx) => (
                                                            <li key={idx} className="flex gap-3 text-sm text-dark-muted">
                                                                <span className="text-dark-accent font-bold">•</span>
                                                                <span>
                                                                    {/* Bold the start of the sentence if possible, or just render */}
                                                                    <strong className="text-dark-text block mb-1">Point {idx + 1}</strong>
                                                                    {point}
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </>
                                    );
                                } catch (e) {
                                    // Fallback to Markdown text if JSON parse fails
                                    return (
                                        <div className="prose prose-invert max-w-none text-sm leading-relaxed whitespace-pre-wrap">
                                            {analysis}
                                        </div>
                                    );
                                }
                            })()}
                        </div>
                    )}

                    {analysis && (
                        <div className="mt-8 pt-6 border-t border-dark-border flex items-center gap-2 text-dark-accent">
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-wider">Analysis Complete</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CodeAnalysisPage;

// Helper icons needed in file or globally
const Code2 = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 16 4-4-4-4" /><path d="m6 8-4 4 4 4" /><path d="m14.5 4-5 16" /></svg>;
