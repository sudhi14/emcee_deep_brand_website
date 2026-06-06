import { Link } from 'react-router-dom'

export default function About() {
  return (
    <main className="pt-24 pb-16 max-w-6xl mx-auto px-6">

      {/* Header */}
      <section className="py-16 max-w-2xl">
        <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--color-accent)' }}>About</p>
        <h1 className="font-display text-5xl md:text-6xl font-medium mb-8" style={{ color: 'var(--color-text-primary)' }}>
          Emcee Deep
        </h1>

        {/* Short bio */}
        <p className="text-xl leading-relaxed mb-8" style={{ color: 'var(--color-text-primary)' }}>
          Born between two worlds — Carnatic ragas at home, hip-hop in the streets. Emcee Deep never chose between them.
          Instead he built something new: a Toronto producer and DJ who performs as Infinite Loop, weaving South Asian music
          into house and electronic. Co-founder of Fresh Ravers, where every culture finds its place on the dance floor.
        </p>

        {/* Long bio */}
        <div className="space-y-6" style={{ borderTop: '0.5px solid var(--color-border)', paddingTop: '2rem' }}>
          <p style={{ color: 'var(--color-text-muted)' }}>
            Emcee Deep started as a rapper. Then the bass dropped. A Toronto-based producer and DJ with deep roots in South
            Asian music — from Carnatic classical to Indian film scores and folk — he weaves the sounds he grew up with into
            house, hip-hop, and electronic music. The result is something that feels both familiar and completely new.
          </p>
          <p style={{ color: 'var(--color-text-muted)' }}>
            Behind the decks, he performs as Infinite Loop — a DJ set built to take you on a journey, from warm Afro House
            grooves to peak-time Tech House and Bass House.
          </p>
          <p style={{ color: 'var(--color-text-muted)' }}>
            That same spirit lives in Fresh Ravers, the event platform he co-founded in Toronto. Built on the belief that
            local artists deserve the same stage as global names, Fresh Ravers is a community where emerging voices and
            established acts share the dance floor — and where South Asian culture meets the global electronic music scene.
          </p>
        </div>
      </section>

      {/* Press photos */}
      <section className="py-16" style={{ borderTop: '0.5px solid var(--color-border)' }}>
        <p className="text-xs uppercase tracking-widest mb-8" style={{ color: 'var(--color-text-muted)' }}>Press photos</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { src: '/images/img1.png', alt: 'Emcee Deep at the venue' },
            { src: '/images/img10.jpg', alt: 'Infinite Loop DJ set' },
            { src: '/images/img13.jpg', alt: 'Infinite Loop live' },
            { src: '/images/img2.jpg', alt: 'Infinite Loop performing with lasers' },
            { src: '/images/img5.jpg', alt: 'Infinite Loop at the decks with crowd' },
            { src: '/images/img3.jpg', alt: 'Fresh Ravers event — crowd and DJs' },
            { src: '/images/img7.jpg', alt: 'Infinite Loop — backshot at the decks with crowd' },
            { src: '/images/img8.jpg', alt: 'Infinite Loop — B&W laser performance' },
            { src: '/images/img6.jpg', alt: 'Infinite Loop — arms raised at the decks' },
          ].map((photo, i) => (
            <div key={i} className="aspect-square rounded-sm overflow-hidden" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
              <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover object-center" />
            </div>
          ))}
        </div>
        <p className="text-xs mt-4" style={{ color: 'var(--color-text-muted)' }}>
          High-res photos available on request.{' '}
          <a href="mailto:emceedeep.official@gmail.com" style={{ color: 'var(--color-accent)' }}>Email for press kit →</a>
        </p>
      </section>

      {/* Facts */}
      <section className="py-16" style={{ borderTop: '0.5px solid var(--color-border)' }}>
        <p className="text-xs uppercase tracking-widest mb-8" style={{ color: 'var(--color-text-muted)' }}>Quick facts</p>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { label: 'Based in', value: 'Toronto, Canada' },
            { label: 'Genres', value: 'Afro House · Groovy House · Tech House · Bass House · Techno · Hip-Hop · Trap · Dubstep · Carnatic Fusion' },
            { label: 'Influences', value: 'Black Coffee · AR Rahman · Kanye West · Diplo · David Guetta · Dr. Dre · Carnatic classical' },
            { label: 'Events', value: 'Fresh Ravers — Toronto community rave' },
            { label: 'Viral track', value: 'Carnatic Meets Hip-Hop — 60k+ organic views' },
            { label: 'Booking', value: 'emceedeep.official@gmail.com' },
          ].map(fact => (
            <div key={fact.label}>
              <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--color-text-muted)' }}>{fact.label}</p>
              <p className="text-sm" style={{ color: 'var(--color-text-primary)' }}>{fact.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="flex flex-wrap gap-4" style={{ borderTop: '0.5px solid var(--color-border)', paddingTop: '2rem' }}>
        <Link to="/booking" className="px-6 py-3 text-sm rounded-sm theme-transition" style={{ backgroundColor: 'var(--color-accent)', color: '#0D0D0D' }}>
          Book Infinite Loop →
        </Link>
        <Link to="/music" className="px-6 py-3 text-sm rounded-sm theme-transition" style={{ border: '0.5px solid var(--color-border-hover)', color: 'var(--color-text-primary)' }}>
          Listen to music →
        </Link>
      </div>
    </main>
  )
}
