import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavigationProps {
  onNavigate: (section: string) => void;
  currentView: string;
}

export default function Navigation({ onNavigate, currentView }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = user
    ? [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'timeline', label: 'Timeline' },
        { id: 'problems', label: 'Problems' },
        { id: 'dashboard', label: 'Dashboard' },
      ]
    : [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'timeline', label: 'Timeline' },
        { id: 'problems', label: 'Problems' },
      ];

  const handleSignOut = async () => {
    await signOut();
    onNavigate('home');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-lg'
          : 'bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#34a1eb] to-[#9c371e] rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
                BIS
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 leading-tight">
                  BIS × NIT Hamirpur
                </h1>
                <p className="text-xs text-gray-600">Hackathon 2024</p>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  currentView === item.id
                    ? 'bg-[#34a1eb] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </button>
            ))}

            {user ? (
              <button
                onClick={handleSignOut}
                className="ml-4 px-6 py-2 bg-[#9c371e] text-white rounded-lg font-medium hover:bg-[#8a2f19] transition-all"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => onNavigate('auth')}
                className="ml-4 px-6 py-2 bg-[#34a1eb] text-white rounded-lg font-medium hover:bg-[#2891db] transition-all"
              >
                Login / Register
              </button>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all ${
                  currentView === item.id
                    ? 'bg-[#34a1eb] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </button>
            ))}

            {user ? (
              <button
                onClick={handleSignOut}
                className="block w-full text-left mt-2 px-4 py-3 bg-[#9c371e] text-white rounded-lg font-medium hover:bg-[#8a2f19] transition-all"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => {
                  onNavigate('auth');
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left mt-2 px-4 py-3 bg-[#34a1eb] text-white rounded-lg font-medium hover:bg-[#2891db] transition-all"
              >
                Login / Register
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
