import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import TimelineSection from './components/TimelineSection';
import ProblemsSection from './components/ProblemsSection';
import AuthForms from './components/AuthForms';
import Dashboard from './components/Dashboard';

function AppContent() {
  const [currentView, setCurrentView] = useState('home');
  const { loading } = useAuth();

  useEffect(() => {
    if (currentView === 'home') {
      document.title = 'BIS × NIT Hamirpur Hackathon 2024';
    } else {
      document.title = `${currentView.charAt(0).toUpperCase() + currentView.slice(1)} | BIS × NIT Hamirpur`;
    }
  }, [currentView]);

  const handleNavigate = (section: string) => {
    setCurrentView(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#34a1eb]/10 to-[#9c371e]/10">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#34a1eb] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation onNavigate={handleNavigate} currentView={currentView} />

      {currentView === 'home' && (
        <>
          <HeroSection onNavigate={handleNavigate} />
          <AboutSection />
          <TimelineSection />
          <ProblemsSection />
        </>
      )}

      {currentView === 'about' && (
        <div className="pt-20">
          <AboutSection />
        </div>
      )}

      {currentView === 'timeline' && (
        <div className="pt-20">
          <TimelineSection />
        </div>
      )}

      {currentView === 'problems' && (
        <div className="pt-20">
          <ProblemsSection />
        </div>
      )}

      {currentView === 'auth' && <AuthForms onNavigate={handleNavigate} />}

      {currentView === 'dashboard' && <Dashboard />}

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#34a1eb] to-[#9c371e] rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    BIS
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">BIS × NIT Hamirpur</h3>
                    <p className="text-gray-400 text-sm">Hackathon 2024</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">
                  Innovation meets standards excellence in this collaborative hackathon initiative.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <button onClick={() => handleNavigate('home')} className="hover:text-white transition-colors">
                      Home
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleNavigate('about')} className="hover:text-white transition-colors">
                      About
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleNavigate('timeline')} className="hover:text-white transition-colors">
                      Timeline
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleNavigate('problems')} className="hover:text-white transition-colors">
                      Problem Statements
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Contact</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>Bureau of Indian Standards</li>
                  <li>Manak Bhavan, New Delhi</li>
                  <li className="pt-4">NIT Hamirpur</li>
                  <li>Hamirpur, Himachal Pradesh</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
              <p>&copy; 2024 Bureau of Indian Standards × NIT Hamirpur. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
