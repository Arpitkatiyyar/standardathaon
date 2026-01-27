import { useEffect, useRef } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import TimelineSection from './components/TimelineSection';
import ProblemsSection from './components/ProblemsSection';
import AuthForms from './components/AuthForms';
import Dashboard from './components/Dashboard';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';

function HomePage({ onNavigate }: { onNavigate: (section: string) => void }) {
  const location = useLocation();
  const navigate = useNavigate();

  const homeRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const problemsRef = useRef<HTMLDivElement | null>(null);

  // Disable automatic scroll restoration so reloads don't jump to mid page
  useEffect(() => {
    const hasRestoration = 'scrollRestoration' in history;
    const prev = (hasRestoration && (history as any).scrollRestoration) || 'auto';
    if (hasRestoration) {
      (history as any).scrollRestoration = 'manual';
    }
    // Ensure when landing on home (/) we start at the top
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }
    return () => {
      if (hasRestoration) {
        (history as any).scrollRestoration = prev;
      }
    };
  }, []);

  // Scroll to the section based on current path
  useEffect(() => {
    const targetByPath: Record<string, HTMLElement | null | undefined> = {
      '/': homeRef.current,
      '/about': aboutRef.current,
      '/timeline': timelineRef.current,
      '/problems': problemsRef.current,
    };
    const el = targetByPath[location.pathname];
    if (el) {
      // Smooth scroll to section and apply small offset for fixed navbar
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // After the smooth scroll completes, nudge up by navbar height for non-home sections
      setTimeout(() => {
        try {
          if (location.pathname !== '/') {
            window.scrollBy(0, -96);
          }
        } catch {}
      }, 400);
    }
  }, [location.pathname]);

  // Update URL based on scroll position (choose section whose top is closest to navbar)
  useEffect(() => {
    const NAV_OFFSET = 96;
    const sections = [
      { path: '/', el: homeRef.current as HTMLElement | null },
      { path: '/about', el: aboutRef.current as HTMLElement | null },
      { path: '/timeline', el: timelineRef.current as HTMLElement | null },
      { path: '/problems', el: problemsRef.current as HTMLElement | null },
    ];

    const computeCurrent = () => {
      // If near very top, keep Home selected
      if (window.scrollY <= 120) return '/';
      const distances = sections
        .filter((s) => s.el)
        .map((s) => ({
          path: s.path,
          top: (s.el as HTMLElement).getBoundingClientRect().top - NAV_OFFSET,
        }));
      // Choose the section whose top is closest to the navbar line
      const candidate = distances.sort((a, b) => Math.abs(a.top) - Math.abs(b.top))[0];
      return candidate?.path;
    };

    let timeoutId: number | null = null;
    const onScroll = () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      timeoutId = window.setTimeout(() => {
        const curPath = computeCurrent();
        if (!curPath) return;
        if (location.pathname !== curPath) {
          navigate(curPath, { replace: true });
        }
      }, 100);
    };

    // Sync once and on scroll
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [navigate, location.pathname]);

  return (
    <>
      <div id="home" ref={homeRef} className="min-h-screen pt-20 animate-slide-up">
        <HeroSection onNavigate={onNavigate} />
      </div>
      <div id="about" ref={aboutRef} className="min-h-screen pt-20 animate-slide-up">
        <AboutSection />
      </div>
      <div id="timeline" ref={timelineRef} className="min-h-screen pt-20 animate-slide-up">
        <TimelineSection />
      </div>
      <div id="problems" ref={problemsRef} className="min-h-screen pt-20 animate-slide-up">
        <ProblemsSection />
      </div>
    </>
  );
}

function AppRoutes() {
  const { loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const pathToView: Record<string, string> = {
    '/': 'home',
    '/about': 'about',
    '/timeline': 'timeline',
    '/problems': 'problems',
    '/auth': 'auth',
    '/dashboard': 'dashboard',
  };

  const currentView = pathToView[location.pathname] ?? 'home';

  useEffect(() => {
    if (currentView === 'home') {
      document.title = 'BIS × NIT Hamirpur Hackathon 2024';
    } else {
      document.title = `${currentView.charAt(0).toUpperCase() + currentView.slice(1)} | BIS × NIT Hamirpur`;
    }
  }, [currentView]);

  const handleNavigate = (section: string) => {
    const viewToPath: Record<string, string> = {
      home: '/',
      about: '/about',
      timeline: '/timeline',
      problems: '/problems',
      auth: '/auth',
      dashboard: '/dashboard',
    };
    navigate(viewToPath[section] ?? '/');
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

      <Routes>
        <Route path="/" element={<HomePage onNavigate={handleNavigate} />} />
        <Route path="/about" element={<HomePage onNavigate={handleNavigate} />} />
        <Route path="/timeline" element={<HomePage onNavigate={handleNavigate} />} />
        <Route path="/problems" element={<HomePage onNavigate={handleNavigate} />} />
        <Route path="/auth" element={<AuthForms onNavigate={handleNavigate} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src="/images/bislogo.png"
                    alt="BIS Logo"
                    className="w-12 h-12 rounded-lg shadow-lg object-contain bg-white"
                  />
                  <div>
                    <h3 className="font-bold text-lg">Standardathon</h3>
                    <p className="text-gray-400 text-sm">BIS × NIT Hamirpur</p>
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
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
