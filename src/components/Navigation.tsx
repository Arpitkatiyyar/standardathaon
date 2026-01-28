import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

import bisLogo from '../assets/bis logo.png'
import collegeLogo from '../assets/nit logo.png'

interface NavigationProps {
  onNavigate: (section: string) => void
  currentView: string
}

export default function Navigation({ onNavigate, currentView }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const { user, signOut } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight

      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setScrollProgress(scrolled)
      setIsScrolled(scrollTop > 10)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = user
    ? [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'timeline', label: 'Timeline' },
        { id: 'eligibility', label: 'Eligibility' },
        { id: 'members', label: 'Members' },
        { id: 'problems', label: 'Problems' },
        { id: 'dashboard', label: 'Dashboard' },
      ]
    : [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'timeline', label: 'Timeline' },
        { id: 'eligibility', label: 'Eligibility' },
        { id: 'members', label: 'Members' },
        { id: 'problems', label: 'Problems' },
      ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gradient-to-r from-[#f7fbff] via-[#fafbfd] to-[#fff6f1] shadow-md'
          : 'bg-white'
      }`}
    >
      {/* 🔹 MAIN NAVBAR ROW */}
      <div className="flex items-center justify-between h-20 px-4 md:px-6">

        {/* 🔹 LEFT: BIS LOGO + TITLE (TIGHT TO EDGE) */}
        <div className="flex items-center gap-3">
          <img
            src={bisLogo}
            alt="BIS Logo"
            className="h-12 md:h-14 w-auto object-contain"
          />
          <div className="flex flex-col leading-tight">
            <h1 className="text-lg md:text-xl font-bold text-gray-900">
              Standardthon
            </h1>
            <p className="text-xs text-gray-600">
              BIS × NIT Hamirpur
            </p>
          </div>
        </div>

        {/* 🔹 CENTER MENU */}
        <div className="hidden md:flex items-center space-x-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                currentView === item.id
                  ? 'bg-[#34a1eb] text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* 🔹 RIGHT: AUTH BUTTON + NIT LOGO (NO OVERFLOW GUARANTEE) */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <button
              onClick={signOut}
              className="px-6 py-2 bg-[#9c371e] text-white rounded-lg font-medium hover:bg-[#8a2f19]"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => onNavigate('auth')}
              className="px-6 py-2 bg-[#34a1eb] text-white rounded-lg font-medium hover:bg-[#2891db]"
            >
              Login / Register
            </button>
          )}

          {/* 🔹 HARD-CONSTRAINED NIT LOGO */}
          <div className="h-12 w-12 flex items-center justify-center overflow-hidden">
            <img
              src={collegeLogo}
              alt="NIT Hamirpur Logo"
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>

        {/* 🔹 MOBILE MENU BUTTON */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 🔹 SCROLL PROGRESS BAR */}
      <div className="absolute bottom-0 left-0 w-full h-[3px]">
        <div
          className="h-full bg-gradient-to-r from-[#34a1eb] to-[#9c371e]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </nav>
  )
}
