import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function Header() {
  const { isDark, isEmceeDeep, toggleTheme, togglePersona, setPersona } = useTheme()
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
      <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between" style={{ height: '68px' }}>

        {/* Logo */}
        <Link to="/" className="font-display font-medium tracking-widest uppercase" style={{ fontSize: '16px', color: 'var(--color-text-primary)' }}>
          Emcee Deep
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `transition-colors duration-200 ${isActive ? 'accent' : 'text-muted hover:text-primary'}`
              }
              style={({ isActive }) => ({
                fontSize: '16px',
                color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-3">

          {/* Persona switcher — segmented control */}
          <div
            className="hidden md:flex items-center rounded-full p-0.5 theme-transition"
            style={{ border: '0.5px solid var(--color-border)', backgroundColor: 'var(--color-bg-secondary)' }}
          >
            <button
              onClick={() => setPersona('emceedeep')}
              className="px-4 py-1.5 rounded-full theme-transition"
              style={{
                fontSize: '13px',
                fontWeight: isEmceeDeep ? '500' : '400',
                backgroundColor: isEmceeDeep ? 'var(--color-accent)' : 'transparent',
                color: isEmceeDeep ? '#0D0D0D' : 'var(--color-text-muted)',
              }}
            >
              Producer
            </button>
            <button
              onClick={() => setPersona('infiniteloop')}
              className="px-4 py-1.5 rounded-full theme-transition"
              style={{
                fontSize: '13px',
                fontWeight: !isEmceeDeep ? '500' : '400',
                backgroundColor: !isEmceeDeep ? 'var(--color-accent)' : 'transparent',
                color: !isEmceeDeep ? '#0D0D0D' : 'var(--color-text-muted)',
              }}
            >
              DJ
            </button>
          </div>

          {/* Dark / Light toggle */}
          <button
            onClick={toggleTheme}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-9 h-9 flex items-center justify-center rounded-full theme-transition"
            style={{ fontSize: '18px', color: 'var(--color-text-muted)' }}
          >
            {isDark ? '☀' : '☽'}
          </button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ fontSize: '20px', color: 'var(--color-text-muted)' }}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-8 pt-3 flex flex-col gap-6 theme-transition"
          style={{ backgroundColor: 'var(--color-bg-primary)', borderTop: '0.5px solid var(--color-border)' }}
        >
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              style={({ isActive }) => ({
                fontSize: '20px',
                fontFamily: 'Space Grotesk, sans-serif',
                color: isActive ? 'var(--color-accent)' : 'var(--color-text-primary)',
              })}
            >
              {link.label}
            </NavLink>
          ))}
          {/* Mobile persona switcher */}
          <div
            className="flex items-center rounded-full p-0.5 self-start theme-transition"
            style={{ border: '0.5px solid var(--color-border)', backgroundColor: 'var(--color-bg-secondary)' }}
          >
            <button
              onClick={() => { setPersona('emceedeep'); setMenuOpen(false) }}
              className="px-5 py-2 rounded-full theme-transition"
              style={{
                fontSize: '15px',
                fontWeight: isEmceeDeep ? '500' : '400',
                backgroundColor: isEmceeDeep ? 'var(--color-accent)' : 'transparent',
                color: isEmceeDeep ? '#0D0D0D' : 'var(--color-text-muted)',
              }}
            >
              Producer
            </button>
            <button
              onClick={() => { setPersona('infiniteloop'); setMenuOpen(false) }}
              className="px-5 py-2 rounded-full theme-transition"
              style={{
                fontSize: '15px',
                fontWeight: !isEmceeDeep ? '500' : '400',
                backgroundColor: !isEmceeDeep ? 'var(--color-accent)' : 'transparent',
                color: !isEmceeDeep ? '#0D0D0D' : 'var(--color-text-muted)',
              }}
            >
              DJ
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
