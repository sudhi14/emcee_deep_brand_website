import { Link } from 'react-router-dom'
import eventsData from '../data/events.json'

const upcomingEvents = eventsData.upcoming
const pastEvents = eventsData.past

export default function Events() {
  return (
    <main className="pt-24 pb-16 max-w-6xl mx-auto px-6">

      {/* Header */}
      <section className="py-16">
        <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--color-accent)' }}>Fresh Ravers</p>
        <h1 className="font-display text-5xl md:text-6xl font-medium mb-6" style={{ color: 'var(--color-text-primary)' }}>
          Events
        </h1>
        <p className="text-lg max-w-xl" style={{ color: 'var(--color-text-muted)' }}>
          Toronto's community rave experience. Local artists meet global names on the same dance floor.
        </p>
      </section>

      {/* Upcoming */}
      <section style={{ borderTop: '0.5px solid var(--color-border)', paddingTop: '2rem' }}>
        <p className="text-xs uppercase tracking-widest mb-8" style={{ color: 'var(--color-text-muted)' }}>Upcoming events</p>
        {upcomingEvents.length === 0 ? (
          <div className="py-12 text-center rounded-sm" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
            <p className="text-sm mb-2" style={{ color: 'var(--color-text-muted)' }}>Next event coming soon.</p>
            <a href="https://instagram.com/fresh_ravers" target="_blank" rel="noreferrer" className="text-sm" style={{ color: 'var(--color-accent)' }}>
              Follow @fresh_ravers for announcements →
            </a>
          </div>
        ) : (
          upcomingEvents.map((event, i) => (
            <div key={i} className="flex flex-col md:flex-row justify-between gap-6 py-6" style={{ borderBottom: '0.5px solid var(--color-border)' }}>
              <div>
                {event.presentedBy && (
                  <p className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--color-accent)' }}>{event.presentedBy}</p>
                )}
                <h2 className="font-display text-xl font-medium mb-1" style={{ color: 'var(--color-text-primary)' }}>{event.title}</h2>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  {(() => { const [y,m,d] = event.date.split('-'); return new Date(y, m-1, d).toLocaleDateString('en-CA', { month: 'long', day: 'numeric', year: 'numeric' }) })()} · {event.venue}
                </p>
                {event.lineup && (
                  <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>Lineup: {event.lineup.join(', ')}</p>
                )}
                {event.tags && (
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {event.tags.map(tag => (
                      <span key={tag} className="text-xs px-3 py-1 rounded-full" style={{ border: '0.5px solid var(--color-accent)', color: 'var(--color-accent)' }}>{tag}</span>
                    ))}
                  </div>
                )}
              </div>
              {event.private ? (
                <span className="text-xs self-start px-4 py-2 rounded-sm" style={{ border: '0.5px solid var(--color-border)', color: 'var(--color-text-muted)' }}>Private Event</span>
              ) : event.ticketUrl ? (
                <a href={event.ticketUrl} target="_blank" rel="noreferrer" className="px-6 py-3 text-sm rounded-sm self-start theme-transition" style={{ backgroundColor: 'var(--color-accent)', color: '#0D0D0D' }}>
                  Get tickets →
                </a>
              ) : null}
            </div>
          ))
        )}
      </section>

      {/* Past events */}
      <section className="mt-16" style={{ borderTop: '0.5px solid var(--color-border)', paddingTop: '2rem' }}>
        <p className="text-xs uppercase tracking-widest mb-8" style={{ color: 'var(--color-text-muted)' }}>Past events</p>
        {pastEvents.map((event, i) => (
          <div key={i} className="flex justify-between py-5 theme-transition" style={{ borderBottom: '0.5px solid var(--color-border)' }}>
            <div>
              <p className="font-display font-medium" style={{ color: 'var(--color-text-primary)' }}>{event.title}</p>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{event.date} · {event.venue}</p>
            </div>
            {event.note && <span className="text-xs self-center" style={{ color: 'var(--color-accent)' }}>{event.note}</span>}
          </div>
        ))}
      </section>

      {/* Fresh Ravers photo */}
      <section className="mt-16 rounded-sm overflow-hidden" style={{ maxHeight: '400px' }}>
        <img src="/images/img3.jpg" alt="Fresh Ravers event" className="w-full object-cover object-center" style={{ maxHeight: '400px' }} />
      </section>

      {/* Get involved */}
      <section className="mt-8 p-8 rounded-sm" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <p className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--color-accent)' }}>Get involved</p>
        <h2 className="font-display text-2xl font-medium mb-3" style={{ color: 'var(--color-text-primary)' }}>
          Are you an artist or promoter?
        </h2>
        <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
          Fresh Ravers is built on community. If you want to perform or collaborate on an event, get in touch.
        </p>
        <Link to="/booking" className="px-6 py-3 text-sm rounded-sm theme-transition inline-block" style={{ border: '0.5px solid var(--color-accent)', color: 'var(--color-accent)' }}>
          Let's talk →
        </Link>
      </section>
    </main>
  )
}
