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
const DummyLogin = () => <div>Login Page</div>;

// Helper function to render our test setup
const renderWithRouter = (isAuthenticated) => {
  // Mock the auth state
  useAuth.mockReturnValue({
    isAuthenticated: isAuthenticated,
  });

  // Render the app with routes. We'll start on the /dashboard route
  // to test our ProtectedRoute.
  render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <Routes>
        <Route path="/login" element={<DummyLogin />} />
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
  it('should render the child component if user is authenticated', () => {
    renderWithRouter(true); // true = authenticated

    // We should see the dashboard
    expect(screen.getByText('Dashboard Page')).toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });

  it('should redirect to login page if user is not authenticated', () => {
    renderWithRouter(false); // false = not authenticated

    // We should be redirected to the login page
    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Dashboard Page')).not.toBeInTheDocument();
  });
});
