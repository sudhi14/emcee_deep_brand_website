import { useState } from 'react'

export default function Booking() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const data = new FormData(form)

    // Using Formspree — replace YOUR_FORM_ID with your Formspree form ID
    const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    })

    if (res.ok) {
      setSubmitted(true)
      form.reset()
    }
  }

  return (
    <main className="pt-24 pb-16 max-w-6xl mx-auto px-6">

      {/* Header */}
      <section className="py-16 max-w-xl">
        <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--color-accent)' }}>Booking</p>
        <h1 className="font-display text-5xl md:text-6xl font-medium mb-6" style={{ color: 'var(--color-text-primary)' }}>
          Let's make something happen.
        </h1>
        <p style={{ color: 'var(--color-text-muted)' }}>
          For DJ bookings, production inquiries, collaborations, or Fresh Ravers — fill out the form and we'll get back to you within 48 hours.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-16" style={{ borderTop: '0.5px solid var(--color-border)', paddingTop: '2rem' }}>

        {/* Form */}
        <div>
          {submitted ? (
            <div className="py-12 text-center">
              <p className="font-display text-2xl font-medium mb-2" style={{ color: 'var(--color-accent)' }}>Message sent.</p>
              <p style={{ color: 'var(--color-text-muted)' }}>We'll be in touch within 48 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {[
                { name: 'name', label: 'Your name', type: 'text', placeholder: 'Jane Smith' },
                { name: 'email', label: 'Email', type: 'email', placeholder: 'jane@example.com' },
                { name: 'event', label: 'Event type', type: 'text', placeholder: 'Club night, festival, private event...' },
                { name: 'date', label: 'Event date', type: 'date', placeholder: '' },
              ].map(field => (
                <div key={field.name} className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    required
                    className="bg-transparent px-4 py-3 text-sm rounded-sm outline-none theme-transition"
                    style={{
                      border: '0.5px solid var(--color-border)',
                      color: 'var(--color-text-primary)',
                    }}
                    onFocus={e => e.target.style.borderColor = 'var(--color-accent)'}
                    onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
                  />
                </div>
              ))}

              {/* Inquiry type */}
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>Inquiry type</label>
                <select
                  name="type"
                  className="bg-transparent px-4 py-3 text-sm rounded-sm outline-none theme-transition"
                  style={{
                    border: '0.5px solid var(--color-border)',
                    color: 'var(--color-text-primary)',
                    backgroundColor: 'var(--color-bg-primary)',
                  }}
                >
                  <option value="dj-booking">DJ Booking (Infinite Loop)</option>
                  <option value="production">Music Production / Beat</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="fresh-ravers">Fresh Ravers / Event</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-widest" style={{ color: 'var(--color-text-muted)' }}>Message</label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Tell us about your event, budget, or what you have in mind..."
                  className="bg-transparent px-4 py-3 text-sm rounded-sm outline-none resize-none theme-transition"
                  style={{
                    border: '0.5px solid var(--color-border)',
                    color: 'var(--color-text-primary)',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--color-accent)'}
                  onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 text-sm font-medium rounded-sm theme-transition self-start"
                style={{ backgroundColor: 'var(--color-accent)', color: '#0D0D0D' }}
              >
                Send message →
              </button>
            </form>
          )}
        </div>

        {/* Info panel */}
        <div className="flex flex-col gap-8">
          {[
            { label: 'Response time', value: 'Within 48 hours' },
            { label: 'Direct email', value: 'emceedeep.official@gmail.com' },
            { label: 'Based in', value: 'Toronto, Canada' },
            { label: 'Available for', value: 'Club nights · Festivals · Private events · Fresh Ravers' },
          ].map(item => (
            <div key={item.label} style={{ borderLeft: '1px solid var(--color-accent)', paddingLeft: '1rem' }}>
              <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--color-text-muted)' }}>{item.label}</p>
              <p className="text-sm" style={{ color: 'var(--color-text-primary)' }}>{item.value}</p>
            </div>
          ))}

          <div style={{ borderTop: '0.5px solid var(--color-border)', paddingTop: '1.5rem' }}>
            <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--color-text-muted)' }}>Follow</p>
            <div className="flex flex-col gap-2">
              {[
                { label: '@emcee_deep', href: 'https://instagram.com/emcee_deep' },
                { label: '@infinite_loop_dj', href: 'https://instagram.com/infinite_loop_dj' },
                { label: '@fresh_ravers', href: 'https://instagram.com/fresh_ravers' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="text-sm theme-transition" style={{ color: 'var(--color-accent)' }}>
                  {s.label} →
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
