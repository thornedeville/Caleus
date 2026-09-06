import { useEffect, useState } from 'react'

function CountrySelect({ countries, value, onSelect }) {
  const [text, setText] = useState(value || '')
  const [open, setOpen] = useState(false)

  // keep the box in sync when the selected country changes from outside
  useEffect(() => {
    setText(value || '')
  }, [value])

  const filtered = text
    ? countries.filter(c => c.toLowerCase().includes(text.toLowerCase()))
    : countries

  const handleSelect = country => {
    onSelect(country)
    setText(country)
    setOpen(false)
  }

  const handleBlur = () => {
    setTimeout(() => {
      setOpen(false)
      setText(value || '') // nothing was picked, so snap back to the real selection
    }, 150)
  }

  return (
    <div style={styles.wrapper}>
      <input
        value={text}
        onChange={e => {
          setText(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onBlur={handleBlur}
        placeholder="Search for a country"
        style={styles.input}
      />

      {open && filtered.length > 0 && (
        <div style={styles.list}>
          {filtered.slice(0, 8).map(country => (
            <div key={country} style={styles.option} onMouseDown={() => handleSelect(country)}>
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
    padding: '9px 14px',
    borderRadius: '8px',
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
    borderRadius: '8px',
    boxShadow: 'var(--shadow-lifted)',
    zIndex: 10,
    overflow: 'hidden',
  },
  option: {
    padding: '9px 14px',
    fontSize: '14px',
    cursor: 'pointer',
  },
}

export default CountrySelect
