import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function Header() {
  const { isDark, isEmceeDeep, toggleTheme, togglePersona } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { to: '/music', label: 'Music' },
    { to: '/djsets', label: 'DJ Sets' },
    { to: '/events', label: 'Events' },
    { to: '/about', label: 'About' },
    { to: '/booking', label: 'Booking' },
  ]

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 theme-transition"
      style={{
        backgroundColor: 'var(--color-bg-primary)',
        borderBottom: '0.5px solid var(--color-border)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="font-display font-medium text-sm tracking-widest uppercase" style={{ color: 'var(--color-text-primary)' }}>
          Emcee Deep
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm transition-colors duration-200 ${isActive ? 'accent' : 'text-muted hover:text-primary'}`
              }
              style={({ isActive }) => isActive ? { color: 'var(--color-accent)' } : { color: 'var(--color-text-muted)' }}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-3">

          {/* Persona switcher */}
          <button
            onClick={togglePersona}
            title={isEmceeDeep ? 'Switch to Infinite Loop' : 'Switch to Emcee Deep'}
            className="hidden md:flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border theme-transition"
            style={{
              borderColor: 'var(--color-accent)',
              color: 'var(--color-accent)',
              backgroundColor: 'var(--color-accent-muted)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full accent-bg" />
            {isEmceeDeep ? 'Emcee Deep' : 'Infinite Loop'}
          </button>

          {/* Dark / Light toggle */}
          <button
            onClick={toggleTheme}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-8 h-8 flex items-center justify-center rounded-full text-sm theme-transition"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {isDark ? '☀' : '☽'}
          </button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden w-8 h-8 flex items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: 'var(--color-text-muted)' }}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4 theme-transition"
          style={{ backgroundColor: 'var(--color-bg-primary)' }}
        >
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="text-sm"
              style={({ isActive }) => isActive ? { color: 'var(--color-accent)' } : { color: 'var(--color-text-muted)' }}
            >
              {link.label}
            </NavLink>
          ))}
          <button
            onClick={togglePersona}
            className="text-sm text-left"
            style={{ color: 'var(--color-accent)' }}
          >
            Switch to {isEmceeDeep ? 'Infinite Loop' : 'Emcee Deep'}
          </button>
        </div>
      )}
    </header>
  )
}
