import { useState } from 'react'

function CountrySelect({ countries, value, onSelect }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)

  const filtered = query
    ? countries.filter(c => c.toLowerCase().includes(query.toLowerCase()))
    : countries

  return (
    <div style={styles.wrapper}>
      <input
        value={query || value || ''}
        onChange={e => {
          setQuery(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder="Search for a country"
        style={styles.input}
      />

      {open && filtered.length > 0 && (
        <div style={styles.list}>
          {filtered.slice(0, 8).map(country => (
            <div
              key={country}
              style={styles.option}
              onMouseDown={() => {
                onSelect(country)
                setQuery('')
                setOpen(false)
              }}
            >
              {country}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const styles = {
  wrapper: {
    position: 'relative',
    width: '260px',
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    borderRadius: 'var(--radius-pill)',
    border: '1px solid var(--border)',
    fontSize: '14px',
    outline: 'none',
  },
  list: {
    position: 'absolute',
    top: '110%',
    left: 0,
    right: 0,
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '10px',
    boxShadow: 'var(--shadow)',
    zIndex: 10,
    overflow: 'hidden',
  },
  option: {
    padding: '10px 14px',
    fontSize: '14px',
    cursor: 'pointer',
  },
}

export default CountrySelect
