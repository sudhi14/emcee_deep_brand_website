import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const SPOTIFY_ARTIST_URL = 'https://open.spotify.com/artist/6jrN28fS9Nu167aeEdrB6L'

function formatDuration(ms) {
  const mins = Math.floor(ms / 60000)
  const secs = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0')
  return `${mins}:${secs}`
}

export default function Music() {
  const [latest, setLatest] = useState(null)
  const [topTracks, setTopTracks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/releases')
      .then(res => res.json())
      .then(data => {
        if (data.error) throw new Error(data.error)
        setLatest(data.latest)
        setTopTracks(data.topTracks)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="pt-24 pb-16 max-w-6xl mx-auto px-6">

      {/* Header */}
      <section className="py-16">
        <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--color-accent)' }}>Emcee Deep</p>
        <h1 className="font-display text-5xl md:text-6xl font-medium mb-6" style={{ color: 'var(--color-text-primary)' }}>
          Music
        </h1>
        <p className="text-lg max-w-xl" style={{ color: 'var(--color-text-muted)' }}>
          House, hip-hop, trap, EDM — woven with South Asian classical and Indian music roots.
        </p>
      </section>

      {/* Streaming links */}
      <div className="flex flex-wrap gap-3 mb-12" style={{ borderTop: '0.5px solid var(--color-border)', paddingTop: '2rem' }}>
        <p className="text-xs uppercase tracking-widest w-full mb-2" style={{ color: 'var(--color-text-muted)' }}>Stream everywhere</p>
        {[
          { label: 'Spotify',       href: 'https://open.spotify.com/artist/6jrN28fS9Nu167aeEdrB6L', icon: 'ti-brand-spotify',   color: '#1DB954', bg: 'rgba(29,185,84,0.1)' },
          { label: 'Apple Music',   href: 'https://music.apple.com/us/artist/emcee-deep/1489809681',  icon: 'ti-brand-apple',      color: '#FC3C44', bg: 'rgba(252,60,68,0.1)' },
          { label: 'SoundCloud',    href: 'https://on.soundcloud.com/dIRF8PUljSPfbA3FQV',            icon: 'ti-brand-soundcloud', color: '#FF5500', bg: 'rgba(255,85,0,0.1)'  },
          { label: 'YouTube Music', href: 'https://music.youtube.com/@emceedeep?si=-WNQMrD_0334b2iE', icon: 'ti-brand-youtube',   color: '#FF0000', bg: 'rgba(255,0,0,0.1)'   },
        ].map(platform => (
          <a
            key={platform.label}
            href={platform.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm px-4 py-2.5 rounded-sm theme-transition"
            style={{
              border: `0.5px solid ${platform.color}40`,
              color: platform.color,
              backgroundColor: platform.bg,
            }}
          >
            <i className={`ti ${platform.icon}`} style={{ fontSize: '16px' }} aria-hidden="true" />
            {platform.label}
          </a>
        ))}
      </div>

      {loading && (
        <div className="py-24 text-center">
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Loading music...</p>
        </div>
      )}

      {error && (
        <div className="py-24 text-center">
          <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>Could not load music.</p>
          <a href={SPOTIFY_ARTIST_URL} target="_blank" rel="noreferrer" className="text-sm" style={{ color: 'var(--color-accent)' }}>
            Listen on Spotify →
          </a>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* ── Latest Release ──────────────────────────────────── */}
          {latest && (
            <section className="py-12" style={{ borderTop: '0.5px solid var(--color-border)' }}>
              <p className="text-xs uppercase tracking-widest mb-8" style={{ color: 'var(--color-text-muted)' }}>Latest release</p>
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {latest.coverUrl && (
                  <img
                    src={latest.coverUrl}
                    alt={latest.title}
                    className="w-48 h-48 rounded-sm object-cover flex-shrink-0"
                  />
                )}
                <div className="flex flex-col justify-center gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--color-accent)' }}>{latest.type} · {latest.year}</p>
                    <h2 className="font-display text-3xl font-medium" style={{ color: 'var(--color-text-primary)' }}>{latest.title}</h2>
                    <p className="mt-1" style={{ color: 'var(--color-text-muted)' }}>Emcee Deep</p>
                  </div>
                  <a
                    href={latest.spotifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm rounded-sm self-start theme-transition"
                    style={{ backgroundColor: 'var(--color-accent)', color: '#0D0D0D' }}
                  >
                    Listen on Spotify →
                  </a>
                </div>
              </div>
            </section>
          )}

          {/* ── Popular Songs ───────────────────────────────────── */}
          {topTracks.length > 0 && (
            <section className="py-12" style={{ borderTop: '0.5px solid var(--color-border)' }}>
              <p className="text-xs uppercase tracking-widest mb-8" style={{ color: 'var(--color-text-muted)' }}>Popular songs</p>

              {topTracks.map((track, i) => (
                <div
                  key={track.id}
                  className="flex items-center gap-4 py-4 group theme-transition"
                  style={{ borderBottom: '0.5px solid var(--color-border)' }}
                >
                  <span className="text-sm w-5 flex-shrink-0" style={{ color: 'var(--color-text-muted)' }}>{i + 1}</span>

                  {track.coverUrl && (
                    <img src={track.coverUrl} alt={track.title} className="w-10 h-10 rounded-sm object-cover flex-shrink-0" />
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="font-display font-medium truncate" style={{ color: 'var(--color-text-primary)' }}>{track.title}</p>
                    <p className="text-sm truncate" style={{ color: 'var(--color-text-muted)' }}>{track.album}</p>
                  </div>

                  <span className="text-sm flex-shrink-0" style={{ color: 'var(--color-text-muted)' }}>
                    {formatDuration(track.durationMs)}
                  </span>

                  <a
                    href={track.spotifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm flex-shrink-0 theme-transition opacity-0 group-hover:opacity-100"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    Play →
                  </a>
                </div>
              ))}

              {/* Spotify link */}
              <div className="mt-8">
                <a
                  href={SPOTIFY_ARTIST_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm theme-transition"
                  style={{ color: 'var(--color-accent)' }}
                >
                  See full discography on Spotify →
                </a>
              </div>
            </section>
          )}
        </>
      )}

      {/* CTA */}
      <div className="mt-8 text-center" style={{ borderTop: '0.5px solid var(--color-border)', paddingTop: '3rem' }}>
        <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>Want to collaborate or get a beat?</p>
        <Link to="/booking" className="px-6 py-3 text-sm rounded-sm theme-transition" style={{ backgroundColor: 'var(--color-accent)', color: '#0D0D0D' }}>
          Get in touch →
        </Link>
      </div>
    </main>
  )
}
