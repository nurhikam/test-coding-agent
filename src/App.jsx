import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';

const DashboardPlaceholder = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold">BNI eKYC Admin Dashboard</h1>
    <p>Welcome to the secure management area.</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPlaceholder />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
