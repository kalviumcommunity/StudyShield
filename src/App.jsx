import React, { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

export default function App() {
  // Check if previously logged in; default to false so user sees login page
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('studyshield_auth') === 'true';
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('studyshield_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        // fallback
      }
    }
    return {
      name: 'Anurag',
      email: 'anurag@institution.edu',
      role: 'Lead Educator'
    };
  });

  const handleLoginSuccess = (userData) => {
    const activeUser = userData || {
      name: 'Anurag',
      email: 'anurag@institution.edu',
      role: 'Lead Educator'
    };
    setUser(activeUser);
    setIsAuthenticated(true);
    localStorage.setItem('studyshield_auth', 'true');
    localStorage.setItem('studyshield_user', JSON.stringify(activeUser));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('studyshield_auth');
    localStorage.removeItem('studyshield_user');
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
