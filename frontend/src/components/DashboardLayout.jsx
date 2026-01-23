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
    ChevronRight
} from 'lucide-react';
import { useState } from 'react';

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
        fixed inset-y-0 left-0 z-40 w-72 bg-dark-card border-r border-dark-border transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <div className="flex flex-col h-full p-6">
                    {/* Logo */}
                    <div className="flex items-center space-x-3 mb-10 px-2">
                        <div className="bg-dark-accent p-2 rounded-lg">
                            <Code2 className="text-white w-6 h-6" />
                        </div>
                        <span className="text-xl font-bold">CodeFixo</span>
                    </div>

                    {/* Nav Links */}
                    <nav className="flex-1 space-y-2">
                        {menuItems.map((item) => (
                            <NavItem key={item.path} item={item} />
                        ))}
                    </nav>

                    {/* User Profile & Logout */}
                    <div className="mt-auto pt-6 border-t border-dark-border">
                        <div className="flex items-center space-x-3 px-2 mb-6">
                            <div className="w-10 h-10 rounded-full bg-dark-accent/20 flex items-center justify-center border border-dark-accent/30 overflow-hidden">
                                {user?.avatar ? (
                                    <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <UserIcon className="text-dark-accent w-6 h-6" />
                                )}
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-sm font-bold truncate">{user?.name || 'Developer'}</span>
                                <span className="text-xs text-dark-muted truncate">{user?.email || 'dev@codefixo.io'}</span>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-3 px-4 py-3 rounded-xl w-full text-red-400 hover:bg-red-400/10 transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="font-bold">Logout</span>
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
