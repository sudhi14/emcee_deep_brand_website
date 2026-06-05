import { Link } from 'react-router-dom'

export default function Footer() {
  const socials = [
    { label: 'Instagram (Emcee Deep)', href: 'https://instagram.com/emcee_deep' },
    { label: 'Instagram (Infinite Loop)', href: 'https://instagram.com/infinite_loop_dj' },
    { label: 'Instagram (Fresh Ravers)', href: 'https://instagram.com/fresh_ravers' },
    { label: 'TikTok', href: 'https://tiktok.com/@emcee_deep' },
    { label: 'YouTube', href: 'https://youtube.com/@emceedeep' },
  ]

  return (
    <footer
      className="theme-transition"
      style={{
        borderTop: '0.5px solid var(--color-border)',
        backgroundColor: 'var(--color-bg-primary)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">

          {/* Brand */}
          <div>
            <p className="font-display font-medium text-sm tracking-widest uppercase mb-2" style={{ color: 'var(--color-text-primary)' }}>
              Emcee Deep
            </p>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Making music that makes you feel infinite.
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
              Toronto, Canada
            </p>
          </div>

          {/* Nav */}
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--color-text-muted)' }}>Navigate</p>
            {['/music', '/djsets', '/events', '/about', '/booking'].map(path => (
              <Link key={path} to={path} className="text-sm capitalize theme-transition" style={{ color: 'var(--color-text-muted)' }}>
                {path.replace('/', '')}
              </Link>
            ))}
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--color-text-muted)' }}>Follow</p>
            {socials.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="text-sm theme-transition" style={{ color: 'var(--color-text-muted)' }}>
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: '0.5px solid var(--color-border)' }}>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            © {new Date().getFullYear()} Emcee Deep. All rights reserved.
          </p>
          <a href="mailto:emceedeep.official@gmail.com" className="text-xs theme-transition" style={{ color: 'var(--color-accent)' }}>
            emceedeep.official@gmail.com
          </a>
        </div>
      </div>
    </footer>
  )
}
