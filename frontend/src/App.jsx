import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';

// Real Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CodeAnalysisPage from './pages/CodeAnalysisPage';
import PracticePage from './pages/PracticePage';
import QuestionPage from './pages/QuestionPage';
import UserDashboard from './pages/UserDashboard';
import GoalsPage from './pages/GoalsPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-dark-bg text-dark-text">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Protected Routes (Wrapped in DashboardLayout) */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <UserDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/goals" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <GoalsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/analyze" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <CodeAnalysisPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/practice" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <PracticePage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            <Route path="/practice/question/:id" element={
              <ProtectedRoute>
                <DashboardLayout>
                  <QuestionPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            {/* Redirect any other path to landing */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
