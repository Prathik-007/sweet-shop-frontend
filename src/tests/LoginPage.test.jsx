import { describe, it, expect, vi } from 'vitest'; // <-- Import vi
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import axios from 'axios'; // <-- Import axios

// Mock the entire axios library
vi.mock('axios');

const renderWithRouter = (ui) => {
  return render(ui, { wrapper: MemoryRouter });
};

describe('LoginPage Component', () => {
  it('should render the login form', () => {
    // ... (existing test)
  });

  it('should update form state on user input', async () => {
    // ... (existing test)
  });

  // --- NEW TEST ---
  it('should call the login API on form submit', async () => {
    const user = userEvent.setup();
    renderWithRouter(<LoginPage />);

    // Mock a successful API response
    axios.post.mockResolvedValue({
      data: { token: 'fake_jwt_token' },
    });

    // 1. Fill out the form
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');

    // 2. Click the login button
    await user.click(screen.getByRole('button', { name: /login/i }));

    // 3. Check if axios.post was called correctly
    expect(axios.post).toHaveBeenCalledWith(
      // We expect it to call the backend login endpoint
      '/api/auth/login',
      // We expect it to send the form data
      {
        email: 'test@example.com',
        password: 'password123',
      }
    );
  });
});