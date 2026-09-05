const TABS = ['Trends', 'Compare']

function Nav({ active, onChange }) {
  return (
    <header style={styles.header}>
      <span style={styles.logo}>Caleus</span>

      <nav style={styles.tabs}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            style={{
              ...styles.tabButton,
              ...(tab === active ? styles.tabButtonActive : {}),
            }}
          >
            {tab}
          </button>
        ))}
      </nav>
    </header>
  )
}

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 32px',
    borderBottom: '1px solid var(--border)',
    background: 'var(--surface)',
  },
  logo: {
    fontWeight: 700,
    fontSize: '18px',
    letterSpacing: '-0.01em',
  },
  tabs: {
    display: 'flex',
    gap: '4px',
    padding: '4px',
    background: 'var(--surface-muted)',
    borderRadius: 'var(--radius-pill)',
  },
  tabButton: {
    border: 'none',
    background: 'transparent',
    padding: '8px 18px',
    borderRadius: 'var(--radius-pill)',
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--text-muted)',
  },
  tabButtonActive: {
    background: 'var(--surface)',
    color: 'var(--text)',
    boxShadow: 'var(--shadow)',
  },
}

export default Nav
