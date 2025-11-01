import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { act } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// Mock axios and jwt-decode
vi.mock('axios');
vi.mock('jwt-decode', () => ({
  jwtDecode: vi.fn(),
}));

// A dummy component to consume and display context values
const TestComponent = () => {
  const { isAuthenticated, user, login } = useAuth();
  
  const handleLogin = async () => {
    // This is the new part: call login with email and password
    await login('test@example.com', 'password123');
  };

  return (
    <div>
      <div data-testid="authenticated">{isAuthenticated ? 'true' : 'false'}</div>
      <div data-testid="user-role">{user?.role}</div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

describe('AuthContext', () => {
  // Your old test for default values is gone, we'll just keep the new one
  it('should call axios, decode token, and update state on login', async () => {
    const user = userEvent.setup();
    
    // 1. Define our mock return values
    const fakeToken = 'fake.token.string';
    const fakeUser = { id: '123', role: 'User' };

    // 2. Mock the implementations
    axios.post.mockResolvedValue({ data: { token: fakeToken } });
    jwtDecode.mockReturnValue({ user: fakeUser });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // 3. Click the login button
    await act(async () => {
      await user.click(screen.getByRole('button', { name: /login/i }));
    });

    // 4. Check that axios was called correctly
    expect(axios.post).toHaveBeenCalledWith('/api/auth/login', {
      email: 'test@example.com',
      password: 'password123',
    });
    
    // 5. Check that the context state was updated
    expect(screen.getByTestId('authenticated').textContent).toBe('true');
    expect(screen.getByTestId('user-role').textContent).toBe('User');
  });
});