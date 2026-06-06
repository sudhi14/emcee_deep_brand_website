import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function Home() {
  const { isEmceeDeep, togglePersona, setPersona } = useTheme()

  return (
    <main>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-end px-6 pt-24 pb-20 overflow-hidden">

        {/* Background image — filter applied only here, not to text */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${isEmceeDeep ? '/images/img22.jpg' : '/images/img5.jpg'})`,
            backgroundSize: isEmceeDeep ? '130% auto' : 'cover',
            backgroundPosition: isEmceeDeep ? '5% 60%' : 'center',
            filter: isEmceeDeep ? 'grayscale(100%)' : 'none',
            transition: 'filter 0.5s ease, background-image 0.5s ease, background-position 0.5s ease',
          }}
        />

        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: isEmceeDeep
              ? 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.3) 100%)'
              : 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 100%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto w-full">

          {/* Persona switcher — mobile only, full names */}
          <div
            className="md:hidden inline-flex items-center rounded-full p-1 mb-8"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', border: '0.5px solid rgba(242,237,228,0.15)' }}
          >
            <button
              onClick={() => setPersona('emceedeep')}
              className="px-4 py-2 rounded-full theme-transition"
              style={{
                fontSize: '14px',
                fontWeight: isEmceeDeep ? '500' : '400',
                backgroundColor: isEmceeDeep ? 'var(--color-accent)' : 'transparent',
                color: isEmceeDeep ? '#0D0D0D' : 'rgba(242,237,228,0.6)',
              }}
            >
              Emcee Deep
            </button>
            <button
              onClick={() => setPersona('infiniteloop')}
              className="px-4 py-2 rounded-full theme-transition"
              style={{
                fontSize: '14px',
                fontWeight: !isEmceeDeep ? '500' : '400',
                backgroundColor: !isEmceeDeep ? 'var(--color-accent)' : 'transparent',
                color: !isEmceeDeep ? '#0D0D0D' : 'rgba(242,237,228,0.6)',
              }}
            >
              Infinite Loop
            </button>
          </div>

          {/* Name label */}
          <p className="font-display font-medium tracking-widest uppercase mb-4" style={{ fontSize: '32px', color: 'var(--color-accent)', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
            {isEmceeDeep ? 'Emcee Deep' : 'Infinite Loop'}
          </p>

          {/* Heading */}
          <h1 className="font-display text-5xl md:text-7xl font-medium mb-6 leading-tight max-w-2xl" style={{ color: '#F2EDE4' }}>
            {isEmceeDeep ? (
              <>Making music<br />that makes you<br /><span style={{ color: 'var(--color-accent)' }}>feel infinite.</span></>
            ) : (
              <>Sets built<br />to take you<br /><span style={{ color: 'var(--color-accent)' }}>on a journey.</span></>
            )}
          </h1>

          {/* Sub */}
          <p className="text-lg mb-10 max-w-md" style={{ color: 'rgba(242,237,228,0.7)' }}>
            {isEmceeDeep
              ? 'Toronto-based producer blending South Asian music with house, hip-hop, and electronic.'
              : 'Afro House to Bass House. Warm to peak. Every set tells a story.'}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            {isEmceeDeep ? (
              <>
                <Link to="/music" className="px-6 py-3 text-sm font-medium rounded-sm theme-transition" style={{ backgroundColor: 'var(--color-accent)', color: '#0D0D0D' }}>
                  Listen to music
                </Link>
                <Link to="/booking" className="px-6 py-3 text-sm rounded-sm theme-transition" style={{ border: '0.5px solid rgba(242,237,228,0.4)', color: '#F2EDE4' }}>
                  Book Infinite Loop
                </Link>
              </>
            ) : (
              <>
                <Link to="/djsets" className="px-6 py-3 text-sm font-medium rounded-sm theme-transition" style={{ backgroundColor: 'var(--color-accent)', color: '#0D0D0D' }}>
                  Watch DJ Sets
                </Link>
                <Link to="/booking" className="px-6 py-3 text-sm rounded-sm theme-transition" style={{ border: '0.5px solid rgba(242,237,228,0.4)', color: '#F2EDE4' }}>
                  Book a gig
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── Latest Release ────────────────────────────────────── */}
      <section className="px-6 py-16 max-w-6xl mx-auto" style={{ borderTop: '0.5px solid var(--color-border)' }}>
        <p className="text-xs uppercase tracking-widest mb-8" style={{ color: 'var(--color-text-muted)' }}>Latest release</p>
        <div className="aspect-video max-w-2xl rounded-sm overflow-hidden" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
          {/* Replace src with your latest YouTube/Spotify embed */}
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/cbLm299Dirw?si=0EBD60rSQKxq_YJY"
            title="Latest release"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>

      {/* ── Fresh Ravers teaser ───────────────────────────────── */}
      <section className="px-6 py-16 max-w-6xl mx-auto" style={{ borderTop: '0.5px solid var(--color-border)' }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--color-accent)' }}>Fresh Ravers</p>
            <h2 className="font-display text-3xl font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>
              Toronto's community rave experience.
            </h2>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Where local artists meet global names on the same dance floor.
            </p>
          </div>
          <Link to="/events" className="px-6 py-3 text-sm rounded-sm whitespace-nowrap theme-transition" style={{ border: '0.5px solid var(--color-accent)', color: 'var(--color-accent)' }}>
            See upcoming events →
          </Link>
        </div>
      </section>

    </main>
  )
}
