import api from './api';

// Register user
const signup = async (userData) => {
  const response = await api.post('/auth/signup', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await api.post('/auth/login', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Logout
const logout = () => {
  localStorage.removeItem('user');
};

// Get current user profile
const getMe = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

// Login with Google (Frontend initiates, Backend confirms)
// Actually, for Google OAuth flow with Passport:
// Option 1: Link to backend /auth/google -> Redirects to Google -> Redirects to /auth/google/callback -> Redirects to Frontend with Token.
// Option 2: Use Google Identity Services (Frontend) -> Get Token -> Send to Backend.
// Our backend is setup for Option 1 (Passport Strategy acts as the initiator).
// However, the user requirement mentions "Sign in with Google (OAuth) is MANDATORY".
// Since we used Passport Google Strategy in backend, the frontend usually just redirects to `http://localhost:5000/api/auth/google`.
// But dealing with the callback in SPA can be tricky (capturing the token from URL param).
// I implemented `res.redirect(\`\${process.env.FRONTEND_URL}/login?token=\${token}\`);` in backend.
// So frontend login page needs to check URL params for token.

const authService = {
  signup,
  login,
  logout,
  getMe
};

export default authService;
