import { Link } from 'react-router-dom'

const sets = [
  {
    title: 'Disco House Mix | Funky | Rooftop | Summer Vibes',
    youtubeId: 'nyzweoQCEwU',
    type: 'Groovy House',
    year: '2024',
  },
  // Add more sets here as YouTube IDs
]

const genres = ['Afro House', 'Groovy House', 'Tech House', 'Bass House', 'Techno']

export default function DJSets() {
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
            key={g}
            className="text-xs px-3 py-1.5 rounded-full"
            style={{ border: '0.5px solid var(--color-border)', color: 'var(--color-text-muted)' }}
          >
            {g}
          </span>
        ))}
      </div>

      {/* Sets grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {sets.map((set, i) => (
          <div key={i} className="flex flex-col gap-3">
            <div className="aspect-video rounded-sm overflow-hidden" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${set.youtubeId}`}
                title={set.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div>
              <p className="font-display font-medium" style={{ color: 'var(--color-text-primary)' }}>{set.title}</p>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{set.type} · {set.year}</p>
            </div>
          </div>
        ))}
      </div>

      {/* YouTube CTA */}
      <div className="mt-16 text-center">
        <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>More sets on YouTube</p>
        <a
          href="https://youtube.com/@emceedeep"
          target="_blank"
          rel="noreferrer"
          className="px-6 py-3 text-sm rounded-sm theme-transition inline-block"
          style={{ border: '0.5px solid var(--color-accent)', color: 'var(--color-accent)' }}
        >
          Subscribe on YouTube →
        </a>
      </div>

      {/* Booking CTA */}
      <div className="mt-8 text-center">
        <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>Want Infinite Loop at your event?</p>
        <Link to="/booking" className="px-6 py-3 text-sm rounded-sm theme-transition inline-block" style={{ backgroundColor: 'var(--color-accent)', color: '#0D0D0D' }}>
          Book a gig →
        </Link>
      </div>
    </main>
  )
}
