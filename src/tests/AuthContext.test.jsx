import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuth } from '../context/AuthContext'; // This file doesn't exist
import { act } from 'react'; // Import act for state updates

// A dummy component to consume and display context values
const TestComponent = () => {
  const { isAuthenticated, token, user, login } = useAuth();

  const handleLogin = () => {
    const fakeUser = { id: '123', role: 'User' };
    login('fake_token', fakeUser);
  };

  return (
    <div>
      <div data-testid="authenticated">{isAuthenticated ? 'true' : 'false'}</div>
      <div data-testid="token">{token}</div>
      <div data-testid="user-role">{user?.role}</div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

describe('AuthContext', () => {
  it('should have default values of not authenticated', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('authenticated').textContent).toBe('false');
    expect(screen.getByTestId('token').textContent).toBe('');
  });

  it('should update context state on login', async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Use 'act' to wrap state update
    await act(async () => {
      await user.click(screen.getByRole('button', { name: /login/i }));
    });

    expect(screen.getByTestId('authenticated').textContent).toBe('true');
    expect(screen.getByTestId('token').textContent).toBe('fake_token');
    expect(screen.getByTestId('user-role').textContent).toBe('User');
  });
});