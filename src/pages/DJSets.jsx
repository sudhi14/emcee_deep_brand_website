import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const genres = [
  { label: 'Afro House',   color: '#C8821A', bg: 'rgba(200,130,26,0.12)'  },
  { label: 'Groovy House', color: '#7F77DD', bg: 'rgba(127,119,221,0.12)' },
  { label: 'Tech House',   color: '#378ADD', bg: 'rgba(55,138,221,0.12)'  },
  { label: 'Bass House',   color: '#1D9E75', bg: 'rgba(29,158,117,0.12)'  },
  { label: 'Techno',       color: '#E24B4A', bg: 'rgba(226,75,74,0.12)'   },
  { label: 'Dubstep',      color: '#D4537E', bg: 'rgba(212,83,126,0.12)'  },
]

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000)
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`
  if (diff < 31536000) return `${Math.floor(diff / 2592000)}mo ago`
  return `${Math.floor(diff / 31536000)}y ago`
}

export default function DJSets() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeVideo, setActiveVideo] = useState(null)
  const playerRef = useRef(null)

  useEffect(() => {
    fetch('/api/djsets')
      .then(res => res.json())
      .then(data => {
        if (data.error) throw new Error(data.error)
        setVideos(data.videos)
        if (data.videos.length > 0) setActiveVideo(data.videos[0])
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="pt-24 pb-16 max-w-6xl mx-auto px-6">

      {/* Header */}
      <section className="py-16">
        <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--color-accent)' }}>Infinite Loop</p>
        <h1 className="font-display text-5xl md:text-6xl font-medium mb-6" style={{ color: 'var(--color-text-primary)' }}>
          DJ Sets
        </h1>
        <p className="text-lg max-w-xl" style={{ color: 'var(--color-text-muted)' }}>
          Sets built to take you on a journey — from warm Afro House grooves to peak-time Bass House.
        </p>
      </section>

      {/* Hero image */}
      <div className="w-full rounded-sm overflow-hidden mb-16" style={{ maxHeight: '450px' }}>
        <img src="/images/img5.jpg" alt="Infinite Loop performing" className="w-full object-cover object-center" style={{ maxHeight: '450px' }} />
      </div>

      {/* Genre tags */}
      <div className="flex flex-wrap gap-2 mb-16" style={{ borderTop: '0.5px solid var(--color-border)', paddingTop: '2rem' }}>
        {genres.map(g => (
          <span
            key={g.label}
            className="text-xs px-3 py-1.5 rounded-full"
            style={{
              border: `0.5px solid ${g.color}60`,
              color: g.color,
              backgroundColor: g.bg,
            }}
          >
            {g.label}
          </span>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="py-24 text-center">
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Loading sets...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="py-24 text-center">
          <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>Could not load sets.</p>
          <a href="https://youtube.com/@emceedeep" target="_blank" rel="noreferrer" className="text-sm" style={{ color: 'var(--color-accent)' }}>
            Watch on YouTube →
          </a>
        </div>
      )}

      {!loading && !error && videos.length > 0 && (
        <>
          {/* ── Featured player ──────────────────────────────── */}
          {activeVideo && (
            <section className="mb-12">
              <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--color-text-muted)' }}>Now playing</p>
              <div ref={playerRef} className="aspect-video rounded-sm overflow-hidden mb-4" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
                <iframe
                  key={activeVideo.id}
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1`}
                  title={activeVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <h2 className="font-display text-xl font-medium mb-1" style={{ color: 'var(--color-text-primary)' }}>{activeVideo.title}</h2>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{timeAgo(activeVideo.publishedAt)}</p>
            </section>
          )}

          {/* ── All sets grid ─────────────────────────────────── */}
          <section style={{ borderTop: '0.5px solid var(--color-border)', paddingTop: '2rem' }}>
            <p className="text-xs uppercase tracking-widest mb-8" style={{ color: 'var(--color-text-muted)' }}>All sets</p>
            <div className="grid md:grid-cols-3 gap-6">
              {videos.map(video => (
                <button
                  key={video.id}
                  onClick={() => {
                    setActiveVideo(video)
                    setTimeout(() => playerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
                  }}
                  className="flex flex-col gap-3 text-left group"
                >
                  <div className="relative aspect-video rounded-sm overflow-hidden" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                    {/* Play overlay */}
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 theme-transition"
                      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                    >
                      <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent)' }}>
                        <i className="ti ti-player-play" style={{ fontSize: '20px', color: '#0D0D0D' }} aria-hidden="true" />
                      </div>
                    </div>
                    {/* Active indicator */}
                    {activeVideo?.id === video.id && (
                      <div className="absolute top-2 left-2 text-xs px-2 py-1 rounded-sm" style={{ backgroundColor: 'var(--color-accent)', color: '#0D0D0D' }}>
                        Playing
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-display font-medium text-sm leading-snug line-clamp-2" style={{ color: 'var(--color-text-primary)' }}>{video.title}</p>
                    <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{timeAgo(video.publishedAt)}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </>
      )}

      {/* CTAs */}
      <div className="mt-16 flex flex-col md:flex-row gap-4 items-center justify-center" style={{ borderTop: '0.5px solid var(--color-border)', paddingTop: '3rem' }}>
        <a href="https://youtube.com/@emceedeep" target="_blank" rel="noreferrer" className="px-6 py-3 text-sm rounded-sm theme-transition" style={{ border: '0.5px solid var(--color-accent)', color: 'var(--color-accent)' }}>
          Subscribe on YouTube →
        </a>
        <Link to="/booking" className="px-6 py-3 text-sm rounded-sm theme-transition" style={{ backgroundColor: 'var(--color-accent)', color: '#0D0D0D' }}>
          Book Infinite Loop →
        </Link>
      </div>
    </main>
  )
}
