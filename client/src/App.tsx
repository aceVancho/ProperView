import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import React from 'react';

const ProtectedRoute: React.FC<{ children: React.JSX.Element }> = ({ children }) => {
  const { auth } = useAuth();
  return auth ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
