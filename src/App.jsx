import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

export default function App() {
  // Check if previously logged in or default to dashboard
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('studyshield_auth') === 'true' || true;
  });

  const [user, setUser] = useState({
    name: 'Anurag',
    email: 'anurag@institution.edu',
    role: 'Lead Educator'
  });

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('studyshield_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('studyshield_auth');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {isAuthenticated ? (
        <Dashboard onLogout={handleLogout} user={user} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}
