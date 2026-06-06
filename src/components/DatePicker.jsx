import { useState, useRef, useEffect } from 'react'

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay()
}

function formatDisplay(date) {
  if (!date) return ''
  return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

function formatValue(date) {
  if (!date) return ''
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export default function DatePicker({ name = 'date', required = false }) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const [selected, setSelected] = useState(null)
  const [open, setOpen] = useState(false)
  const [view, setView] = useState({ year: today.getFullYear(), month: today.getMonth() })
  const [focused, setFocused] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
        setFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const isPast = (day) => {
    if (!day) return false
    const d = new Date(view.year, view.month, day)
    return d < today
  }

  const isCurrentMonth = view.year === today.getFullYear() && view.month === today.getMonth()

  function prevMonth() {
    // Don't go back past the current month
    if (isCurrentMonth) return
    setView(v => {
      const d = new Date(v.year, v.month - 1)
      return { year: d.getFullYear(), month: d.getMonth() }
    })
  }

  function nextMonth() {
    setView(v => {
      const d = new Date(v.year, v.month + 1)
      return { year: d.getFullYear(), month: d.getMonth() }
    })
  }

  function selectDay(day) {
    if (isPast(day)) return
    setSelected(new Date(view.year, view.month, day))
    setOpen(false)
    setFocused(false)
  }

  const daysInMonth = getDaysInMonth(view.year, view.month)
  const firstDay = getFirstDayOfMonth(view.year, view.month)
  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const isToday = (d) =>
    d === today.getDate() && view.month === today.getMonth() && view.year === today.getFullYear()

  const isSelected = (d) =>
    selected &&
    d === selected.getDate() &&
    view.month === selected.getMonth() &&
    view.year === selected.getFullYear()

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={formatValue(selected)} />

      {/* Trigger */}
      <div
        onClick={() => { setOpen(o => !o); setFocused(true) }}
        style={{
          border: focused ? '0.5px solid var(--color-accent)' : '0.5px solid var(--color-border)',
          color: selected ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
          cursor: 'pointer',
          padding: '0.75rem 1rem',
          fontSize: '0.875rem',
          borderRadius: '0.125rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          userSelect: 'none',
          transition: 'border-color 0.2s',
        }}
      >
        <span>{selected ? formatDisplay(selected) : 'Select a date'}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {selected && (
            <span
              onClick={e => { e.stopPropagation(); setSelected(null) }}
              style={{ opacity: 0.5, lineHeight: 1, fontSize: '1rem', cursor: 'pointer' }}
              title="Clear date"
            >×</span>
          )}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: 0.5 }}>
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        </div>
      </div>

      {/* Calendar dropdown */}
      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            zIndex: 50,
            backgroundColor: 'var(--color-bg-primary)',
            border: '0.5px solid var(--color-border)',
            borderRadius: '0.25rem',
            padding: '1rem',
            width: '280px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          }}
        >
          {/* Month nav */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <button
              type="button"
              onClick={prevMonth}
              disabled={isCurrentMonth}
              style={{ background: 'none', border: 'none', cursor: isCurrentMonth ? 'default' : 'pointer', color: 'var(--color-text-muted)', padding: '4px 8px', fontSize: '1rem', opacity: isCurrentMonth ? 0.2 : 1 }}
            >‹</button>
            <span style={{ fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-primary)' }}>
              {MONTHS[view.month]} {view.year}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', padding: '4px 8px', fontSize: '1rem' }}
            >›</button>
          </div>

          {/* Day headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', marginBottom: '4px' }}>
            {DAYS.map(d => (
              <div key={d} style={{ textAlign: 'center', fontSize: '0.65rem', letterSpacing: '0.05em', color: 'var(--color-text-muted)', padding: '4px 0' }}>
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
            {cells.map((day, i) => (
              <div
                key={i}
                onClick={() => day && selectDay(day)}
                style={{
                  textAlign: 'center',
                  padding: '6px 0',
                  fontSize: '0.78rem',
                  borderRadius: '0.125rem',
                  cursor: !day || isPast(day) ? 'default' : 'pointer',
                  backgroundColor: isSelected(day) ? 'var(--color-accent)' : 'transparent',
                  color: isSelected(day)
                    ? '#0D0D0D'
                    : isPast(day)
                    ? 'var(--color-border)'
                    : isToday(day)
                    ? 'var(--color-accent)'
                    : day
                    ? 'var(--color-text-primary)'
                    : 'transparent',
                  fontWeight: isSelected(day) || isToday(day) ? '600' : '400',
                  opacity: isPast(day) ? 0.4 : 1,
                  transition: 'background-color 0.15s',
                }}
                onMouseEnter={e => { if (day && !isSelected(day) && !isPast(day)) e.currentTarget.style.backgroundColor = 'var(--color-border)' }}
                onMouseLeave={e => { if (day && !isSelected(day) && !isPast(day)) e.currentTarget.style.backgroundColor = 'transparent' }}
              >
                {day || ''}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
