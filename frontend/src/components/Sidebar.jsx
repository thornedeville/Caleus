import { TrendsIcon, CompareIcon } from './icons'

const TABS = [
  { name: 'Trends', icon: TrendsIcon },
  { name: 'Compare', icon: CompareIcon },
]

function Sidebar({ active, onChange }) {
  return (
    <aside style={styles.sidebar}>
      <div style={styles.logo}>Caleus</div>

      <p style={{ ...styles.sectionLabel }} className="eyebrow">
        Menu
      </p>
      <nav style={styles.nav}>
        {TABS.map(({ name, icon: Icon }) => (
          <button
            key={name}
            onClick={() => onChange(name)}
            style={{
              ...styles.navItem,
              ...(name === active ? styles.navItemActive : {}),
            }}
          >
            <Icon size={15} />
            {name}
          </button>
        ))}
      </nav>
    </aside>
  )
}

const styles = {
  sidebar: {
    width: '220px',
    minHeight: '100vh',
    background: 'var(--surface)',
    borderRight: '1px solid var(--border)',
    padding: '24px 16px',
    flexShrink: 0,
  },
  logo: {
    fontWeight: 700,
    fontSize: '18px',
    padding: '0 8px',
    marginBottom: '28px',
  },
  sectionLabel: {
    padding: '0 8px',
    marginBottom: '8px',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    border: 'none',
    background: 'transparent',
    padding: '9px 10px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--text-muted)',
    textAlign: 'left',
  },
  navItemActive: {
    background: 'var(--active-bg)',
    color: 'var(--active-text)',
  },
}

export default Sidebar
