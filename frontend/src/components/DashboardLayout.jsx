import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    BarChart3,
    Code2,
    BookOpen,
    LogOut,
    Menu,
    X,
    User as UserIcon,
    ChevronRight,
    Target
} from 'lucide-react';
import { useState } from 'react';
import Logo from './Logo';

const DashboardLayout = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const menuItems = [
        { title: 'Dashboard', icon: <BarChart3 className="w-5 h-5" />, path: '/dashboard' },
        { title: 'Goals', icon: <Target className="w-5 h-5 text-emerald-400" />, path: '/goals' },
        { title: 'Code Analysis', icon: <Code2 className="w-5 h-5" />, path: '/analyze' },
        { title: 'Practice Modules', icon: <BookOpen className="w-5 h-5" />, path: '/practice' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const NavItem = ({ item }) => {
        const isActive = location.pathname === item.path;
        return (
            <Link
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                    ? 'bg-dark-accent text-white shadow-lg shadow-indigo-500/20'
                    : 'text-dark-muted hover:bg-dark-border/50 hover:text-dark-text'
                    }`}
            >
                {item.icon}
                <span className="font-semibold">{item.title}</span>
                {isActive && <ChevronRight className="ml-auto w-4 h-4" />}
            </Link>
        );
    };

    return (
        <div className="flex min-h-screen bg-dark-bg text-dark-text">
            {/* Mobile Sidebar Toggle */}
            <button
                className="lg:hidden fixed top-4 left-4 z-50 bg-dark-card p-2 rounded-lg border border-dark-border"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? <X /> : <Menu />}
            </button>

            {/* Sidebar */}
            <aside className={`
        fixed inset-y-0 left-0 z-40 w-80 bg-dark-bg/60 backdrop-blur-3xl border-r border-white/5 transform transition-transform duration-500 ease-in-out
        lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <div className="flex flex-col h-full p-8">
                    {/* Logo */}
                    <div className="mb-14 px-2">
                        <Logo size="sm" />
                    </div>

                    {/* Nav Links */}
                    <nav className="flex-1 space-y-3">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${location.pathname === item.path
                                    ? 'bg-white/5 text-white shadow-2xl shadow-indigo-500/10 border border-white/10'
                                    : 'text-dark-muted hover:text-white'
                                    }`}
                            >
                                <div className={`${location.pathname === item.path ? 'text-indigo-400' : 'text-dark-muted group-hover:text-white'} transition-colors`}>
                                    {item.icon}
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{item.title}</span>
                                {location.pathname === item.path && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,1)]" />}
                            </Link>
                        ))}
                    </nav>

                    {/* User Profile & Logout */}
                    {/* User Profile & Logout */}
                    <div className="mt-auto pt-8 border-t border-white/5 space-y-4">
                        <div className="flex items-center space-x-4 px-4">
                            <div className="w-12 h-12 rounded-2xl accent-gradient flex items-center justify-center font-black text-white shadow-lg">
                                {user?.name?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-black uppercase tracking-tighter truncate">{user?.name || 'Developer'}</p>
                                <p className="text-[10px] text-dark-muted font-bold tracking-widest uppercase">PRO Account</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-4 px-6 py-4 rounded-2xl text-dark-muted hover:text-red-400 hover:bg-red-500/5 transition-all duration-300 group"
                        >
                            <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Secure Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 relative overflow-y-auto">
                <div className="max-w-6xl mx-auto p-8 lg:p-12">
                    {children}
                </div>
            </main>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default DashboardLayout;
