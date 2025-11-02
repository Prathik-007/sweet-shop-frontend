import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { act } from 'react'; 

// Mock axios
vi.mock('axios');

// Mock the AuthContext
vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

// Our fake sweets data
const mockSweets = [
  { _id: '1', name: 'Kaju Katli', price: 100, quantity: 50 },
  { _id: '2', name: 'Jalebi', price: 50, quantity: 200 },
];

const renderWithRouter = (ui) => {
  return render(ui, { wrapper: MemoryRouter });
};

describe('DashboardPage Component', () => {
  // Use a variable to hold the spy, to be defined in beforeEach
  let axiosGetSpy;
  
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock a logged-in user
    useAuth.mockReturnValue({
      isAuthenticated: true,
      user: { role: 'User' },
      logout: vi.fn(),
    });
    
    // Create the spy on axios.get and mock the successful resolution
    axiosGetSpy = vi.spyOn(axios, 'get').mockResolvedValue({ data: mockSweets });
  });
  
  // Cleanup after the test
  afterEach(() => {
    axiosGetSpy.mockRestore(); 
  });

  it('should fetch and display sweets on render', async () => {
    let container;

    // 1. Initial render (useEffect runs here, starting the axios call)
    await act(async () => {
        container = renderWithRouter(<DashboardPage />).container;
    });
    
    // 2. ASSERTION: Check if the API was called immediately after mount
    // The spy should have been called now, even if the promise hasn't resolved
    expect(axiosGetSpy).toHaveBeenCalledWith('/api/sweets');
    
    // 3. ASSERTION: Wait for the promise to resolve and component to re-render
    // We wait for the 'Jalebi' element to appear, confirming success
    await waitFor(() => {
      // Use regex to find the text flexibly
      expect(screen.getByText(/Jalebi/i)).toBeInTheDocument();
    });

    // 4. Final check
    expect(screen.getByText(/Kaju Katli/i)).toBeInTheDocument();
  });
});