// import { useEffect, useRef } from 'react'
// import { AuthProvider, useAuth } from './contexts/AuthContext'
// import Navigation from './components/Navigation'
// import HeroSection from './components/HeroSection'
// import AboutSection from './components/AboutSection'
// import TimelineSection from './components/TimelineSection'
// import Eligibility from './components/Eligibility'
// import Members from './components/Members'
// import ProblemsSection from './components/ProblemsSection'
// import FAQ from './components/Faq'
// import AuthForms from './components/AuthForms'
// import Dashboard from './components/Dashboard'
// import Footer from './components/Footer'
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate,
//   useLocation,
//   useNavigate,
// } from 'react-router-dom'

// function HomePage({ onNavigate }: { onNavigate: (section: string) => void }) {
//   const location = useLocation()

//   const homeRef = useRef<HTMLDivElement | null>(null)
//   const aboutRef = useRef<HTMLDivElement | null>(null)
//   const timelineRef = useRef<HTMLDivElement | null>(null)
//   const eligibilityRef = useRef<HTMLDivElement | null>(null)
//   const membersRef = useRef<HTMLDivElement | null>(null)
//   const problemsRef = useRef<HTMLDivElement | null>(null)
//   const faqRef = useRef<HTMLDivElement | null>(null)

//   // Disable browser scroll restoration
//   useEffect(() => {
//     if ('scrollRestoration' in history) {
//       history.scrollRestoration = 'manual'
//     }
//     if (location.pathname === '/') {
//       window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
//     }
//   }, [])

//   // Scroll to section on route change
//   useEffect(() => {
//     const targetByPath: Record<string, HTMLElement | null | undefined> = {
//       '/': homeRef.current,
//       '/about': aboutRef.current,
//       '/timeline': timelineRef.current,
//       '/eligibility': eligibilityRef.current,
//       '/members': membersRef.current,
//       '/problems': problemsRef.current,
//       '/faq': faqRef.current,
//     }

//     const el = targetByPath[location.pathname]
//     if (el) {
//       el.scrollIntoView({ behavior: 'smooth', block: 'start' })
//     }
//   }, [location.pathname])

//   return (
//     <>
//       <div ref={homeRef} id="home" className="min-h-screen scroll-mt-24">
//         <HeroSection onNavigate={onNavigate} />
//       </div>

//       <div ref={aboutRef} id="about" className="min-h-screen scroll-mt-24">
//         <AboutSection />
//       </div>

//       <div ref={timelineRef} id="timeline" className="min-h-screen scroll-mt-24">
//         <TimelineSection />
//       </div>

//       <div ref={eligibilityRef} id="eligibility" className="min-h-screen scroll-mt-24">
//         <Eligibility />
//       </div>

//       <div ref={membersRef} id="members" className="min-h-screen scroll-mt-24">
//         <Members />
//       </div>

//       <div ref={problemsRef} id="problems" className="min-h-screen scroll-mt-24">
//         <ProblemsSection />
//       </div>

//       <div ref={faqRef} id="faq" className="min-h-screen scroll-mt-24">
//         <FAQ />
//       </div>
//     </>
//   )
// }

// function AppRoutes() {
//   const { loading } = useAuth()
//   const location = useLocation()
//   const navigate = useNavigate()

//   const pathToView: Record<string, string> = {
//     '/': 'home',
//     '/about': 'about',
//     '/timeline': 'timeline',
//     '/eligibility': 'eligibility',
//     '/members': 'members',
//     '/problems': 'problems',
//     '/faq': 'faq',
//     '/auth': 'auth',
//     '/dashboard': 'dashboard',
//   }

//   const currentView = pathToView[location.pathname] ?? 'home'

//   const handleNavigate = (section: string) => {
//     const viewToPath: Record<string, string> = {
//       home: '/',
//       about: '/about',
//       timeline: '/timeline',
//       eligibility: '/eligibility',
//       members: '/members',
//       problems: '/problems',
//       faq: '/faq',
//       auth: '/auth',
//       dashboard: '/dashboard',
//     }
//     navigate(viewToPath[section] ?? '/')
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#34a1eb]/10 to-[#9c371e]/10">
//         <div className="w-16 h-16 border-4 border-[#34a1eb] border-t-transparent rounded-full animate-spin" />
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-white flex flex-col">
//       <Navigation onNavigate={handleNavigate} currentView={currentView} />

//       <div className="flex-1">
//         <Routes>
//           <Route path="/" element={<HomePage onNavigate={handleNavigate} />} />
//           <Route path="/about" element={<HomePage onNavigate={handleNavigate} />} />
//           <Route path="/timeline" element={<HomePage onNavigate={handleNavigate} />} />
//           <Route path="/eligibility" element={<HomePage onNavigate={handleNavigate} />} />
//           <Route path="/members" element={<HomePage onNavigate={handleNavigate} />} />
//           <Route path="/problems" element={<HomePage onNavigate={handleNavigate} />} />
//           <Route path="/faq" element={<HomePage onNavigate={handleNavigate} />} />
//           <Route path="/auth" element={<AuthForms onNavigate={handleNavigate} />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </div>

//       <Footer />
//     </div>
//   )
// }

// export default function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <AppRoutes />
//       </BrowserRouter>
//     </AuthProvider>
//   )
// }
import { useEffect, useRef } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import TimelineSection from './components/TimelineSection'
import Eligibility from './components/Eligibility'
import Members from './components/Members'
import ProblemsSection from './components/ProblemsSection'
import FAQ from './components/Faq'
import AuthForms from './components/AuthForms'
import Dashboard from './components/Dashboard'
import Footer from './components/Footer'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom'

function HomePage({
  onNavigate,
  onSectionChange,
}: {
  onNavigate: (section: string) => void
  onSectionChange: (section: string) => void
}) {
  const location = useLocation()

  const homeRef = useRef<HTMLDivElement | null>(null)
  const aboutRef = useRef<HTMLDivElement | null>(null)
  const timelineRef = useRef<HTMLDivElement | null>(null)
  const eligibilityRef = useRef<HTMLDivElement | null>(null)
  const membersRef = useRef<HTMLDivElement | null>(null)
  const problemsRef = useRef<HTMLDivElement | null>(null)
  const faqRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }
  }, [])

  useEffect(() => {
    const targetByPath: Record<string, HTMLElement | null | undefined> = {
      '/': homeRef.current,
      '/about': aboutRef.current,
      '/timeline': timelineRef.current,
      '/eligibility': eligibilityRef.current,
      '/members': membersRef.current,
      '/problems': problemsRef.current,
      '/faq': faqRef.current,
    }

    const el = targetByPath[location.pathname]
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [location.pathname])

  useEffect(() => {
    const sections = [
      homeRef,
      aboutRef,
      timelineRef,
      eligibilityRef,
      membersRef,
      problemsRef,
      faqRef,
    ]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onSectionChange(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0,
      }
    )

    sections.forEach(
      (ref) => ref.current && observer.observe(ref.current)
    )

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div ref={homeRef} id="home" className="min-h-screen scroll-mt-24">
        <HeroSection onNavigate={onNavigate} />
      </div>

      <div ref={aboutRef} id="about" className="min-h-screen scroll-mt-24">
        <AboutSection />
      </div>

      <div ref={timelineRef} id="timeline" className="min-h-screen scroll-mt-24">
        <TimelineSection />
      </div>

      <div ref={eligibilityRef} id="eligibility" className="min-h-screen scroll-mt-24">
        <Eligibility />
      </div>

      <div ref={membersRef} id="members" className="min-h-screen scroll-mt-24">
        <Members />
      </div>

      <div ref={problemsRef} id="problems" className="min-h-screen scroll-mt-24">
        <ProblemsSection />
      </div>

      <div ref={faqRef} id="faq" className="min-h-screen scroll-mt-24">
        <FAQ />
      </div>
    </>
  )
}

function AppRoutes() {
  // ✅ CHANGE 1: get user also
  const { loading, user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const pathToView: Record<string, string> = {
    '/': 'home',
    '/about': 'about',
    '/timeline': 'timeline',
    '/eligibility': 'eligibility',
    '/members': 'members',
    '/problems': 'problems',
    '/faq': 'faq',
    '/auth': 'auth',
    '/dashboard': 'dashboard',
  }

  const currentView = pathToView[location.pathname] ?? 'home'

  const handleNavigate = (section: string) => {
    const viewToPath: Record<string, string> = {
      home: '/',
      about: '/about',
      timeline: '/timeline',
      eligibility: '/eligibility',
      members: '/members',
      problems: '/problems',
      faq: '/faq',
      auth: '/auth',
      dashboard: '/dashboard',
    }

    navigate(viewToPath[section] ?? '/', {
      replace: true,
      preventScrollReset: true,
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#34a1eb]/10 to-[#9c371e]/10">
        <div className="w-16 h-16 border-4 border-[#34a1eb] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation onNavigate={handleNavigate} currentView={currentView} />

      <div className="flex-1">
        <Routes>
          {['/', '/about', '/timeline', '/eligibility', '/members', '/problems', '/faq'].map(
            (path) => (
              <Route
                key={path}
                path={path}
                element={
                  <HomePage
                    onNavigate={handleNavigate}
                    onSectionChange={handleNavigate}
                  />
                }
              />
            )
          )}

          <Route path="/auth" element={<AuthForms onNavigate={handleNavigate} />} />

          {/* ✅ CHANGE 2: protect dashboard */}
          <Route
            path="/dashboard"
            element={
              user && user.email_confirmed_at ? (
                <Dashboard />
              ) : (
                <Navigate to="/auth" replace />
              )
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}
