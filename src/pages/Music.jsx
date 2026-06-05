import { Link } from 'react-router-dom'

const releases = [
  {
    title: 'Carnatic Meets Hip-Hop',
    year: '2018',
    type: 'Beat',
    spotifyUrl: '#',
    highlight: true,
    note: '60k+ organic views',
  },
  { title: 'Drop The Pressure (Remix)', year: '2023', type: 'EDM / House', spotifyUrl: '#' },
  { title: 'MIB Margazhi Poove Remix', year: '2022', type: 'EDM / House', spotifyUrl: '#' },
  { title: 'City Love', year: '2021', type: 'Beat', spotifyUrl: '#' },
  { title: 'Drive at 3 A.M', year: '2020', type: 'Beat', spotifyUrl: '#' },
  { title: "I'm the 90's Kid", year: '2019', type: 'Song', spotifyUrl: '#' },
  { title: 'Underdog', year: '2017', type: 'Song', spotifyUrl: '#' },
]

export default function Music() {
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
      <div className="flex flex-wrap gap-3 mb-16" style={{ borderTop: '0.5px solid var(--color-border)', paddingTop: '2rem' }}>
        <p className="text-xs uppercase tracking-widest w-full mb-2" style={{ color: 'var(--color-text-muted)' }}>Stream everywhere</p>
        {['Spotify', 'Apple Music', 'SoundCloud', 'YouTube Music'].map(platform => (
          <a
            key={platform}
            href="#"
            className="text-sm px-4 py-2 rounded-sm theme-transition"
            style={{ border: '0.5px solid var(--color-border)', color: 'var(--color-text-muted)' }}
          >
            {platform}
          </a>
        ))}
      </div>

      {/* Releases */}
      <div style={{ borderTop: '0.5px solid var(--color-border)' }}>
        <p className="text-xs uppercase tracking-widest py-4" style={{ color: 'var(--color-text-muted)' }}>All releases</p>
        {releases.map((track, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-5 theme-transition"
            style={{ borderBottom: '0.5px solid var(--color-border)' }}
          >
            <div className="flex items-center gap-6">
              <span className="text-sm w-6" style={{ color: 'var(--color-text-muted)' }}>{i + 1}</span>
              <div>
                <div className="flex items-center gap-3">
                  <p className="font-display font-medium" style={{ color: 'var(--color-text-primary)' }}>{track.title}</p>
                  {track.highlight && (
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--color-accent-muted)', color: 'var(--color-accent)' }}>
                      {track.note}
                    </span>
                  )}
                </div>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{track.type} · {track.year}</p>
              </div>
            </div>
            <a href={track.spotifyUrl} target="_blank" rel="noreferrer" className="text-sm theme-transition" style={{ color: 'var(--color-accent)' }}>
              Listen →
            </a>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>Want to collaborate or get a beat?</p>
        <Link to="/booking" className="px-6 py-3 text-sm rounded-sm theme-transition" style={{ backgroundColor: 'var(--color-accent)', color: '#0D0D0D' }}>
          Get in touch →
        </Link>
      </div>
    </main>
  )
}
