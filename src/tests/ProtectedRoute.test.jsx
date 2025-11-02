import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute'; // This file doesn't exist yet!

// Mock the AuthContext
vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

// Dummy components to render
const DummyDashboard = () => <div>Dashboard Page</div>;
// We'll rename this to DummyRoot/Login
const DummyLogin = () => <div>Login Page</div>; 

// Helper function to render our test setup
const renderWithRouter = (isAuthenticated) => {
  useAuth.mockReturnValue({
    isAuthenticated: isAuthenticated,
  });

  render(
    // We render the component on the /dashboard route to test the protection
    <MemoryRouter initialEntries={['/dashboard']}> 
      <Routes>
        {/* FIX: Map the root path (/) to the login page, just like in App.jsx */}
        <Route path="/" element={<DummyLogin />} /> 
        
        {/* The protected route we are testing */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DummyDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </MemoryRouter>
  );
};

describe('ProtectedRoute Component', () => {
  // ... (Test 1: should render the child component if user is authenticated)
  it('should render the child component if user is authenticated', () => {
    renderWithRouter(true); // true = authenticated
    expect(screen.getByText('Dashboard Page')).toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });

  // ... (Test 2: should redirect to login page if user is not authenticated)
  it('should redirect to login page if user is not authenticated', () => {
    renderWithRouter(false); // false = not authenticated
    
    // NOW it finds the route for the redirect (which is '/')
    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Dashboard Page')).not.toBeInTheDocument();
  });
});
