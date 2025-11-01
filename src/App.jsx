import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* We'll set the login page as the home page for now */}
        <Route path="/" element={<LoginPage />} />
        {/* We'll add other routes here later, like:
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        */}
      </Routes>
    </BrowserRouter>
  );
}

export default App; 