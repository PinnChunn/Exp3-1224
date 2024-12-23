import { Link, useNavigate } from 'react-router-dom';
import UserProfile from './UserProfile';
import { Home } from 'lucide-react';

interface HeaderProps {
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

export default function Header({ isAuthenticated, onLogin, onLogout }: HeaderProps) {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-40 border-b border-gray-200">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={handleLogoClick}
            className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            <Home className="w-6 h-6 text-purple-600" />
            EXP3
          </button>
          
          <UserProfile 
            isAuthenticated={isAuthenticated}
            onLogin={onLogin}
            onLogout={onLogout}
          />
        </div>
      </div>
    </nav>
  );
}